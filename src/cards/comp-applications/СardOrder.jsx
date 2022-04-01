import React from "react";
import react, {useEffect, useState} from "react";
import './AppOrder.css';
import {Button} from '../../cards';
import {FaAngleDown} from "react-icons/fa"; 
import {serverUrl} from "../../common/AppConstants";
import axios from "axios";
import Cookies from "js-cookie";


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
    const [orderList, setOrderList] = useState([])

    useEffect(
        () => {
            getOrders().then(response => {
                let res = response.map(order => {
                    console.log(order)
                    return <OrderItem key={order?.id} order={order}/>
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
            {/*<OrderItem key={"1"} name={"Холодильник"}/>*/}
            {/*<OrderItem key={"2"} name={"Печка"}/>*/}
            {/*<OrderItem key={"3"} name={"Телевизор"}/>*/}
            {orderList}
        </>
    );
}


function OrderItem({order}) {
    const ADDRESS_ATTR_ID = 11;
    const DATA_ATTR_ID = 8;
    const TIME_ATTR_ID = 46;
    const TECH_TYPE_ATTR_ID = 1;
    const DESCRIPTION_ATTR_ID = 6;

    const [showOrder, setShowOrder] = react.useState(false)

    function getParameter(attrId) {
        if (order?.parameters)
        for (let parameter of order.parameters) {
            if (parameter.attrId === attrId) return parameter;
        }
        return null
    }

    function getParameterValue(attrId) {
        return getParameter(attrId)?.value;
    }

    const changeOrderVisibility = () => {
        setShowOrder(!showOrder)
    }
    
    return <div className={showOrder ? 'order--bl active' : 'order--bl'}>
        <div className="order__block--visible">
            <div className="bl__text--order">
                <div className="block__order-section">
                    <p className="">{getParameterValue(TECH_TYPE_ATTR_ID)}</p>
                </div>
                <div className="block__order-section">
                    <p className="">{getParameterValue(DATA_ATTR_ID)}</p>
                </div>
                <div className="block__order-section">
                    <p className="">{order?.status}</p>
                </div>
                <div className='svg__order--bl'>
                    <FaAngleDown
                        onClick={changeOrderVisibility}
                        className={showOrder ? 'svg__icons active' : 'svg__icons'}
                    />
                </div>
            </div>

        </div>
        {showOrder ? (
            <div className="input__regstr">
                <div>
                    <div className="block__address">
                        <div className="addres">
                            <p>Адрес:</p>
                        </div>
                        <div className="addres__text">
                            <p>{getParameterValue(ADDRESS_ATTR_ID)}</p>
                        </div>
                    </div>
                    <div className="block__time__date">
                        <div className="section__block__time">
                            <div className="time__block">
                                <p>Время:</p>
                            </div>
                            <div className="addres__text">
                                <p>{getParameterValue(TIME_ATTR_ID)}</p>
                            </div>
                        </div>
                        <div className="section__block__date">
                            <div className="time__block">
                                <p>Дата:</p>
                            </div>
                            <div className="addres__text">
                                <p>{getParameterValue(DATA_ATTR_ID)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="block__textarrey">
                        <div className="texterrey">
                            <p>Описание</p>
                        </div>
                        <div className="textarrey__text">
                            <p>{getParameterValue(DESCRIPTION_ATTR_ID)}</p>
                        </div>
                    </div>
                    <div className="btn__setting">
                        <div className="btn__setting__container">
                            <Button>
                                Сохранить
                            </Button>
                        </div>
                        {/* {savedInfo} */}
                        <div className="btn__setting__container">
                            <Button>Удалить</Button>
                        </div>
                    </div>
                </div>
            </div>
        ) : <div></div>
        }
    </div>;
}


export default СardOrder;