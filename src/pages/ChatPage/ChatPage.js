import authorProfile from '../../assets/profile-author.jpg'
import SendIcon from '@mui/icons-material/Send';
import {Box, Button, Dialog, IconButton, Input, Modal, Rating, TextField, Typography} from '@mui/material'
import classes from './ChatPage.module.css'
import {useEffect, useState, useRef} from "react";
import moment from 'moment'
import Sidebar from "../../components/sidebar";
import {Link, useLocation} from "react-router-dom";
import serverWaiting from "../../assets/waiting-server.gif"
import clientRequest from "../../assets/client-request.gif"
import Countdown from "react-countdown";

function ChatPage() {
    const location = useLocation();
    const {client, server} = location.state?.data;
    const [messages, setMessages] = useState([{
        owner: "YOU",
        createAt: moment().format("yyyy/MM/DD"),
        isClient: true,
        body: "What version of the css-loader, style-loader and postcss-loader do you use? "
    }, {
        owner: "Dr,Wick",
        createAt: moment().format("yyyy/MM/DD"),
        isClient: false,
        body: " I'm using a boilerplate so I may not be able to update them to latest version for all of them"
    }, {
        owner: "YOU",
        createAt: moment().format("yyyy/MM/DD"),
        isClient: true,
        body: "gotcha!!"
    }]);
    const [clientText, setClientText] = useState("");
    const [meetingDuration, setMeetingDuration] = useState(10);
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
    }

    const serverConfirmsRequestedChannel = () => {
        setServerOpenConfirmModal(false)
        setStartmeeting(true)
        setStartTime(moment().clone());
    }

    const sendHandler = (isClient) => {
        setMessages(prev => {
            return [...prev, {
                owner: (isClient ? "YOU" : server.name),
                createAt: moment().format("yyyy/MM/DD"),
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
        refCounter.current.stop();
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
                                        daysInHours={true} date={moment().add(meetingDuration, "minute").toString()}
                                        zeroPadTime={2}
                                        onComplete={endChannel}
                                        onTick={countDownSaver}/>
                                </Button>
                                <Button variant={"contained"} color={"error"} onClick={endChannel}>End Channel</Button>
                            </> : null
                        }
                    </div>
                    <div className={classes.messagesListContainer}>
                        <div className={classes.messagesList + ' pt-3'}>
                            {messages.map((messageValue, messageIndex) => {
                                const {body, createdAt,} = messageValue
                                return (
                                    <div
                                        className={classes.messageWrapper + ' mt-0 ' + (messageValue.isClient ? 'justify-content-end' : 'justify-content-start')}>
                                        <Box
                                            className={classes.message + ' m-3 mt-0 p-3  ' + (messageValue.isClient ? classes.clientMessages : classes.serverMessages)}
                                            key={messageIndex}>
                                            <div>{messageValue.owner}</div>
                                            <div>{body}</div>
                                            <div>{moment(createdAt).format("HH:mm:ss")}</div>
                                        </Box>
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
                        <TextField
                            className={classes.input}
                            placeholder={('write message here ...')}
                            multiline
                            rows={1}
                            // sx={{ padding: "13px 4px" }}
                            onChange={(e) => {
                                textHandler(e, false)
                            }}
                            value={serverText}
                            inputProps={{
                                sx: {fontSize: 14,},
                                onKeyPress: (e) => {
                                    handleKeyPress(e, false)
                                }
                            }}
                        />

                        <div></div>
                        <IconButton onClick={() => {
                            sendHandler(true)
                        }} disabled={!clientText} classes={{disabled: classes.disabled}}>
                            <SendIcon/>
                        </IconButton>
                        <TextField
                            className={classes.input}
                            placeholder={('write message here ...')}
                            multiline
                            rows={1}
                            // sx={{ padding: "13px 4px" }}
                            onChange={(e) => {
                                textHandler(e, true)
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
                                            <span>Please confirm channel request</span>
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
                                            <span>please initial the duration of </span>
                                            <span>conversation / meeting / consultation</span>
                                            <Input
                                                value={meetingDuration}
                                                onChange={(e) => {
                                                    if (e.target.value > 0) {
                                                        setMeetingDuration(e.target.value)
                                                    }
                                                }}
                                                placeholder={"Select the duration"}
                                                type={"number"}
                                                endAdornment={<span>minutes</span>}/>
                                            <span>initial amount to start channel :</span>
                                            <span>fee {server.fee.chat} * {meetingDuration} * 60 = {(server.fee.chat * meetingDuration * 60).toFixed(2)}</span>
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
                    <span>you spend {moment.duration(endTime.diff(startTime)).hours().toString().padStart(2, '0')
                        + ':' + moment.duration(endTime.diff(startTime)).minutes().toString().padStart(2, '0')
                        + ':' + moment.duration(endTime.diff(startTime)).seconds().toString().padStart(2, '0')} and {(moment.duration(endTime.diff(startTime)).asSeconds() * server.fee.chat).toFixed(5)} token this time!</span>
                    <Link to={"/mainPage"} className={"m-2 text-light border-light generalBtn p-2 text-center rounded-3"}>See you soon!</Link>
                </div>
            </Dialog>
        </>
    );
}

export default ChatPage;