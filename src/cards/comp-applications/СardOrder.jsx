import React from "react";
import react, {useEffect, useState} from "react";
import './AppOrder.css';
import {Button} from '../../cards';
import {FaAngleDown} from "react-icons/fa";
import OrderService from "../../servises/OrderService";
import {
    ADDRESS_ATTR_ID,
    DATA_ATTR_ID,
    DESCRIPTION_ATTR_ID,
    TECH_TYPE_ATTR_ID,
    TIME_ATTR_ID
} from "../../common/AppConstants";


function СardOrder() {
    return <div>
        <PageHeader/>
        <Orders/>
    </div>
}

function PageHeader() {
    return <div className="content__order-visible">
        <Button>Мои заказы</Button>
        <a>История</a>
    </div>
}

function Orders() {
    const orderService = new OrderService();
    const [orderList, setOrderList] = useState([])

    useEffect(
        () => {
            orderService.getOrders().then(response => {
                let res = response.map(order => {
                    console.log(order)
                    return <OrderItem key={order?.id} order={order} orderService={orderService}/>
                })
                setOrderList(res)
            })
        }, []
    )
    return <>{orderList}</>
}

function OrderItem({order, orderService}) {
    const [showOrderBody, setShowOrderBody] = react.useState(false)
    const changeOrderVisibility = () => {
        setShowOrderBody(!showOrderBody)
    }

    let headerColumns = [orderService.getParameterValue(order, TECH_TYPE_ATTR_ID),
        orderService.getParameterValue(order, DATA_ATTR_ID),
        order?.status,
        <FaAngleDown
            onClick={changeOrderVisibility}
            className={showOrderBody ? 'svg__icons active' : 'svg__icons'}
        />
    ];

    let orderParams = {}
    orderParams[ADDRESS_ATTR_ID] = orderService.getParameterValue(order, ADDRESS_ATTR_ID)
    orderParams[TIME_ATTR_ID] = orderService.getParameterValue(order, TIME_ATTR_ID)
    orderParams[DATA_ATTR_ID] = orderService.getParameterValue(order, DATA_ATTR_ID)
    orderParams[DESCRIPTION_ATTR_ID] = orderService.getParameterValue(order, DESCRIPTION_ATTR_ID)

    return <OrderItemContainer showOrderBody={showOrderBody}>
        <OrderItemHeader column={headerColumns}/>
        <OrderItemBody showOrderBody={showOrderBody} orderParams={orderParams}/>
    </OrderItemContainer>;
}


function OrderItemHeader({column}) {
    return <div className="order__block--visible">
        <div className="bl__text--order">
            <div className="block__order-section">
                <p className="">{column[0]}</p>
            </div>
            <div className="block__order-section">
                <p className="">{column[1]}</p>
            </div>
            <div className="block__order-section">
                <p className="">{column[2]}</p>
            </div>
            <div className='svg__order--bl'>
                {column[3]}
            </div>
        </div>

    </div>
}

function OrderItemBody({showOrderBody, orderParams}) {
    const [readOnly, setReadOnly] = useState(true)

    function onCancelEdit() {
        setReadOnly(!readOnly)
    }

    function onSave() {
        setReadOnly(!readOnly)
    }

    let buttons = [
        <Button onClick={readOnly ? () => setReadOnly(!readOnly): onSave}>
            {readOnly ? 'Редактировать' : 'Сохранить'}
        </Button>
    ]

    if (!readOnly) {
        buttons.push(<Button onClick={onCancelEdit}>Отменить</Button>)
    }

    return showOrderBody && <div className="input__regstr">
        <div className="block__address">
            <div className="address">
                <p>Адрес:</p>
            </div>
            <InputParameter readOnly={readOnly} value={orderParams[ADDRESS_ATTR_ID]}/>
        </div>
        <div className="block__time__date">
            <div className="section__block__time">
                <div className="time__block">
                    <p>Время:</p>
                </div>
                <InputParameter readOnly={readOnly} value={orderParams[TIME_ATTR_ID]}/>
            </div>
            <div className="section__block__date">
                <div className="time__block">
                    <p>Дата:</p>
                </div>
                <InputParameter readOnly={readOnly} value={orderParams[DATA_ATTR_ID]}/>
            </div>
        </div>
        <div className="block__text_array">
            <div className="text__array">
                <p>Описание</p>
            </div>
            <InputParameter readOnly={readOnly} value={orderParams[DESCRIPTION_ATTR_ID]}/>
        </div>
        <div className="btn__setting">
            <div className="btn__setting__container">
                {buttons}
            </div>
        </div>
    </div>
}

function InputParameter({readOnly, value}) {
    return <div>
        {readOnly ? <p>{value}</p> : <input value={value}/>}
    </div>
}

// const OrderItemContainer = styled.div`${(showOrderBody) => {return showOrderBody ? css`order--bl active` : css`order--bl`;}}`
function OrderItemContainer({showOrderBody, children}) {
    return <div className={showOrderBody ? 'order--bl active' : 'order--bl'}>
        {children}
    </div>
}

export default СardOrder;