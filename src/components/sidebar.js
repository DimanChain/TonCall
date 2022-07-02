
import authorProfile from '../assets/profile-author.jpg'
import { Button, Box, Modal } from '@mui/material'
import { useEffect, useState } from "react";






function Sidebar() {
    const [open, setOpen] = useState(false);

    const [walletState, setWalletState] = useState(0)
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
                        <div>
                            <img className={"p-4 text-light rounded-circle"} src={authorProfile} />
                            <span className={"text-light fw-bold "}>Philipe inzagi</span>
                            <Button className={"m-2 text-light border-light generalBtn"} onClick={walletConnect}
                                variant={"contained"}>{walletState == 0 ? "Connect wallet" : walletState == 1 ? "Wallet Connected" : "Install Ton Wallet"}</Button>
                            <Button className={"m-2 text-light border-light"} variant={"outlined"} onClick={handleOpen}>Deposite</Button>
                        </div> :
                        <div className={"m-2 mt-5 text-light border-light"}>
                            <span className={"text-light fw-bold "}>To use our platform and connect to other user you have to create a wallet or import one</span>
                            <Button className={"m-2 text-light border-light generalBtn"} onClick={walletConnect}
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
                <Box className={"modalStyle"}>
                    <span>HI</span>
                </Box>
            </Modal>
        </>
    );

}


export default Sidebar;