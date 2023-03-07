//----------------------------DOM IMPORTS-----------------------
import {BrowserRouter,Routes,Route} from 'react-router-dom' 
//---------------------------COMPONENTS IMPORTS-----------------
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Sp_Signup from './Components/Auth/Sp_Signup';
import CreateAd from './Components/Dashboard/CreateAd/CreateAd';
import MyAds from './Components/Dashboard/NewsFeed/MyAds';
import News from './Components/Dashboard/NewsFeed/News';
import Footer from './Components/Home/Footer';
import Home from './Components/Home/Home';
import Edit_profile from './Components/Service_provider/Profile/Edit_profile';
import Profile from './Components/Service_provider/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path='/' element={<Home/>} />  
      <Route path='/Login' element={<Login/>} />
      <Route path='/Signup' element={<Signup/>} />
      <Route path='/Signup_Service_Provider' element={<Sp_Signup/>} />
      <Route path='/News' element={<News/>}/>
      <Route path='/CreateAd' element={<CreateAd/>}/>
      <Route path='/MyAds' element={<MyAds/>}/>
      <Route path='/Profile' element={<Profile/>}/>
      <Route path='/EditProfile' element={<Edit_profile/>}/>
      </Routes>
    </div>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
