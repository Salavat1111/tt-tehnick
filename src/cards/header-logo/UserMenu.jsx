import react from "react";
import React from "react";
import './userMenu.css';
import { Link } from 'react-router-dom';


function UserMenu({ itemsUser }) {

    const [activeItem, setActiveItem] = react.useState()


    const onSelectItem = (index) => {
        setActiveItem(index)
    }




    return (
        <div className="conteinet__menu-user">
            {itemsUser && itemsUser.map((name, index,) =>
                <div
                    className={activeItem === index ? 'bl__value-items-user active' : 'bl__value-items-user'}
                    onClick={() => onSelectItem(index)} key={`${name}_${index}`}
                >
                    <Link to={name.href}   
                    onClick={() => onSelectItem(index)} key={`${name}_${index}`}
                  >
                        <span
                         className={activeItem === index ? 'svg__icons-user active' : 'svg__icons-user'}
                        >{name.icon}</span>
                        <Link to={name.href}>{name.value}</Link>
                    </Link>
                </div>
            )}
        </div>
    );
}


export default UserMenu;