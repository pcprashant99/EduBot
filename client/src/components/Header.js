import React from "react";
import {Link} from "react-router-dom";
//import SaKec from "./pages/College/Sakec";

const Header =()=>{
    return(
        <nav>
            <div className="nav-wrapper">
                <Link to = {'/'} className="brand-logo">BE Project Group No: 5</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to = {'/SaKec'}>SaKec</Link></li>
                <li><Link to = {'/about'}>About Us</Link></li>
                </ul>
            </div>
        </nav>
    )
};
export default Header;