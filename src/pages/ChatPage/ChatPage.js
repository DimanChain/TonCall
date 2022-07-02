import authorProfile from '../../assets/profile-author.jpg'
import SendIcon from '@mui/icons-material/Send';
import {Box, Button, IconButton, Modal, Rating, TextField} from '@mui/material'
import classes from './ChatPage.module.css'
import {useEffect, useState, useRef} from "react";
import {RelationTypeMock} from "../../mock/mock";
import moment from 'moment'
import Sidebar from "../../components/sidebar";
import {useLocation} from "react-router-dom";

function ChatPage() {
    const location = useLocation();
    const {client, server} = location.state?.data;
    const [messages, setMessages] = useState([{
        owner: "philipe inzagi",
        createAt: moment().format("yyyy/MM/DD"),
        isClient: true,
        body: "What version of the css-loader, style-loader and postcss-loader do you use? "
    }, {
        owner: "Dr,Wick",
        createAt: moment().format("yyyy/MM/DD"),
        isClient: false,
        body: " I'm using a boilerplate so I may not be able to update them to latest version for all of them"
    }, {
        owner: "philipe inzagi",
        createAt: moment().format("yyyy/MM/DD"),
        isClient: true,
        body: "gotcha!!"
    }]);
    const [clientText, setClientText] = useState("");
    const [serverText, setServerText] = useState("");
    const containerRef = useRef();

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
    const sendHandler = (isClient) => {
        setMessages(prev => {
            return [...prev, {
                owner: (isClient ? client.name : server.name),
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

    return (
        <>
            <Sidebar/>
            <div className={"d-flex flex-column flex-grow-1"}>
                <div className={classes.chatContainer}>
                    <div className={classes.chatHeader}>
                        <div className={classes.profileWrapper}>
                            <div className={classes.profile}>
                                {/*<img className={classes.img} alt="" src={avatar ? `${MainUrl}${avatar}` : "/assets/image/no_photo.png} />*/}
                            </div>
                        </div>
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
                </div>
            </div>
        </>
    );
}

export default ChatPage;