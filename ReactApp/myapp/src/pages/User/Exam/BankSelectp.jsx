import Body from "../../../components/UI/Body.jsx";
import BankSelect from "../../../components/User/ExamCreator/BankSelect/BankSelect.jsx";
import Header from "../../../components/UI/Header.jsx";
import Footer from "../../../components/UI/Footer.jsx";

const BankSelectp = () => {
  return (

    <>
      <Header></Header>
      <Body content={<BankSelect></BankSelect>} picker={2}></Body>
      <Footer></Footer>
    </>


  )
};

export default BankSelectp;
