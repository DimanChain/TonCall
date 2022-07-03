import {Button, Rating, ToggleButton, ToggleButtonGroup} from '@mui/material'
import authorProfile from '../../assets/profile-author.jpg'
import ChatIcon from '@mui/icons-material/Chat';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideocamIcon from '@mui/icons-material/Videocam';
import './MainPage.css'
import {useEffect, useState} from "react";
import {RelationTypeMock} from "../../mock/mock";
import Sidebar from '../../components/sidebar';
import {Link} from "react-router-dom";

const chat_Type = 1
const voice_Type = 2
const video_Type = 3

function MainPage() {

    const [relationType, setRelationType] = useState(1)
    const [relationCategories, setRelationCategories] = useState([])
    const [selectedFee, setSelectedFee] = useState({id :0 ,type : chat_Type,fee :0});

    const handleChange = (event) => {
        setRelationType(event.target.checked ? 2 : 1);
    };


    useEffect(() => {
        setRelationCategories(RelationTypeMock.filter(val => val.value === (relationType))[0].categories)

    }, [relationType])

    return (
        <>
            <Sidebar/>
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
                            <div className={"eventsCard m-2 overflow-hidden"} key={catIndx}>
                                <div className={"d-flex flex-row justify-content-center eventsCard-upper"}>
                                    <img className={"m-4 text-light rounded-circle cardLogo"} src={catVal.image}/>
                                </div>
                                <div className={"d-flex flex-column justify-content-center eventsCard-downer pt-5"}>
                                    <span className={"fw-bold d-block"}>{catVal.title}</span>
                                    <span className={"alh_desc d-block mb-2"}>{catVal.desc}</span>
                                    <Rating value={catVal.rating} disabled/>
                                    <div
                                        className={"d-flex flex-column justify-content-center align-items-center mt-4 alh_box_choose_state"}>
                                        <span>Fee per second</span>
                                        <div className={"mt-1 d-flex flex-row justify-content-around w-75"}>
                                            <ToggleButtonGroup
                                                value={JSON.stringify(selectedFee)}
                                                exclusive
                                                onChange={(e)=>{
                                                    console.log(e.currentTarget.value)
                                                    setSelectedFee(JSON.parse(e.currentTarget.value))
                                                }}
                                                aria-label="selected type"
                                            >
                                                <ToggleButton className={"d-flex flex-column"}
                                                              value={JSON.stringify({id:catVal.value,type : chat_Type,fee :catVal.fee.chat})}
                                                              aria-label="chat_Type">
                                                    < ChatIcon/>
                                                    <span className={"feeText"}>{catVal.fee.chat}</span>
                                                </ToggleButton>
                                                <ToggleButton className={"d-flex flex-column"}
                                                              value={JSON.stringify({id:catVal.value,type : voice_Type,fee :catVal.fee.voice})}
                                                              aria-label="chat_Type">
                                                    < KeyboardVoiceIcon/>
                                                    <span className={"feeText"}>{catVal.fee.voice}</span>
                                                </ToggleButton>
                                                <ToggleButton className={"d-flex flex-column"}
                                                              value={JSON.stringify({id:catVal.value,type : video_Type,fee :catVal.fee.video})}
                                                              aria-label="chat_Type">
                                                    < VideocamIcon/>
                                                    <span className={"feeText"}>{catVal.fee.video}</span>
                                                </ToggleButton>
                                            </ToggleButtonGroup>

                                            {/*<IconButton aria-label="ChatIcon" color="primary"*/}
                                            {/*            className={"d-flex flex-column"}>*/}
                                            {/*    < ChatIcon/>*/}
                                            {/*    <span className={"feeText"}>{catVal.fee.chat}</span>*/}
                                            {/*</IconButton>*/}
                                            {/*<IconButton aria-label="KeyboardVoiceIcon" color="primary"*/}
                                            {/*            className={"d-flex flex-column"}>*/}
                                            {/*    < KeyboardVoiceIcon/>*/}
                                            {/*    <span className={"feeText"}>{catVal.fee.voice}</span>*/}
                                            {/*</IconButton>*/}
                                            {/*<IconButton aria-label="VideocamIcon" color="primary"*/}
                                            {/*            className={"d-flex flex-column"}>*/}
                                            {/*    < VideocamIcon/>*/}
                                            {/*    <span className={"feeText"}>{catVal.fee.video}</span>*/}
                                            {/*</IconButton>*/}
                                        </div>
                                    </div>
                                    <Link  to={{
                                        pathname: "/connect/" + catVal.value,
                                    }}
                                          state={{
                                              data: {
                                                  client: {
                                                      name: "YOU",
                                                      image: authorProfile
                                                  },
                                                  server: {
                                                      fee: selectedFee.fee,
                                                      name: catVal.title,
                                                      image: catVal.image,
                                                      type : selectedFee.type,
                                                      mediaSource : (selectedFee.type === video_Type ? catVal.videoUrl : catVal.voiceUrl)
                                                  }
                                              }
                                          }}>
                                        <Button disabled={selectedFee.id !== catVal.value} classes={{text: "requestBtn"}} className={"m-2 requestBtn"}
                                                variant={"contained"}>Request Channel</Button>
                                    </Link>
                                </div>
                            </div>)
                    })}
                </div>
            </div>

        </>
    );
}

export default MainPage;