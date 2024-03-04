import Body from "../../../components/UI/Body.jsx";
import ExamConfig from "../../../components/User/ExamCreator/ExamConfig/ExamConfig.jsx";
import Header from "../../../components/UI/Header.jsx";
import Footer from "../../../components/UI/Footer.jsx";


const RepoSelectp = () => {
  return (

    <>
      <Header></Header>
      <Body content={<ExamConfig></ExamConfig>} picker={2}></Body>
      <Footer></Footer>
    </>


  )
};

export default RepoSelectp;
