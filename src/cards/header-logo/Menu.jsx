import react from "react";
import React from "react";
import './logo.css';



function Menu({ items }) {

    const [activeItem, setActiveItem] = react.useState()


    const onSelectItem = (index) => {
        setActiveItem(index)
    }




    return (
        <div className="conteinet__menu">
            {items && items.map((name, index,) =>
                <div
                    className={activeItem === index ? 'bl__value-items active' : 'bl__value-items'}
                    onClick={() => onSelectItem(index)} key={`${name}_${index}`}
                >
                    <li>
                        <span className="">{name.icon}</span>
                        <a href={name.href}>{name.value}</a>
                    </li>
                </div>
            )}
        </div>
    );
}


export default Menu;