import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserRequest } from "./state/ducks/users/userSLice";
import { useEffect } from "react";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import SpSignup from "./components/Auth/SpSignup";
import CreateAd from "./components/Dashboard/CreateAd/CreateAd";
import MyAds from "./components/Dashboard/NewsFeed/MyAds";
import News from "./components/Dashboard/NewsFeed/News";
import Footer from "./components/Home/Footer";
import Home from "./components/Home/Home";
import EditProfile from "./components/ServiceProvider/Profile/EditProfile";
import Profile from "./components/ServiceProvider/Profile/Profile";
import Contracts from "./components/ServiceProvider/Profile/Contracts";

function App() {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserRequest());
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signup_Service_Provider" element={<SpSignup />} />
          <Route path="/News" element={<News />} />
          <Route path="/CreateAd" element={<CreateAd />} />
          <Route path="/MyAds" element={<MyAds />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/Contracts" element={<Contracts />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
