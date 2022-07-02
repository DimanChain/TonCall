import authorProfile from '../../assets/profile-author.jpg'
import {Box, Button, IconButton, Modal, Rating} from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideocamIcon from '@mui/icons-material/Videocam';
import './ChatPage.css'
import {useEffect, useState} from "react";
import {RelationTypeMock} from "../../mock/mock";

function ChatPage() {

    const [walletState, setWalletState] = useState(false)
    const [relationType, setRelationType] = useState(1)
    const [relationCategories, setRelationCategories] = useState([])
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        setRelationType(event.target.checked ? 2 : 1);
    };
    

    useEffect(() => {
        setRelationCategories(RelationTypeMock.filter(val => val.value === (relationType))[0].categories)
    }, [relationType])

    return (

    );
}

export default ChatPage;