import authorProfile from '../../assets/profile-author.jpg'
import {Button} from '@mui/material'
import './MainPage.css'
import {useState} from "react";

function MainPage() {

    const [walletState,setWalletState] = useState(false)
    const [relationType,setRelationType] = useState()

    return (
       <>
            <div className="sideBarContainer">
                <img className={"p-4 text-light rounded-circle"} src={authorProfile}/>
                <span className={"text-light fw-bold "}>Philipe inzagi</span>
                <Button className={"m-2 text-light border-light generalBtn"}
                        variant={"contained"}>{!walletState ? "Connect wallet":"wallet connected"}</Button>
                <Button className={"m-2  text-light border-light"} variant={"outlined"}>Edit Profile</Button>
                <div className={"d-flex flex-column justify-content-end flex-grow-1 "}>
                    <Button className={"m-2 mb-3 text-light border-light"} variant={"outlined"}> log out</Button>
                </div>
            </div>
            <div className={"mainContainer"}>



            </div>
       </>
    );
}

export default MainPage;