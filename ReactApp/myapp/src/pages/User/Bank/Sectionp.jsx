import Body from "../../../components/UI/Body.jsx";
import Header from "../../../components/UI/Header.jsx";
import Footer from "../../../components/UI/Footer.jsx";
import Section from "../../../components/User/PersonalBank/Section/Section.jsx";

const Sections = () => {
  return (

    <>
      <Header></Header>
      <Body content={<Section></Section>} picker={1}></Body>
      <Footer></Footer>
    </>


  )
};

export default Sections;
