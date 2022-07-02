
import authorProfile from '../assets/profile-author.jpg'
import { Button, Box, Modal } from '@mui/material'
import { useEffect, useState } from "react";






function Sidebar() {
    const [open, setOpen] = useState(false);

    const [walletState, setWalletState] = useState(0)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        setTimeout(() => {
            if (!window.ton)
                setWalletState(2);
            else
                setWalletState(0);
        }, 100)
    }, [])
    return (
        <>
            <div className="sideBarContainer">
                <img className={"p-4 text-light rounded-circle"} src={authorProfile} />
                <span className={"text-light fw-bold "}>Philipe inzagi</span>
                <Button className={"m-2 text-light border-light generalBtn"}
                    variant={"contained"}>{!walletState ? "Connect wallet" : "wallet connected"}</Button>
                <Button className={"m-2 text-light border-light"} variant={"outlined"} onClick={handleOpen}>Deposite</Button>
                <div className={"d-flex flex-column justify-content-end flex-grow-1 "}>
                    <Button className={"m-2 mb-3"} color={"error"} variant={"contained"}>log out</Button>
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