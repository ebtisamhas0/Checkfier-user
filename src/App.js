import './App.css';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import StoreProvider from './components/StoreContext';
import {UserProvider} from './components/UserContext';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Signup} from "./pages/signup"
import {Rewards1} from "./pages/Rewards1"
import {Rewards2} from "./pages/Rewards2"
import {Rewards3} from "./pages/Rewards3"
import {Help} from "./pages/Help"
import {About} from "./pages/About"
import {UpdatePhonePopup} from "./pages/UpdatePhonePopup"
import {Settings} from "./pages/Settings"
import { Navigationbar } from './components/Navigationbar';
import { Login } from './pages/Login';
import { Redeem } from './pages/Redeem';

function App() {
  return (
    <StoreProvider> 
    <UserProvider>
    <div className="App">
      <Router>
         <Navigationbar/>
        
        <Routes>
          <Route path='/' Component={Signup}/>
          <Route path='/Rewards1' Component={Rewards1}/>
          <Route path='/Rewards2' Component={Rewards2}/>
          <Route path='/Rewards3' Component={Rewards3}/>
          <Route path='/Help' Component={Help}/>
          <Route path='/UpdatePhonePopup' Component={UpdatePhonePopup}/>
          <Route path='/About' Component={About}/>
          <Route path='/Settings' Component={Settings}/>
          <Route path='/Login' Component={Login}/>
          <Route path="/redeem/:code" element={<Redeem />} />


        </Routes>
      </Router>
    </div>
    </UserProvider>
    </StoreProvider>

  );
}

export default App;
