import React from "react";
import './logo.css';
import { Link } from "react-router-dom";


function Logo() {
    return (
        <div className="conteinet__logo">
            {/* <div className="block__line-left"></div> */}
            <div className="logo__text">
                <h1><Link to={""}>ТЕХНИК</Link></h1>
            </div>
            <div className="common__circle">
                <div className="polo__grug-left"></div>
                <div className="polo__grug-rigth">
                    <h1 className="text__plus">+</h1>
                </div>
            </div>
            {/* <div className="block__line-right"></div> */}
        </div>
    );
}


export default Logo;

