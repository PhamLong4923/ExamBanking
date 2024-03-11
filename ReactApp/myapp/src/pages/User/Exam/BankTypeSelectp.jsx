import Body from "../../../components/UI/Body.jsx";
import BankTypeSelect from "../../../components/User/ExamCreator/BankTypeSelect/BankTypeSelect.jsx";
import Header from "../../../components/UI/Header.jsx";
import Footer from "../../../components/UI/Footer.jsx";


const BankTypeSelectp = () => {
  return (

    <>
      <Header></Header>
      <Body content={<BankTypeSelect></BankTypeSelect>} picker={2}></Body>
      <Footer></Footer>
    </>


  )
};

export default BankTypeSelectp;
