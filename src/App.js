import './App.css';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Signup} from "./pages/signup"
import {Rewards1} from "./pages/Rewards1"
import {Rewards2} from "./pages/Rewards2"
import {Rewards3} from "./pages/Rewards3"
import {Help} from "./pages/Help"
import {About} from "./pages/About"
import {Change} from "./pages/Change"
import {Settings} from "./pages/Settings"
import { Navigationbar } from './components/Navigationbar';

function App() {
  return (
    <div className="App">
      <Router>
         <Navigationbar/>
        <Routes>
          <Route path='/' Component={Signup}/>
          <Route path='/Rewards1' Component={Rewards1}/>
          <Route path='/Rewards2' Component={Rewards2}/>
          <Route path='/Rewards3' Component={Rewards3}/>
          <Route path='/Help' Component={Help}/>
          <Route path='/Change' Component={Change}/>
          <Route path='/About' Component={About}/>
          <Route path='/Settings' Component={Settings}/>


        </Routes>
      </Router>
    </div>
  );
}

export default App;
