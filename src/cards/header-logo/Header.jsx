import React from "react";
import './logo.css';
import { Logo, Menu, } from '../header-logo';
import { FaPlusCircle } from "react-icons/fa"; // создать
import { FaBorderAll } from "react-icons/fa"; // заказы
import { FaRegSun } from "react-icons/fa"; // настройки

function Header({ items }) {
    // const items = [
    //     { value: 'создать', href: '/rooms/1', icon: <FaPlusCircle />, },
    //     { value: 'заказы', href: '/rooms/2', icon: <FaBorderAll />, },
    //     { value: 'настройки', href: '/rooms/4', icon: <FaRegSun />, },
    // ];



    return (
        <div className="wrapper__container-header">
            <Logo />
            <Menu items={items} />
            <div className="border__line-block"></div>
            <div className="block__lastName">
                <p>Фаттахов Салават</p>
            </div>
        </div>
    );
}


export default Header;