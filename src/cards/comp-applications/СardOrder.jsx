import React from "react";
import './AppOrder.css';
import { Button } from '../../cards';
import { FaAngleDown } from "react-icons/fa"; // стрелка вниз
import react from "react";
// import logos from '../img/2.png';
// import Button from '../Button.jsx'
// import InputTimeDate from "../InputTimeDate";
// import InputText from "../InputText";


// import Logo from "../Logo";
// import BtnBurger from '../BtnBurger';




function СardOrder() {

    const [blOrderVisebled, setBlOrderVisebled] = react.useState()

    const visbeledItemsBlock = () => {
        setBlOrderVisebled(!blOrderVisebled)
    }


    return (
        <>
            <div className="content__order-visible">
                <Button>Мои заказы</Button>
                <a>История</a>
            </div>
            <div className={blOrderVisebled ? 'order--bl active' : 'order--bl'}>
                <div className="order__block--visible">
                    <div className="bl__text--order">
                        <p>Холодильник</p>
                    </div>
                    <div className='svg__order--bl'>
                        <FaAngleDown
                            onClick={visbeledItemsBlock}
                            className={blOrderVisebled ? 'svg__icons active' : 'svg__icons'}
                        />
                    </div>
                </div>
            </div>


        </>
    );
}




export default СardOrder;