import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import NotFound from "./components/Common/Errors/NotFound";
import SubmitProposal from "./components/ServiceProvider/Profile/SubmitProposal";
import ViewProposal from "./components/ServiceProvider/Profile/ViewProposals";

function App() {
  let dispatch = useDispatch();
  let user = useSelector((state) => state.user.data);
  useEffect(() => {
    dispatch(getUserRequest());
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {!user.roll && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Signup_Service_Provider" element={<SpSignup />} />
            </>
          )}
          {user.roll && (
            <>
              <Route path="/News" element={<News />} />
              <Route path="/MyAds" element={<MyAds />} />
              <Route path="/Contracts" element={<Contracts />} />
              <Route path="/SubmitProposal" element={<SubmitProposal />} />
              <Route path="/ViewProposal" element={<ViewProposal />} />
            </>
          )}
          {user.roll === 1 && <Route path="/CreateAd" element={<CreateAd />} />}
          {user.roll === 2 && (
            <>
              <Route path="/Profile" element={<Profile />} />
              <Route path="/EditProfile" element={<EditProfile />} />
            </>
          )}
          {user.roll ? (
            <Route path="*" element={<Navigate to="/News" replace />} />
          ) : (
            <Route path="*" element={<NotFound />} />
          )}
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
