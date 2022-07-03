import psychologyImg from '../assets/Psychology.jpg'
import healthImg from '../assets/Health.jpg'
import VeterinarianImg from '../assets/Veterinarian.jpg'
import tradingImg from '../assets/trading.jpg'
import ClassRoomImg from '../assets/ClassRoom.jpg'
import CinematicImg from '../assets/Cinematic.jpg'
import WebinarImg from '../assets/Webinar.jpg'
import ConcertImg from '../assets/Concert1.jpg'
import SpeechImg from '../assets/Speech.jpg'
import profile1 from '../assets/profile1.jpg'
import profile2 from '../assets/profile2.jpg'
import profile3 from '../assets/profile3.jpg'
import profile4 from '../assets/profile4.jpg'
import profile5 from '../assets/profile5.jpg'
import profile6 from '../assets/profile6.jpg'
import vid from "../assets/video/ton.mp4"
import voi from "../assets/voice/voice.mp3"

export const RelationTypeMock = [
    {
        name: "peer to peer", value: 1,
        categories: [
            {name: "Psychology", value: 10, image: psychologyImg, desc:"Psychologist", title: "Dr. Hannibal Lecter", rating: 4,videoUrl : vid,voiceUrl : voi, fee: {chat : 0.010 , voice : 0.013 , video : 0.12}},
            {name: "Health Care", value: 11, image: healthImg, desc:"Cardiologist", title: "Dr. Smith", rating: 3,videoUrl : vid,voiceUrl : voi, fee: {chat : 0.010 , voice : 0.012 , video : 0.12}},
            {name: "Veterinarian", value: 12, image: VeterinarianImg, desc:"Veterinarian", title: "Dr. Terry", rating: 5,videoUrl : vid,voiceUrl : voi, fee: {chat : 0.010 , voice : 0.012 , video : 0.12}},
            {name: "trading advisor", value: 13, image: tradingImg, desc:"Trading advisor", title: "Thomas Gerard", rating: 4,videoUrl : vid,voiceUrl : voi, fee: {chat : 0.010 , voice : 0.012 , video : 0.12}},
            {name: "Real estate", value: 14, image: profile1, desc:"Real estate consultant", title: "Julia Happy", rating: 5,videoUrl : vid,voiceUrl : voi, fee: {chat : 0.0001 , voice : 0.001 , video : 0.12}},
            {name: "Programming Teacher", value: 15, image: profile2, desc:"Programming Teacher", title: "Estiven", rating: 4,videoUrl : vid,voiceUrl : voi, fee: {chat : 0.010 , voice : 0.012 , video : 0.12}},
            {name: "News", value: 16, image: profile4, desc:"Latest in Middle east (live at 2:00 pm)", title: "Leila News", rating: 5,videoUrl : vid,voiceUrl : voi, fee: {chat : 0.011 , voice : 0.025 , video : 0.12}},
            {name: "Podcast", value: 17, image: profile5, desc:"Every Friday Success seminar at 8:30 pm", title: "Thomas Tuchel", rating: 2,videoUrl : vid,voiceUrl : voi, fee: {chat : 0.06 , voice : 0.012 , video : 0.12}},
        ]
    }
    , {
        name: "Multiple audience", value: 2,
        categories: [
            {name: "onChain ClassRoom", value: 14, image: ClassRoomImg, title: "Golang Course 1", rating: 4, fee: {chat : 0.010 , voice : 0.012 , video : 0.12}},
            {name: "Cinematic", value: 15, image: CinematicImg, title: "Kill Bill 4", rating: 4, fee: {chat : 0.010 , voice : 0.012 , video : 0.12}},
            {name: "Webinar", value: 16, image: WebinarImg, title: "MicroFront-End", rating: 5, fee: {chat : 0.010 , voice : 0.012 , video : 0.12}},
            {name: "Concert", value: 17, image: ConcertImg, title: "Ac/Dc", rating: 5, fee: {chat : 0.010 , voice : 0.012 , video : 0.12}},
            {name: "Speech", value: 18, image: SpeechImg, title: "How to be winner", rating: 2, fee: {chat : 0.010 , voice : 0.012 , video : 0.12}},
        ]
    }]

