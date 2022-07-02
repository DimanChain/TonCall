import authorProfile from '../../assets/profile-author.jpg'
import { Box, Button, IconButton, Modal, Rating } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideocamIcon from '@mui/icons-material/Videocam';
import './MainPage.css'
import { useEffect, useState } from "react";
import { RelationTypeMock } from "../../mock/mock";
function MainPage() {

    const [walletState, setWalletState] = useState(0)
    const [relationType, setRelationType] = useState(1)
    const [relationCategories, setRelationCategories] = useState([])
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        setRelationType(event.target.checked ? 2 : 1);
    };

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
        setRelationCategories(RelationTypeMock.filter(val => val.value === (relationType))[0].categories)
        setTimeout(() => {
            if (!window.ton)
                setWalletState(2);
            else
                setWalletState(0);
        }, 100)
    }, [relationType])

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
            <div className={"d-flex flex-column flex-grow-1"}>
                {/*<div className={"p-2 d-flex appHeader flex-row align-items-center"}>*/}
                {/*    <span className={"text-dark"}>Peer to Peer</span>*/}
                {/*    <Switch onChange={handleChange}/>*/}
                {/*    <span className={"text-dark"}>Multiple audience</span>*/}
                {/*    <div className={"categoryContainer"}>*/}
                {/*        {relationCategories.map((catVal, catIndx) => {*/}
                {/*            return <Button className={"m-2"} variant={"outlined"} key={catIndx}>{catVal.name}</Button>*/}
                {/*        })}*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className={"eventsList d-flex flex-row flex-wrap justify-content-center"}>
                    {relationCategories.map((catVal, catIndx) => {
                        return (
                            <div className={"eventsCard m-4 overflow-hidden"} key={catIndx}>
                                <div className={"d-flex flex-row justify-content-center eventsCard-upper"}>
                                    <img className={"m-4 text-light rounded-circle cardLogo"} src={catVal.image} />
                                </div>
                                <div className={"d-flex flex-column justify-content-center eventsCard-downer pt-5"}>
                                    <span className={"fw-bold"}>{catVal.title}</span>
                                    <Rating value={catVal.rating} disabled />
                                    <span>Fee per second</span>
                                    <div className={"mt-2 d-flex flex-row justify-content-around w-75"}>
                                        <IconButton aria-label="ChatIcon" color="primary" className={"d-flex flex-column"}>
                                            < ChatIcon />
                                            <span className={"feeText"}>{catVal.fee.chat}</span>
                                        </IconButton>
                                        <IconButton aria-label="KeyboardVoiceIcon" color="primary" className={"d-flex flex-column"}>
                                            < KeyboardVoiceIcon />
                                            <span className={"feeText"}>{catVal.fee.voice}</span>
                                        </IconButton>
                                        <IconButton aria-label="VideocamIcon" color="primary" className={"d-flex flex-column"}>
                                            < VideocamIcon />
                                            <span className={"feeText"}>{catVal.fee.video}</span>
                                        </IconButton>
                                    </div>
                                    <Button classes={{ text: "requestBtn" }} className={"m-2 requestBtn"} variant={"contained"}>Request Channel</Button>
                                </div>
                            </div>)
                    })}
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

export default MainPage;