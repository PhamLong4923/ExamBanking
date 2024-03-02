import Body from "../../../components/UI/Body.jsx";
import RepoSelect from "../../../components/User/ExamCreator/RepoSelect/RepoSeclect.jsx";
import Header from "../../../components/UI/Header.jsx";
import Footer from "../../../components/UI/Footer.jsx";


const RepoSelectp = () => {
  return (

    <>
      <Header></Header>
      <Body content={<RepoSelect></RepoSelect>} picker={2}></Body>
      <Footer></Footer>
    </>

  )
};

export default RepoSelectp;
