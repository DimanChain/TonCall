import TonWeb from 'tonweb';
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../redux/AppInfoSlice";
import * as tonMnemonic from "tonweb-mnemonic";



const BN = TonWeb.utils.BN;
const toNano = TonWeb.utils.toNano;

const providerUrl = 'https://testnet.toncenter.com/api/v2/jsonRPC';
const apiKey = '9d3e42ecad4110e05084be39b30cd6e1e30ea7c67777a8c2c434ba3fa29cd0b1';
const providerWallet = "EQDsaBYtU21bItJIrjsnj__aDkieetkhBLk986CxBkSQLbVt";
const providerSecretKey = "458c43e3d5863573a93af2bfcca7c9cf240d601614962439418d90d9f68867e1c352f105765c26bee5c0bb8ff5804f950e58b0da761eb7a91bf9ba38c7bac0f9"
const providerPublicKey = "c352f105765c26bee5c0bb8ff5804f950e58b0da761eb7a91bf9ba38c7bac0f9";
const tonweb = new TonWeb(new TonWeb.HttpProvider(providerUrl, { apiKey }));


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
    const dispatch = useDispatch();
    const { publicKey, secretKey, walletAddress, balance } = useSelector((s) => s.appInfo);

    // const createProviderWallet = async () => {
    //     let words = providerWords.split(' ');
    //     await tonMnemonic.validateMnemonic(words);
    //     await tonMnemonic.isPasswordNeeded(words);
    //     await tonMnemonic.mnemonicToSeed(words);

    //     const keyPair = await tonMnemonic.mnemonicToKeyPair(words);

    //     console.log(keyPair);
    // }
    const createChannel = async (initBalance) => {

        try {
            const userWallet = tonweb.wallet.create({
                publicKey: hexToBytes(publicKey)
            });

            const provWallet = tonweb.wallet.create({
                publicKey: hexToBytes(providerPublicKey)
            });


            const walletAddressA = await userWallet.getAddress(); // address of this wallet in blockchain
            console.log('walletAddressA = ', walletAddressA.toString(true, true, true));
            const walletAddressB = await provWallet.getAddress(); // address of this wallet in blockchain
            console.log('walletAddressB = ', walletAddressB.toString(true, true, true));

            console.error(walletAddress);

            const channelInitState = {
                balanceA: toNano(initBalance.toString()),
                balanceB: toNano('0'),
                seqnoA: new BN(0),
                seqnoB: new BN(0)
            };
            const channelConfig = {
                channelId: new BN(424),
                addressA: walletAddress,
                addressB: providerWallet,
                initBalanceA: channelInitState.balanceA,
                initBalanceB: channelInitState.balanceB
            }

            const channelA = await tonweb.payments.createChannel({
                ...channelConfig,
                isA: true,
                myKeyPair: { publicKey: hexToBytes(publicKey), secretKey: hexToBytes(secretKey) },
                hisPublicKey: hexToBytes(publicKey),
            });
            console.log(channelA);
            const channelAddress = await channelA.getAddress(); // address of this payment channel smart-contract in blockchain
            console.log('channelAddress=', channelAddress.toString(true, true, true));

            // const channelB = await tonweb.payments.createChannel({
            //     ...channelConfig,
            //     isA: false,
            //     myKeyPair: { publicKey: hexToBytes(providerPublicKey), secretKey: hexToBytes(providerSecretKey) },
            //     hisPublicKey: hexToBytes(providerPublicKey),
            // });
            // if ((await channelB.getAddress()).toString() !== channelAddress.toString()) {
            //     throw new Error('Channels address not same');
            // }


            // const fromWalletUser = channelA.fromWallet({
            //     wallet: userWallet,
            //     secretKey: hexToBytes(secretKey)
            // });

            // const fromWalletProvider = channelB.fromWallet({
            //     wallet: provWallet,
            //     secretKey: hexToBytes(providerSecretKey)
            // });
            // await fromWalletUser.deploy().send(toNano('0.05'));

            // console.log("ChannelA state ")
            // console.log(await channelA.getChannelState());
            // const data = await channelA.getData();
            // console.log('balanceA = ', data.balanceA.toString())
            // console.log('balanceB = ', data.balanceB.toString())

            // await fromWalletUser
            //     .topUp({ coinsA: channelInitState.balanceA, coinsB: new BN(0) })
            //     .send(channelInitState.balanceA.add(toNano('0.05'))); // +0.05 TON to network fees

            // await fromWalletUser.init(channelInitState).send(toNano('0.05'));
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
        } catch (error) {
            console.error(error);
        }


    };





    return { createChannel, /* createProviderWallet */ };
};

export default useWeb3;
