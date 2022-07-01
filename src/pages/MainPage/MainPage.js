import authorProfile from '../../assets/profile-author.jpg'
import {Button, styled, Switch} from '@mui/material'
import './MainPage.css'
import {useEffect, useState} from "react";
import {RelationTypeMock} from "../../mock/mock";

function MainPage() {

    const [walletState, setWalletState] = useState(false)
    const [relationType, setRelationType] = useState(1)
    const [relationCategories, setRelationCategories] = useState([])

    const handleChange = (event) => {
        setRelationType(event.target.checked ? 2 : 1);
    };

    useEffect(() => {
        setRelationCategories(RelationTypeMock.filter(val => val.value === (relationType))[0].categories)
    }, [relationType])

    return (
        <>
            <div className="sideBarContainer">
                <img className={"p-4 text-light rounded-circle"} src={authorProfile}/>
                <span className={"text-light fw-bold "}>Philipe inzagi</span>
                <Button className={"m-2 text-light border-light generalBtn"}
                        variant={"contained"}>{!walletState ? "Connect wallet" : "wallet connected"}</Button>
                <Button className={"m-2 text-light border-light"} variant={"outlined"}>Edit Profile</Button>
                <div className={"d-flex flex-column justify-content-end flex-grow-1 "}>
                    <Button className={"m-2 mb-3 text-light border-light"} variant={"outlined"}> log out</Button>
                </div>
            </div>
            <div className={"d-flex flex-column flex-grow-1"}>
                <div className={"p-2 d-flex appHeader flex-row align-items-center"}>
                    <span className={"text-dark"}>Peer to Peer</span>
                    <Switch onChange={handleChange}/>
                    <span className={"text-dark"}>Multiple audience</span>
                    <div className={"categoryContainer"}>
                        {relationCategories.map((catVal, catIndx) => {
                            return <Button className={"m-2"} variant={"outlined"} key={catIndx}>{catVal.name}</Button>
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPage;