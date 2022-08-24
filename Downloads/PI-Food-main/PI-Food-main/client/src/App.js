import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from './components/LandingPage';
import Create from "./components/Create"
import Home from './components/Home';
import Detail from "./components/Detail"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/recipes" component={Create}/>
        <Route path="/home" component={Home}/>
        <Route exact path="/recipe/:id" component={Detail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
