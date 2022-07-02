import {  Button } from '@mui/material'
import './Landing.css'
import {Link} from "react-router-dom";
function Landing() {


    return (
        <>
            <div className={"d-flex flex-column flex-grow-1"}>
                <Link to={"/mainPage"} >
                    <Button classes={{ text: "requestBtn" }} className={"m-2 requestBtn"} variant={"contained"}>Go to main page</Button>
                </Link>
            </div>

        </>
    );
}

export default Landing;