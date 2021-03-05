import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import GuestHome from "./components/GuestHome";
import Footer from './components/Footer'
import Register from './components/Register'
import Login from './components/Login'
import {Route, BrowserRouter as Router} from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="container">
                <Navbar/>
                <Route path="/" exact component={GuestHome}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Footer/>
            </div>
        </Router>
    )
}

export default App;
