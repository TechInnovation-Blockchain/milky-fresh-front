import './App.css';
import Header from './components/Header';
import Land from './components/Land';
import Footer from './components/Footer';
import back1 from "./resources/images/back1.png";

import 'bootstrap/dist/css/bootstrap.min.css';
import Dash from './components/Dash';
import Galaxy from './components/Galaxy';


function App() {
  return (
    <div className="App" style={{backgroundImage: 'url(' + require("./resources/images/back1.png") + ')'}}>
      <header className="App-header">
        {/* <img src = {back1} alt="back1" style={{postiion: 'relative'}}/> */}

        <Header/>
        <Dash/>
        <Galaxy/>
        {/* <Land/> */}

        <Footer/>
        {/* <Footer/> */}
        
      </header>
    </div>
  );
}

export default App;
