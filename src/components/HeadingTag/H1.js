import HStyle from './H1.module.css';
function H1({text}) {
    return ( 
        <>
            <h1 className={HStyle.h1}>
                {text}
            </h1>
        </>
     );
}

export default H1;