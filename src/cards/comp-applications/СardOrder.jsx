import React, {useEffect, useState} from "react";
import './AppOrder.css';
import { Button } from '../../cards';
import { FaAngleDown } from "react-icons/fa"; // стрелка вниз
import react from "react";
import {serverUrl} from "../../common/AppConstants";
import axios from "axios";
import Cookies from "js-cookie";
// import logos from '../img/2.png';
// import Button from '../Button.jsx'
// import InputTimeDate from "../InputTimeDate";
// import InputText from "../InputText";


// import Logo from "../Logo";
// import BtnBurger from '../BtnBurger';



async function getOrders() {
    const url = serverUrl + `/fixer/api/user/orders`;
    const res = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`,
            'X-CSRF-TOKEN': Cookies.get('csrf_token')
        }
    });
    return res.data;
}

function СardOrder() {

    const [blOrderVisebled, setBlOrderVisebled] = react.useState()

    const visbeledItemsBlock = () => {
        setBlOrderVisebled(!blOrderVisebled)
    }
    const [orderList, setOrderList] = useState([])

    useEffect(
        () => {
            getOrders().then(response => {
                var res = response.map(order => {
                    return <div className="order__block--visible">
                        <div className="bl__text--order">
                            <p>{order.parameters[0]?.value}</p>
                        </div>
                        <div className='svg__order--bl'>
                            <FaAngleDown
                                onClick={visbeledItemsBlock}
                                className={blOrderVisebled ? 'svg__icons active' : 'svg__icons'}
                            />
                        </div>
                    </div>
                })
                setOrderList(res)
            })
        }, []
    )

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
                {orderList}
            </div>

        </>
    );
}




export default СardOrder;