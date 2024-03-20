import SbrQbank from "../../../components/User/Qbank/SbrQbank.jsx";
import Body from "../../../components/UI/Body.jsx";
import Header from "../../../components/UI/Header.jsx";
import Footer from "../../../components/UI/Footer.jsx";

const BankTypep = () => {

  return (
    <>
      <Header></Header>
      <Body content={<SbrQbank></SbrQbank>} picker={1}></Body>
      <Footer></Footer>
    </>

  )
};

export default BankTypep;
