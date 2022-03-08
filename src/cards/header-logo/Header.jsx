import React from "react";
import './logo.css';
import {Logo, Menu,} from '../header-logo';
import {loginUrl, userSettingsUrl} from "../../common/AppConstants";

function Header({items, isLogin, user}) {
    return (
        <div className="wrapper__container-header">
            <Logo/>
            <Menu items={items}/>
            <div className="border__line-block"></div>
            <div className="block__lastName">
                {
                    isLogin ?
                        <p><a href={userSettingsUrl}>{user.firstName} {user.secondName}</a></p> :
                        <p><a href={loginUrl}>Войти</a></p>
                }
            </div>
        </div>
    );
}


export default Header;