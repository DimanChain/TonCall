import { Link } from "react-router-dom";

import { Button } from "@mui/material";
import ReactPlayer from "react-player";

import LandingStyle from "./Landing.module.css";
import TitleLanding from "../../components/landing/TitleLanding";
import LineLanding from "../../components/landing/LineLanding";
import H1 from "../../components/HeadingTag/H1";
import figmaSvg from "../../assets/figma.svg";
import copyright from "../../assets/copyright.svg";
import github from "../../assets/github.svg";
function Landing() {
  return (
    <>
      <div className="container">
        <div className={LandingStyle.sec1}>
          <div className={LandingStyle.overly}></div>
          <h2 className={LandingStyle.h2}>Pretty cool, duh!</h2>
          <TitleLanding miniText={"July 2022"}>
            <H1 text={"TonCall 💎"} />
          </TitleLanding>
          <LineLanding />
          <div className={LandingStyle.LineSteps}>
            <div className={LandingStyle.step1}>
              <div className={LandingStyle.stepCircle}></div>
              <div className={LandingStyle.stepText1}>About Project</div>
            </div>
            <div className={LandingStyle.step2}>
              <div className={LandingStyle.stepCircle}></div>
              <div className={LandingStyle.stepText2}>Introduction Video</div>
            </div>
            <div className={LandingStyle.step3}>
              <div className={LandingStyle.stepCircle}></div>
              <div className={LandingStyle.stepText3}>OurVision</div>
            </div>
            <div className={LandingStyle.step4}>
              <div className={LandingStyle.stepCircle}></div>
              <div className={LandingStyle.stepText4}>Launch Protorype 🚀 </div>
            </div>
          </div>
        </div>
        <div className={LandingStyle.sec2}>
          <TitleLanding miniText={""}>
            <H1 text={"About Project 🤓"} />
          </TitleLanding>
          <LineLanding />
          <div className={LandingStyle.aboutProject}>
            <p>
              TonCall is an instant consultation service, multi-platform, based
              on the Ton network. The service also offers video calling, voice
              calling, messaging, and several other features. In other words, in
              each call, the cost of each second of conversation with the
              consultant is calculated for the applicant and is instantly
              deducted from the applicant's wallet and added to the consultant's
              wallet using the Ton network channel. 😎
            </p>
            <a
              href="https://github.com/DimanChain/TonCall"
              target="_blank"
            >
              <Button
                classes={{ text: "requestBtn" }}
                className={LandingStyle.github}
                variant={"contained"}
              >
                Bring me to Github
                <img src={github} alt="" />
              </Button>
            </a>
          </div>
        </div>
        <div className={LandingStyle.sec3}>
          <TitleLanding miniText={""}>
            <H1 text={"Introduction Video 🎬"} />
          </TitleLanding>
          <LineLanding />
          <ReactPlayer
            url="https://www.youtube.com/watch?v=Rq5SEhs9lws"
            width={"100%"}
            height={500}
          />
        </div>
        <div className={LandingStyle.sec4}>
          <TitleLanding miniText={""}>
            <H1 text={"Our visions 🎯"} />
          </TitleLanding>
          <LineLanding />
          <div className={LandingStyle.aboutProject}>
            <p>
              We have some useful vision for our project.
              Imagine a provider creating a room with categories like Concert, Seminar, etc. Then
              applicants can join the room. Therefore, each applicant has a Ton
              channel with the provider. In fact, it is a one to many
              relationship between providers and applicants. Like a live
              Metallica concert. Without tickets you can really enjoy the
              concert with an unlimited audience. You only pay for every second
              you spend at the show, so you can leave the concert whenever you
              want and you only pay for the time you spent at the concert. 🎸
            </p>
          </div>
        </div>
        <div className={LandingStyle.sec5}>
          <TitleLanding miniText={""}>
            <H1 text={"Take a look at our Prototype 🚀"} />
          </TitleLanding>
          <LineLanding />
          <Link to={"/mainPage"}>
            <Button
              classes={{ text: "requestBtn" }}
              className={LandingStyle.launchApp}
              variant={"contained"}
            >
              Launch App
            </Button>
          </Link>
        </div>
        <a
          href="https://www.figma.com/file/GgSgNcHhAV599QD8PhCmWg/Untitled?node-id=12%3A571"
          target="_blank"
          className={LandingStyle.sec6}
        >
          <img src={figmaSvg} alt="" />
          <p>Checkout our desing in figma</p>
        </a>
        <div className={LandingStyle.sec7}>
          <img src={copyright} alt="" />
          <p>Copyright 2022 DimanChain - All Rights Reserved</p>
        </div>
        {/* 
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className={"d-flex flex-column flex-grow-1"}>
          <Link to={"/mainPage"}>
            <Button
              classes={{ text: "requestBtn" }}
              className={"m-2 requestBtn"}
              variant={"contained"}
            >
              Go to main page
            </Button>
          </Link>
          <p className={LandingStyle.ali}>lkdjfngkjd</p>
        </div> */}
      </div>
    </>
  );
}

export default Landing;
