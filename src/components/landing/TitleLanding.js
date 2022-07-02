import TitleLandingStyle from "./TitleLanding.module.css";
// import CustomHeading1 from '../HeadingTag/H1';

function TitleLanding({ children,miniText }) {
  return (
    <>
            {children}
            <span className={TitleLandingStyle.mini_text}>
                {miniText && miniText}
            </span>
    </>
  );
}

export default TitleLanding;
