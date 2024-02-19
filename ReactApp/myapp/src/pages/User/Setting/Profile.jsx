import Body from "../../../components/UI/Body.jsx";
import Footer from "../../../components/UI/Footer.jsx";
import Header from "../../../components/UI/Header.jsx";
import Profile from "../../../components/User/Profile/Profile.jsx";


const HomeScreen = () => {
  return (
    <div>
      <Header></Header>

      <Body content={<Profile></Profile>} picker={-5}>
      </Body>

      <Footer></Footer>

    </div>
  )
};

export default HomeScreen;
