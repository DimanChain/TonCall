
import authorProfile from '../assets/profile-author.jpg'
import { Button, Box, Modal } from '@mui/material'
import { useEffect, useState } from "react";
import * as tonMnemonic from "tonweb-mnemonic";
import classes from "./sidebar.module.css";

import useTonWeb from './useTonWeb';
var mnemonicWords;

function Sidebar() {
    const [open, setOpen] = useState(false);

    const [walletState, setWalletState] = useState(0)
    const [modalState, setModalState] = useState(0)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const walletConnect = async (event) => {
        try {
            console.log(window.ton)
            if (!window.ton)
                return window.open('https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd', "_blank");
            let resp = await window.ton.send("ton_requestWallets")
            localStorage.setItem("publicKey", resp[0].publicKey);

            window.ton
                .send("ton_rawSign", [
                    { data: "Welcome to TonCall this is just a simple test for signing your wallet" },
                ], () => {

                });
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
        // -> true

        await tonMnemonic.isPasswordNeeded(mnemonicWords);
        // -> false

        await tonMnemonic.mnemonicToSeed(mnemonicWords);
        // -> Uint8Array(32) [183, 90, 187, 181, .. ]

        const keyPair = await tonMnemonic.mnemonicToKeyPair(mnemonicWords);
        // -> {publicKey: Uint8Array(32), secretKey: Uint8Array(64)}
        localStorage.setItem("publicKey", toHexString(keyPair.publicKey));
        localStorage.setItem("secretKey", toHexString(keyPair.secretKey));
        // const tonweb = new TonWeb();

        // const wallet = tonweb.wallet.create({ publicKey: toHexString(keyPair.publicKey) });
        // localStorage.setItem("walletAddress", wallet.getAddress());

        // console.log(wallet.getAddress());
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



    useEffect(() => {
        setTimeout(() => {
            if (!window.ton)
                setWalletState(2);
            else
                setWalletState(0);

        }, 100)
    }, []);


    return (
        <>
            <div className="sideBarContainer">

                {
                    localStorage.getItem("publicKey") ?
                        <>
                            <img className={"p-4 text-light rounded-circle"} src={authorProfile} />
                            <span className={"text-light fw-bold "}>{localStorage.getItem("publicKey").substring(4) + "...." + localStorage.getItem("publicKey").substring(localStorage.getItem("publicKey").length - 4, 4)}</span>
                            <Button className={"m-2 text-light border-light generalBtn"} onClick={walletConnect}
                                variant={"contained"}>{walletState == 0 ? "Connect wallet" : walletState == 1 ? "Wallet Connected" : "Install Ton Wallet"}</Button>
                            <Button className={"m-2 text-light border-light"} variant={"outlined"} onClick={handleOpen}>Deposite</Button>
                        </> :
                        <div className={"m-2 mt-5 text-light border-light"}>
                            <span className={"text-light fw-bold "}>To use our platform and connect to other user you have to create a wallet or import one</span>
                            <Button className={"m-2 text-light border-light generalBtn"} onClick={createWallet}
                                variant={"contained"}>Create Wallet</Button>
                            <Button className={"m-2 text-light border-light"} variant={"outlined"} onClick={handleOpen}>Import Wallet</Button>
                        </div>
                }
                <div className={"d-flex flex-column justify-content-end flex-grow-1 "}>
                    {!localStorage.getItem("publicKey") ? <div></div> : <Button className={"m-2 mb-3"} color={"error"} variant={"contained"}>log out</Button>}

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
                            <>
                                <div>HI</div>
                                <Button className={"m-2 text-light border-light generalBtn"} onClick={createWallet}
                                    variant={"contained"}>Create Wallet</Button>
                            </>
                    }

                </Box>
            </Modal>
        </>
    );

}


export default Sidebar;