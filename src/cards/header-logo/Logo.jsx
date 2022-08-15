import React from "react";
import './logo.css';
import {Link} from "react-router-dom";
import {welcomePage} from "../../common/AppConstants";


function Logo() {
    return (
        <div className="conteinet__logo">
            <div className="block__line-left"></div>
            <div className="logo__text">
                <h1><a href={welcomePage}>Техник+</a></h1>
                <h1 className="logo__text-h1"><Link to={""}>твой</Link></h1>
                <h1 className="logo__text-h2"><Link to={""}>техник</Link></h1>
            </div>
            <div className="block__line-right"></div>
        </div>
    );
}


export default Logo;
