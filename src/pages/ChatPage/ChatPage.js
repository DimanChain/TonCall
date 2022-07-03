import SendIcon from '@mui/icons-material/Send';
import {Box, Button, Dialog, Divider, IconButton, Input, TextField, Typography} from '@mui/material'
import classes from './ChatPage.module.css'
import {useEffect, useState, useRef} from "react";
import moment from 'moment'
import Sidebar from "../../components/sidebar";
import {Link, useLocation} from "react-router-dom";
import serverWaiting from "../../assets/waiting-server.gif"
import clientRequest from "../../assets/client-request.gif"

import Countdown from "react-countdown";
import ReactPlayer from "react-player";

const chat_Type = 1
const voice_Type = 2
const video_Type = 3

function ChatPage() {
    const location = useLocation();
    const {client, server} = location.state?.data;
    const [messages, setMessages] = useState([]);
    const [clientText, setClientText] = useState("");
    const [meetingDuration, setMeetingDuration] = useState(10);
    const [meetingDurationMoment, setMeetingDurationMoment] = useState();
    const [serverText, setServerText] = useState("");

    const [startTime, setStartTime] = useState(moment());
    const [endTime, setEndTime] = useState(moment());
    const [openConfirmModal, setOpenConfirmModal] = useState(true);
    const [openFinishModal, setopenFinishModal] = useState(false);
    const [openServerConfirmModal, setServerOpenConfirmModal] = useState(false);
    const [startmeeting, setStartmeeting] = useState(false);
    const containerRef = useRef();
    const refCounter = useRef();

    useEffect(() => {
        containerRef.current.scrollIntoView({behavior: "smooth"});
    }, [messages])

    // useEffect(() => {
    //     if (meetingDuration > 0) {
    //         setMeetingDurationMoment(moment().add(meetingDuration, "minute").toString())
    //     }
    // }, [meetingDuration])

    const textHandler = (e, isClient) => {
        if (isClient) {
            setClientText(e.target.value);
        } else {
            setServerText(e.target.value);
        }
    }

    const clientRequestForChannel = () => {
        setOpenConfirmModal(false)
        setServerOpenConfirmModal(true)
        refCounter.current.pause();
    }

    const serverConfirmsRequestedChannel = () => {
        setServerOpenConfirmModal(false)
        setStartmeeting(true)
        setStartTime(moment().clone());
        setMeetingDurationMoment(moment().add(meetingDuration, "minute").toString())
        refCounter.current.start();
    }

    const sendHandler = (isClient) => {
        setMessages(prev => {
            return [...prev, {
                owner: (isClient ? "YOU" : server.name),
                createAt: moment().format("HH:mm:ss"),
                isClient: isClient,
                body: (isClient ? clientText : serverText)
            }]
        })
        if (isClient) {
            setClientText('');
        } else {
            setServerText('');
        }
    }
    const handleKeyPress = (e, isClient) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if ((isClient && clientText.length > 0) || (!isClient && serverText.length > 0)) {
                sendHandler(isClient)
            }
        }
    };

    const endChannel = () => {
        setEndTime(moment().clone());
        localStorage.removeItem("chatState");
        refCounter.current.pause();
        setopenFinishModal(true)
    };

    const countDownSaver = ({total, days, hours, minutes, seconds, milliseconds, completed}) => {

        localStorage.setItem("chatState", `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };


    return (
        <>
            <Sidebar/>
            <div className={"d-flex flex-column flex-grow-1"}>
                <div className={classes.chatContainer}>
                    <div className={classes.chatHeader}>
                        {startmeeting ?
                            <>
                                <Button variant={"outlined"} color={"error"}>
                                    <Countdown
                                        ref={refCounter}
                                        daysInHours={true}
                                        date={meetingDurationMoment}
                                        zeroPadTime={2}
                                        onComplete={endChannel}
                                        onTick={countDownSaver}/>
                                </Button>
                                <Button variant={"contained"} color={"error"} onClick={endChannel}>End Channel</Button>
                            </> : null
                        }
                    </div>
                    {
                        startmeeting && (server.type === video_Type || server.type === voice_Type) ?
                            <div className={classes.mediaPlayerContainer + ' ' + (server.type === video_Type ? classes.mediaPlayerVideo : classes.mediaPlayerVoice)}>
                                <ReactPlayer config={{ file: {
                                        attributes: {
                                            controlsList: 'nodownload'
                                        }
                                    }}}
                                             playing url={server.mediaSource} height={"90%"} controls={true}/>
                            </div> : null
                    }
                    <div className={classes.messagesListContainer}>
                        <div className={classes.messagesList + ' pt-3'}>
                            {messages.map((messageValue, messageIndex) => {
                                const {body, createAt,} = messageValue
                                return (
                                    <div
                                        className={classes.messageWrapper + ' mt-0 ' + (messageValue.isClient ? 'justify-content-end' : 'justify-content-start')}>
                                        {messageValue.isClient ?
                                            <>
                                                <Box
                                                    className={classes.message + ' m-3 mt-0 p-3  ' + classes.clientMessages}
                                                    key={messageIndex}>
                                                    <span className={"fs-6"}>{messageValue.owner}</span>
                                                    <span className={"fs-5 fw-bold"}>{body}</span>
                                                    <span className={"fs-6"}>{createAt}</span>
                                                </Box>
                                                <img src={client.image}
                                                     className={classes.profile}/>
                                            </>
                                            :
                                            <>
                                                <img src={server.image}
                                                     className={classes.profile}/>
                                                <Box
                                                    className={classes.message + ' m-3 mt-0 p-3  ' + classes.serverMessages}
                                                    key={messageIndex}>
                                                    <span className={"fs-6"}>{messageValue.owner}</span>
                                                    <span className={"fs-5 fw-bold"}>{body}</span>
                                                    <span className={"fs-6"}>{createAt}</span>
                                                </Box>

                                            </>}

                                    </div>
                                )
                            })}
                            <div id="bottom-reference" ref={containerRef}/>
                        </div>
                    </div>
                    <div className={classes.footer}>
                        <IconButton onClick={() => {
                            sendHandler(false)
                        }} disabled={!serverText} classes={{disabled: classes.disabled}}>
                            <SendIcon/>
                        </IconButton>
                        <img src={server.image} className={classes.profileInModal}/>
                        <TextField

                            className={classes.input}
                            placeholder={('write message here ...')}
                            multiline
                            rows={1}
                            // sx={{ padding: "13px 4px" }}
                            onChange={(e) => {
                                setServerText(e.target.value)
                            }}
                            value={serverText}
                            inputProps={{
                                sx: {fontSize: 14,},
                                onKeyPress: (e) => {
                                    handleKeyPress(e, false)
                                }
                            }}

                        />

                        <Divider orientation="vertical" variant="middle" flexItem/>
                        <IconButton onClick={() => {
                            sendHandler(true)
                        }} disabled={!clientText} classes={{disabled: classes.disabled}}>
                            <SendIcon/>
                        </IconButton>
                        <img src={client.image} className={classes.profileInModal}/>
                        <TextField
                            className={classes.input}
                            placeholder={('write message here ...')}
                            multiline
                            rows={1}
                            // sx={{ padding: "13px 4px" }}
                            onChange={(e) => {
                                setClientText(e.target.value)
                            }}
                            value={clientText}
                            inputProps={{
                                sx: {fontSize: 14,},
                                onKeyPress: (e) => {
                                    handleKeyPress(e, true)
                                }
                            }}
                        />
                    </div>
                    {!startmeeting ?
                        <div className={classes.overlayContainer}>
                            <div className={classes.overlayLeft} id={"serverOverLay"}>
                                {(!openServerConfirmModal) ?
                                    <>
                                        <img src={serverWaiting} className={classes.gifStyle}/>
                                        <Typography variant={"h5"} className={"text-light"}>Provider is waiting
                                            for</Typography>
                                        <Typography variant={"h5"} className={"text-light"}>connect Signal</Typography>
                                    </>
                                    :
                                    <Dialog
                                        onClose={(e, reason) => {
                                            if (reason && reason === "backdropClick") {
                                                return;
                                            }
                                            setOpenConfirmModal(false)
                                        }}
                                        container={() => document.getElementById('serverOverLay')}
                                        disableEscapeKeyDown={true}
                                        open={openServerConfirmModal}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description">
                                        <div className={classes.confirmModal}>
                                            <img src={server.image} className={classes.profileInModal}/>
                                            <span><span className={"fw-bold"}>{server.name}</span> Please confirm channel request</span>
                                            <span>requested duration is {meetingDuration} minutes</span>
                                            <Button className={"m-2 text-light border-light generalBtn"}
                                                    onClick={serverConfirmsRequestedChannel}
                                                    variant={"contained"}>confirm</Button>
                                        </div>
                                    </Dialog>
                                }
                            </div>
                            <div className={classes.overlayRight} id={"clientOverLay"}>
                                {(!openServerConfirmModal) ?
                                    <Dialog
                                        onClose={(e, reason) => {
                                            if (reason && reason === "backdropClick") {
                                                return;
                                            }
                                            setOpenConfirmModal(false)
                                        }}
                                        container={() => document.getElementById('clientOverLay')}
                                        disableEscapeKeyDown={true}
                                        open={openConfirmModal}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description">
                                        <div className={classes.confirmModal}>
                                            <img src={client.image} className={classes.profileInModal}/>
                                            <span><span className={"fw-bold"}>{client.name}</span> as Client requesting for start channel</span>
                                            <span>please initial the duration of </span>
                                            <span>conversation / meeting / consultation</span>
                                            <Input
                                                value={meetingDuration}
                                                onChange={(e) => {
                                                    if (e.target.value > 0) {
                                                        setMeetingDuration(e.target.value)
                                                    }
                                                }}
                                                classes={{input: "text-center"}}
                                                placeholder={"Select the duration"}
                                                type={"number"}
                                                endAdornment={<span>minutes</span>}/>
                                            <span>initial amount to start channel :</span>
                                            <span>{server.fee} (fee) * {meetingDuration} (min) * 60 (seconds) = {(server.fee * meetingDuration * 60).toFixed(2)}</span>
                                            <Button className={"m-2 text-light border-light generalBtn"}
                                                    onClick={clientRequestForChannel}
                                                    variant={"contained"}>confirm</Button>
                                        </div>
                                    </Dialog>
                                    :
                                    <>
                                        <img src={clientRequest} className={classes.gifStyle}/>
                                        <Typography variant={"h5"} className={"text-light"}>Client is waiting for
                                            confirm</Typography>
                                    </>
                                }
                            </div>
                        </div> : null}
                </div>
            </div>
            <Dialog
                onClose={(e, reason) => {
                    if (reason && reason === "backdropClick") {
                        return;
                    }
                    setopenFinishModal(false)
                }}
                disableEscapeKeyDown={true}
                open={openFinishModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <div className={classes.confirmModal}>
                    <img src={client.image} className={classes.profileInModal}/>
                    <span>you spend {moment.duration(endTime.diff(startTime)).hours().toString().padStart(2, '0')
                        + ':' + moment.duration(endTime.diff(startTime)).minutes().toString().padStart(2, '0')
                        + ':' + moment.duration(endTime.diff(startTime)).seconds().toString().padStart(2, '0')} and {(moment.duration(endTime.diff(startTime)).asSeconds() * server.fee).toFixed(5)} token this time!</span>
                    <Link to={"/mainPage"}
                          className={"m-2 text-light border-light generalBtn p-2 text-center rounded-3"}>See you
                        soon!</Link>
                </div>
            </Dialog>
        </>
    );
}

export default ChatPage;