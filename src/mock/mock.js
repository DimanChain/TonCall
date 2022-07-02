import psychologyImg from '../assets/Psychology.jpg'
import healthImg from '../assets/Health.jpg'
import VeterinarianImg from '../assets/Veterinarian.jpg'
import tradingImg from '../assets/trading.jpg'
import ClassRoomImg from '../assets/ClassRoom.jpg'
import CinematicImg from '../assets/Cinematic.jpg'
import WebinarImg from '../assets/Webinar.jpg'
import ConcertImg from '../assets/Concert1.jpg'
import SpeechImg from '../assets/Speech.jpg'

export const RelationTypeMock = [
    {
        name: "peer to peer", value: 1,
        categories: [
            {name: "Psychology", value: 10, image: psychologyImg, title: "Dr.Wick", rating: 4, fee: {chat : 0.010 , voice : 0.013 , video : 0.12}},
            {name: "Health Care", value: 11, image: healthImg, title: "Dr.Smith", rating: 3, fee: {chat : 0.010 , voice : 0.012 , video : 0.12}},
            {name: "Veterinarian", value: 12, image: VeterinarianImg, title: "Dr.Terry", rating: 5, fee: {chat : 0.010 , voice : 0.012 , video : 0.12}},
            {name: "trading advisor", value: 13, image: tradingImg, title: "Thomas Gerard", rating: 1, fee: {chat : 0.010 , voice : 0.012 , video : 0.12}},
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

