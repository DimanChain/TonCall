import { Link } from "react-router-dom";

import { Button } from "@mui/material";
import ReactPlayer from "react-player";

import LandingStyle from "./Landing.module.css";
import TitleLanding from "../../components/landing/TitleLanding";
import LineLanding from "../../components/landing/LineLanding";
import H1 from "../../components/HeadingTag/H1";
import figmaSvg from "../../assets/figma.svg";
import copyright from "../../assets/copyright.svg";
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
              <div className={LandingStyle.stepText3}>Roadmap</div>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est.
            </p>
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
            <H1 text={"Roadmap 🎯"} />
          </TitleLanding>
          <LineLanding />
          <div className={LandingStyle.aboutProject}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est.
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
        <div className={LandingStyle.sec6}>
          <img src={figmaSvg} alt="" />
          <p>Checkout our desing in figma</p>
        </div>
        <div className={LandingStyle.sec7}>
          <img src={copyright} alt="" />
          <p>Copyright 2022 DimanChain - All Rights Reserved</p>
        </div>
        
      </div>
    </>
  );
}

export default Landing;
