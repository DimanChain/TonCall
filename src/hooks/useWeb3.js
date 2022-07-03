import TonWeb from 'tonweb';
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../redux/AppInfoSlice";
import * as tonMnemonic from "tonweb-mnemonic";
import { ConstructionOutlined } from '@mui/icons-material';


const providerUrl = 'https://testnet.toncenter.com/api/v2/jsonRPC'; // TON HTTP API url. Use this url for testnet
const apiKey = '9d3e42ecad4110e05084be39b30cd6e1e30ea7c67777a8c2c434ba3fa29cd0b1'; // Obtain your API key in https://t.me/tontestnetapibot
const tonweb = new TonWeb(new TonWeb.HttpProvider(providerUrl, { apiKey })); // Initialize TON SDK

const BN = TonWeb.utils.BN;
const toNano = TonWeb.utils.toNano;
const fromNano = TonWeb.utils.fromNano;

const providerWallet = "EQDsaBYtU21bItJIrjsnj__aDkieetkhBLk986CxBkSQLbVt";
const providerWords = "refuse rude cream index absent announce exile ready bean open sketch prepare isolate pair visual logic category spoil tomato flip lawn news asset any"

function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

function toHexString(byteArray) {
    return Array.prototype.map.call(byteArray, function (byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
}

const useWeb3 = () => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

    const getProviderKeyPair = async () => {
        let words = providerWords.split(' ');
        return await tonMnemonic.mnemonicToKeyPair(words);
    }

    const _initChannel = async (channelId, initBalance) => {

        const providerKeyPair = await getProviderKeyPair();

        const provWallet = tonweb.wallet.create({
            publicKey: providerKeyPair.publicKey,
        });
        const provWalletAddress = await provWallet.getAddress();
        const mnemonic = localStorage.getItem('mnemonic').split(' ');

        const keyPair = await tonMnemonic.mnemonicToKeyPair(mnemonic);
        console.log('keyPair: ', keyPair);

        const walletUser = tonweb.wallet.create({
            publicKey: keyPair.publicKey
        });
        const walletUserAddress = await walletUser.getAddress(); // address of this wallet in blockchain
        console.log('User Address = ', walletUserAddress.toString(true, true, true));
        console.log('Prov Address = ', provWalletAddress.toString(true, true, true));
        console.log('balance', await tonweb.getBalance(providerWallet));

        // console.error(walletAddress);
        const channelInitState = {
            balanceA: toNano(initBalance.toString()), // A's initial balance in Toncoins. Next A will need to make a top-up for this amount
            balanceB: toNano('0.01'), // B's initial balance in Toncoins. Next B will need to make a top-up for this amount
            seqnoA: new BN(0), // initially 0
            seqnoB: new BN(0)  // initially 0
        };

        const channelConfig = {
            channelId: new BN(channelId),
            addressA: walletUserAddress,
            addressB: provWalletAddress,
            initBalanceA: channelInitState.balanceA,
            initBalanceB: channelInitState.balanceB
        }

        const channelA = tonweb.payments.createChannel({
            ...channelConfig,
            isA: true,
            myKeyPair: keyPair,
            hisPublicKey: providerKeyPair.publicKey,
        });
        const channelAddress = await channelA.getAddress(); // address of this payment channel smart-contract in blockchain
        console.log('channelAddress=', channelAddress.toString(true, true, true));

        const channelB = tonweb.payments.createChannel({
            ...channelConfig,
            isA: false,
            myKeyPair: providerKeyPair,
            hisPublicKey: keyPair.publicKey,
        });
        if ((await channelB.getAddress()).toString() !== channelAddress.toString()) {
            throw new Error('Channels address not same');
        }


        const fromWalletUser = channelA.fromWallet({
            wallet: walletUser,
            secretKey: keyPair.secretKey,
        });

        const fromWalletProvider = channelB.fromWallet({
            wallet: provWallet,
            secretKey: providerKeyPair.secretKey
        });

        return { keyPair, providerKeyPair, fromWalletUser, fromWalletProvider, walletUser, channelInitState, channelConfig, channelA, channelB }
    }

    const requestChannel = async (channelId, initBalance) => {
        try {
            let channels = await _initChannel(channelId, initBalance)
            await channels.fromWalletUser.deploy().send(toNano('0.05'));
            await checkChannelState(channelId);
            localStorage.setItem('channelA' + channelId, initBalance.toString());
            localStorage.setItem('channelB' + channelId, "0.01");
            localStorage.setItem('channelASeqno' + channelId, 0);
            localStorage.setItem('channelBSeqno' + channelId, 0);

            await channels.fromWalletUser
                .topUp({ coinsA: channels.channelConfig.initBalanceA, coinsB: new BN(0) })
                .send(channels.channelConfig.initBalanceA.add(toNano('0.05'))); // +0.05 TON to network fees


            for (let i = 0; i < 100; i++) {
                await sleep(1000);
                try {
                    const data = await channels.channelA.getData();
                    console.log(data.balanceA.toString());
                    if (data.balanceA.toString() == channels.channelConfig.initBalanceA.toString()) {
                        console.log("BLANCE A IS OK")
                        break;
                    }
                } catch (error) {
                    continue;
                }
            }
            await channels.fromWalletProvider
                .topUp({ coinsA: new BN(0), coinsB: channels.channelConfig.initBalanceB })
                .send(channels.channelConfig.initBalanceB.add(toNano('0.05'))); // +0.05 TON to network fees

            for (let i = 0; i < 100; i++) {
                await sleep(1000);
                try {
                    const data = await channels.channelB.getData();
                    console.log(data.balanceB.toString());
                    if (data.balanceB.toString() == channels.channelConfig.initBalanceB.toString()) {
                        console.log("BLANCE B IS OK")
                        break;
                    }
                } catch (error) {
                    continue;
                }
            }




            let result = await channels.fromWalletUser.init(channels.channelInitState).send(toNano('0.05'));
            console.log(result);
            for (let i = 0; i < 100; i++) {
                await sleep(1000);
                const data = await channels.channelA.getData();
                if (data.state == 1) {
                    console.log("Initialize Completed");
                    break;
                }
            }



            return true;
        } catch (error) {
            console.error(error);
            return false;
        }

    };


    const checkChannelState = async function (channelId) {
        const providerKeyPair = await getProviderKeyPair();

        const provWallet = tonweb.wallet.create({
            publicKey: providerKeyPair.publicKey,
        });
        const provWalletAddress = await provWallet.getAddress();
        const mnemonic = localStorage.getItem('mnemonic').split(' ');

        const keyPair = await tonMnemonic.mnemonicToKeyPair(mnemonic);

        const walletUser = tonweb.wallet.create({
            publicKey: keyPair.publicKey
        });
        const walletUserAddress = await walletUser.getAddress(); // address of this wallet in blockchain

        const channelConfig = {
            channelId: new BN(channelId),
            addressA: walletUserAddress,
            addressB: provWalletAddress,
        }

        const channelA = tonweb.payments.createChannel({
            ...channelConfig,
            isA: true,
            myKeyPair: keyPair,
            hisPublicKey: providerKeyPair.publicKey,
        });
        let val = -1;
        for (let i = 0; i < 100; i++) {
            await sleep(1000);
            try {
                val = await channelA.getChannelState()
            } catch (error) {
                val = -1;
            }
            console.log(val);
            if (val > -1) break;

        }
        return val



    }

    const initBalances = async function (channelId, initBalance) {


        // const tempStep = 0.5;
        // const channelState1 = {
        //     balanceA: toNano((initBalance - tempStep).toString()),
        //     balanceB: toNano(tempStep.toString()),
        //     seqnoA: new BN(1),
        //     seqnoB: new BN(0)
        // };

        // const signatureA1 = await channelA.signState(channelState1);
        // if (!(await channelB.verifyState(channelState1, signatureA1))) {
        //     throw new Error('Invalid A signature');
        // }
        // //const signatureB1 = await channelB.signState(channelState1);
        // const channelState2 = {
        //     balanceA: channelState1.balanceA - toNano((tempStep).toString()),
        //     balanceB: channelState1.balanceA - toNano((tempStep.toString())),
        //     seqnoA: new BN(2),
        //     seqnoB: new BN(0)
        // };
        // // A signs this state and send signed state to B (e.g. via websocket)

        // const signatureA2 = await channelA.signState(channelState2);

        // // B checks that the state is changed according to the rules, signs this state, send signed state to A (e.g. via websocket)

        // if (!(await channelB.verifyState(channelState2, signatureA2))) {
        //     throw new Error('Invalid A signature');
        // }

        // const signatureCloseA = await channelA.signClose(channelState2);

        // // A verifies and signs this closing message and include B's signature

        // // A sends closing message to blockchain, payments channel smart contract
        // // Payment channel smart contract will send funds to participants according to the balances of the sent state.

        // if (!(await channelB.verifyClose(channelState2, signatureCloseA))) {
        //     throw new Error('Invalid B signature');
        // }

        // await fromWalletUser.close({
        //     ...channelState2,
        //     hisSignature: signatureCloseA
        // }).send(toNano('0.05'));



    }

    const closeChannel = async function (channelId) {

        try {

            if (localStorage.getItem('channelA' + channelId)) {
                let channels = await _initChannel(channelId, localStorage.getItem('channelA' + channelId))
                const channelState = {
                    balanceA: toNano((localStorage.getItem('channelA' + channelId))),
                    balanceB: toNano((localStorage.getItem('channelB' + channelId))),
                    seqnoA: new BN(localStorage.getItem('channelASeqno' + channelId) + 1),
                    seqnoB: new BN(localStorage.getItem('channelBSeqno' + channelId) + 1)
                };
                console.log("Balance A:", fromNano(channelState.balanceA))
                console.log("Balance B:", fromNano(channelState.balanceB))

                // const signatureA2 = await channels.channelA.signState(channelState);


                // if (!(await channels.channelB.verifyState(channelState, signatureA2))) {
                //     throw new Error('Invalid A signature');
                // }

                const signatureCloseA = await channels.channelA.signClose(channelState);

                if (!(await channels.channelB.verifyClose(channelState, signatureCloseA))) {
                    throw new Error('Invalid B signature');
                }
                console.log("Close In Progress");

                let result = await channels.fromWalletProvider.close({
                    ...channelState,
                    hisSignature: signatureCloseA
                }).send(toNano('0.05'));
                console.log(result);
                for (let i = 0; i < 100; i++) {
                    await sleep(1000);
                    const data = await channels.channelA.getData();
                    console.log(data);
                    if (data.state == 0) {
                        console.log("Close Operation Completed");
                        break;
                    }
                }
                return true;

            }
            return false;

        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const costBalance = async (channelId, fee) => {
        try {
            if (localStorage.getItem('channelA' + channelId)) {
                let channels = await _initChannel(channelId, localStorage.getItem('channelA' + channelId))
                const newABalance = parseFloat(localStorage.getItem('channelA' + channelId)) - parseFloat(fee);
                const newBBalance = parseFloat(localStorage.getItem('channelA' + channelId)) + parseFloat(fee);
                const newSeqnoA = localStorage.getItem('channelASeqno' + channelId) + 1;
                const newSeqnoB = localStorage.getItem('channelBSeqno' + channelId) + 1;
                const channelState = {
                    balanceA: toNano(parseFloat(newABalance).toFixed(8).toString()),
                    balanceB: toNano(parseFloat(newBBalance).toFixed(8).toString()),
                    seqnoA: newSeqnoA,
                    seqnoB: newSeqnoB
                };
                localStorage.setItem('channelA' + channelId, newABalance.toFixed(8));
                localStorage.setItem('channelB' + channelId, newBBalance.toFixed(8));
                localStorage.setItem('channelASeqno' + channelId, newSeqnoA);
                localStorage.setItem('channelBSeqno' + channelId, newSeqnoB);

                const signatureA = await channels.channelA.signState(channelState);

                if (!(await channels.channelB.verifyState(channelState, signatureA))) {
                    throw new Error('Invalid A signature');
                }
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    return { requestChannel, closeChannel, costBalance };
};

export default useWeb3;
