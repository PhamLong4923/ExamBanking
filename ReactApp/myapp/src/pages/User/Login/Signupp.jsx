import Body from "../../../components/UI/Body.jsx";
import Signup from "../../../components/User/Signup/signup.jsx";
import Header from "../../../components/UI/Header.jsx";
import Footer from "../../../components/UI/Footer.jsx";


const Signupp = () => {
    return (

        <>
            <Header></Header>
            <Body content={<Signup></Signup>} picker={0}></Body>
            <Footer></Footer>
        </>


    )
};

export default Signupp;
