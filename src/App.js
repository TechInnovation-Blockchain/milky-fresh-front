import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
// import 'font-awesome/4.7.0/css/font-awesome.min.css'
import Home from "./components/Home";
import Trade from "./components/Trade";
import Farms from "./components/Farms";
import Routes from "./routes/Routes";

import Web3Provider from "./contexts/Web3Context";

function App() {
  return (
    <Web3Provider>
      <div
        className="App"
        style={{
          backgroundImage:
            "url(" + require("./resources/images/back1.png") + ")",
        }}
      >
        <header className="App-header">
          {/* <img src = {back1} alt="back1" style={{postiion: 'relative'}}/> */}

          <Routes />
        </header>
      </div>
    </Web3Provider>
  );
}

export default App;
