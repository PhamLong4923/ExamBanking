import Body from "../../../components/UI/Body.jsx";
import Login from "../../../components/User/Login/login.jsx";
import Header from "../../../components/UI/Header.jsx";
import Footer from "../../../components/UI/Footer.jsx";


const Loginp = () => {
  return (

    <>
      <Header></Header>
      <Body content={<Login></Login>} picker={0}></Body>
      <Footer></Footer>
    </>


  )
};

export default Loginp;
