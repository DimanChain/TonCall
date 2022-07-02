import authorProfile from '../assets/profile-author.jpg'
import { Button, Box, Modal, TextField } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, } from "react";
import * as tonMnemonic from "tonweb-mnemonic";
import classes from "./sidebar.module.css";
import TonWeb from 'tonweb';
import { setUserInfo } from "../redux/AppInfoSlice";
import useWeb3 from "../hooks/useWeb3";
var mnemonicWords;

function Sidebar() {
    const [open, setOpen] = useState(false);
    const [depositAmount, setDepositAmount] = useState(0);

    const [walletState, setWalletState] = useState(0)
    const [modalState, setModalState] = useState(0)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { createChannel } = useWeb3();

    const dispatch = useDispatch();
    const { publicKey, secretKey, walletAddress, balance } = useSelector((s) => s.appInfo);

    const deposite = async (event) => {
        try {
            console.log(window.ton)
            if (!window.ton)
                return window.open('https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd', "_blank");
            await window.ton.send("ton_requestWallets")
            console.error(depositAmount)
            await window.ton.send("ton_sendTransaction", [
                { value: depositAmount, to: walletAddress, data: "From TonCall" },
            ])
            setTimeout(function () {
                window.location.reload()

            }, 1000);
        } catch (error) {
            console.log(error);
        }

    }


    //----------------------------------------------------------------
    async function createWallet() {
        mnemonicWords = await tonMnemonic.generateMnemonic();
        setModalState(1);
        handleOpen();
    }

    //----------------------------------------------------------------
    async function confirmWallet() {
        await tonMnemonic.validateMnemonic(mnemonicWords);
        await tonMnemonic.isPasswordNeeded(mnemonicWords);
        await tonMnemonic.mnemonicToSeed(mnemonicWords);

        const keyPair = await tonMnemonic.mnemonicToKeyPair(mnemonicWords);

        localStorage.setItem("publicKey", toHexString(keyPair.publicKey));
        localStorage.setItem("secretKey", toHexString(keyPair.secretKey));
        const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', { apiKey: '9d3e42ecad4110e05084be39b30cd6e1e30ea7c67777a8c2c434ba3fa29cd0b1' }));
        const wallet = await tonweb.wallet.create({ publicKey: keyPair.publicKey });
        localStorage.setItem("walletAddress", (await wallet.getAddress()).toString(true, true, true));

        dispatch(setUserInfo({
            publicKey: toHexString(keyPair.publicKey),
            secretKey: toHexString(keyPair.secretKey),
            walletAddress: (await wallet.getAddress()).toString(true, true, true),
            balance: await tonweb.getBalance((await wallet.getAddress()).toString(true, true, true))
        }));
        handleClose();
    }

    function toHexString(byteArray) {
        return Array.prototype.map.call(byteArray, function (byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');
    }

    function createWalletBody() {
        let resp = [];
        for (let i = 0; i < mnemonicWords.length; i++) {
            resp.push(
                <>
                    <span className="text-danger">
                        {(i + 1) + "."}
                    </span>
                    <span>
                        {mnemonicWords[i] + " "}
                    </span>
                </>
            );


        }
        return (
            <div>
                {resp}
                <p className='fw-bold mt-1'>
                    Write down your 24 Words and keep it safe
                </p>
                <div>
                    <Button className={"m-2 text-light border-light generalBtn"} onClick={confirmWallet}
                        variant={"contained"}>Confirm and Create Wallet</Button>
                </div>
            </div>)
    }

    function logout() {
        localStorage.removeItem("publicKey");
        localStorage.removeItem("secretKey");
        localStorage.removeItem("walletAddress");
        dispatch(setUserInfo({
            publicKey: "",
            secretKey: "",
            walletAddress: "",
            balance: 10
        }));
        setModalState(0);
    }

    useEffect(() => {
        setTimeout(async () => {
            if (!window.ton)
                setWalletState(2);
            else
                setWalletState(0);
            //createProviderWallet();
            const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', { apiKey: '9d3e42ecad4110e05084be39b30cd6e1e30ea7c67777a8c2c434ba3fa29cd0b1' }));
            if (localStorage.getItem("secretKey")) {
                dispatch(setUserInfo({
                    publicKey: localStorage.getItem("publicKey"),
                    secretKey: localStorage.getItem("secretKey"),
                    walletAddress: localStorage.getItem("walletAddress"),
                    balance: await tonweb.getBalance(localStorage.getItem("walletAddress"))
                }));

            }
        }, 100)
    }, []);

    return (
        <>
            <div className={classes.sideBarContainer}>

                {
                    secretKey && secretKey != "" ?
                        <>
                            <img className={"p-4 text-light rounded-circle"} src={authorProfile} />
                            <a onClick={() => {
                                navigator.clipboard.writeText(walletAddress)
                            }}
                                className={"text-light fw-bold "}>{walletAddress.substring(0, 4) + "...." + walletAddress.substring(walletAddress.length - 4, walletAddress.length)}</a>
                            <div className='m-2 text-white'>
                                <div>
                                    TON Balance:
                                </div>
                                <div>
                                    {TonWeb.utils.fromNano(balance) + " 💎 "}
                                </div>

                            </div>
                            <Button className={"m-2 text-light border-light"} variant={"outlined"}
                                onClick={handleOpen}>Deposite</Button>
                            <Button className={"m-2 text-light border-light"} variant={"outlined"}
                                onClick={() => createChannel(2)}>TEST</Button>
                        </> :
                        <div className={"m-2 mt-5 text-light border-light"}>
                            <span className={"text-light fw-bold "}>To use our platform and connect to other user you have to create a wallet or import one</span>
                            <Button className={"m-2 text-light border-light generalBtn"} onClick={createWallet}
                                variant={"contained"}>Create Wallet</Button>
                            <Button className={"m-2 text-light border-light"} variant={"outlined"} onClick={handleOpen}>Import
                                Wallet</Button>
                        </div>
                }
                <div className={"d-flex flex-column justify-content-end flex-grow-1 "}>
                    {!publicKey ? <div></div> :
                        <Button className={"m-2 mb-3"} color={"error"} variant={"contained"} onClick={logout}>log
                            out</Button>}

                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.modalStyle}>
                    {
                        modalState == 1 ? createWalletBody() :
                            <div className='text-center'>
                                <div>Send TON 💎 to this address: </div>
                                <div className='mt-3 mb-3'>{walletAddress}</div>
                                <div className='text-warning mb-2'>OR</div>
                                <div className="row g-3 justify-content-center align-items-center">

                                    <div className="col-auto">
                                        <input type="number" onChange={(e) => {
                                            console.log(e.target.value * 10 ** 9);
                                            setDepositAmount(e.target.value * 10 ** 9)
                                        }} id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline" placeholder="Enter Amout " />
                                    </div>

                                </div>
                                <Button className={"m-2 text-light border-light generalBtn"} onClick={deposite}
                                    variant={"contained"}>DOPSITE FROM TON WALLET</Button>
                                <Button className={"m-2 text-light border-light generalBtn"} onClick={handleClose}
                                    variant={"contained"} color={"error"}>Cancel</Button>
                            </div>
                    }

                </Box>
            </Modal>
        </>
    );

}


export default Sidebar;