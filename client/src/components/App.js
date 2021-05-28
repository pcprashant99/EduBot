import React from "react";
import {BrowserRouter, Route} from "react-router-dom";

// import Header from "./Header";
// import Landing from "./pages/Landing";
import About from "./pages/About";
import SaKec from "./pages/College/Sakec";
import EduBot from "./EduBot/EduBot";

const App = ()=> {
    return (
        <div>
            <BrowserRouter>
                <div >
                    {/* <iframe title="My Daily Marathon Tracker" src="https://www.shahandanchor.com/home/"></iframe> */}
                    <iframe title="Hi" src="https://www.shahandanchor.com/home/"   height="700px" width="100%"></iframe>
                    <EduBot />
                    {/* <Header/> */}
                    {/* <Route exact path="/" component={(Landing)} /> */}
                    <Route exact path="/about" component={(About)} />
                    <Route exact path="/SaKec" component={(SaKec)} />
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;
