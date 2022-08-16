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
    const [message, setMessage] = useState('')
    const [messageText, setMessageText] = useState('Пусто')


    useEffect(
        () => {
            orderService.getOrders().then(response => {
                if (response.length === 0) {
                    setMessage(<div className="plug__content">{messageText}</div>)
                    {
                        let res = response.map(order => {
                            return <OrderItem key={order?.id} order={order} orderService={orderService}/>
                        })
                        setOrderList(res)
                    }
                } else if (response.length <= 3) {
                    setMessage(<div className="plug__content">{message}</div>)
                    {
                        let res = response.map(order => {
                            return <OrderItem key={order?.id} order={order} orderService={orderService}/>
                        })
                        setOrderList(res)
                    }
                } else {
                    let res = response.map(order => {
                        return <OrderItem key={order?.id} order={order} orderService={orderService}/>
                    })
                    setOrderList(res)
                }
            })
        }, []
    )

    return (
        <>
            {orderList}
            {message}
        </>
    );
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
    orderParams[TIME_ATTR_ID]    = orderService.getParameterValue(order, TIME_ATTR_ID)
    orderParams[DATA_ATTR_ID]    = orderService.getParameterValue(order, DATA_ATTR_ID)
    orderParams[DESCRIPTION_ATTR_ID] = orderService.getParameterValue(order, DESCRIPTION_ATTR_ID)


    return <OrderItemContainer showOrderBody={showOrderBody}>
        <OrderItemHeader column={headerColumns}/>
        <OrderItemBody showOrderBody={showOrderBody} orderParams={orderParams}
                       orderId={order.id}
                       orderService={orderService}
                       orderParameters={order.parameters}
        />
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

function OrderItemBody({showOrderBody, orderParams, orderService, orderId, orderParameters}) {
    const [readOnly, setReadOnly] = useState(true)
    const [params, setParams] = useState(orderParams)
    const [orderState, setOrderState] = useState(orderParameters ? orderParameters : {})
    useEffect(() => {
        let newOrderParameters = [...orderState]
        for (let p of newOrderParameters) {
            p.oldValue = p.value
        }
        setOrderState(newOrderParameters)
    },[])
    function onCancelEdit() {
        if (!readOnly) {
            let newOrderParameters = [...orderState]
            for (let param of newOrderParameters) {
                if (param.oldValue) {
                    param.value = param.oldValue
                }
                param.toSave = false
            }
            setOrderState(newOrderParameters)
        }
        setReadOnly(!readOnly)
    }

    function setter(attrId, value) {
        console.log(orderState)
        let newOrderParameters = [...orderState]
        for (let param of newOrderParameters) {
            if (param.attrId == attrId) {
                param.value = value
                param.toSave = param.oldValue != value
                break;
            }
        }
        setOrderState(newOrderParameters)
        if (!params) return;
        let newParams = {...params}
        newParams[attrId] = value
        setParams(newParams)
    }

    function onSave() {
        console.log(orderState)
        setReadOnly(!readOnly)
        orderService.updateOrder({"id": orderId, "parameters":params}).then(()=>{
            let newOrderParameters = [...orderState]
            for (let p of newOrderParameters) {
                p.oldValue = p.value
                p.toSave = false
            }
        })
    }

    let buttons = [
        <Button onClick={readOnly ? () => setReadOnly(!readOnly): onSave}>
            {readOnly ? 'Редактировать' : 'Сохранить'}
        </Button>
    ]

    if (!readOnly) {
        buttons.push(<Button onClick={onCancelEdit}>Отменить</Button>)
    }

    function getParameterValue(params, attrId) {
        for (let p of params) {
            if (p.attrId == attrId) {
                return p.value
            }
        }
        return ""
    }

    return showOrderBody && <div className="input__regstr">
        <div className="block__address">
            <div className="address">
                <p>Адрес:</p>
            </div>
            <InputParameter readOnly={readOnly} value={getParameterValue(orderState, ADDRESS_ATTR_ID)} setter={setter} attrId={ADDRESS_ATTR_ID}/>
        </div>
        <div className="block__time__date">
            <div className="section__block__time">
                <div className="time__block">
                    <p>Время:</p>
                </div>
                <InputParameter readOnly={readOnly} value={getParameterValue(orderState,TIME_ATTR_ID)} setter={setter} attrId={TIME_ATTR_ID}/>
            </div>
            <div className="section__block__date">
                <div className="time__block">
                    <p>Дата:</p>
                </div>
                <InputParameter readOnly={readOnly} value={getParameterValue(orderState,DATA_ATTR_ID)} setter={setter} attrId={DATA_ATTR_ID}/>
            </div>
        </div>
        <div className="block__text_array">
            <div className="text__array">
                <p>Описание</p>
            </div>
            <InputParameter textarea readOnly={readOnly} value={getParameterValue(orderState,DESCRIPTION_ATTR_ID)} setter={setter} attrId={DESCRIPTION_ATTR_ID}/>
        </div>
        <div className="btn__setting">
            <div className="btn__setting__container">
                {buttons}
            </div>
        </div>
    </div>
}

function InputParameter({readOnly, value, textarea, setter, attrId}) {
    return <div>
        {readOnly ? <p>{value}</p> : textarea ?
            <textarea
                value={value}
                onChange={(e) => setter(attrId, e.target.value)}/> :
            <input value={value}
                   onChange={(e) => setter(attrId, e.target.value)}/>}
    </div>
}

function OrderItemContainer({showOrderBody, children}) {
    return <div className={showOrderBody ? 'order--bl active' : 'order--bl'}>
        {children}
    </div>
}

export default СardOrder;