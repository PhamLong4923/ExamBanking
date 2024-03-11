import Body from "../../../components/UI/Body.jsx";
import PBank from "../../../components/User/PersonalBank/PBank.jsx"
import Header from "../../../components/UI/Header.jsx";
import Footer from "../../../components/UI/Footer.jsx";


const Bankp = () => {
  return (
    
    <>
      <Header></Header>
      <Body content={<PBank></PBank>} picker={1}></Body>
      <Footer></Footer>
    </>
      

  )
};

export default Bankp;
