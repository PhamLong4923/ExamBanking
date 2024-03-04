import Header from "../../../components/UI/Header.jsx";
import Footer from "../../../components/UI/Footer.jsx";
import Body from "../../../components/UI/Body.jsx";
import Repository from "../../../components/User/PersonalBank/Repository/Repository.jsx";

const Sections = () => {
  return (

    <>
      <Header></Header>
      <Body content={<Repository></Repository>} picker={1}></Body>
      <Footer></Footer>
    </>


  )
};

export default Sections;
