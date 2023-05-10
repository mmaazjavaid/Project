//----------------------------DOM IMPORTS-----------------------
import {BrowserRouter,Routes,Route} from 'react-router-dom' 
//---------------------------COMPONENTS IMPORTS-----------------
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Sp_Signup from './components/Auth/Sp_Signup';
import CreateAd from './components/Dashboard/CreateAd/CreateAd';
import MyAds from './components/Dashboard/NewsFeed/MyAds';
import News from './components/Dashboard/NewsFeed/News';
import Footer from './components/Home/Footer';
import Home from './components/Home/Home';
import Edit_profile from './components/Service_provider/Profile/Edit_profile';
import Profile from './components/Service_provider/Profile/Profile';

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
