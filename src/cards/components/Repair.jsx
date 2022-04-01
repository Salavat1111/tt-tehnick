import './sort.css';
import logos from '../../img/2.png';
import {FaInfoCircle, FaMapMarkerAlt} from "react-icons/fa";
import {Button, InputText, InputTimeDate,} from '../../cards'
import {QuestionBlock, SortPopup} from "../components";
import axios from "axios";
import Cookies from "js-cookie";
import React, {useEffect, useState} from "react";
import {serverUrl} from "../../common/AppConstants";
import AddressInput from "../AddressInput";

async function getTechnicalTypes() {
    const url = serverUrl + `/fixer/api/attrs/1`;
    const res = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`,
            'X-CSRF-TOKEN': Cookies.get('csrf_token')
        }
    });
    return res.data;
}

function Repair({user, userService}) {
    const [technicalTypes, setTechnicalTypes] = useState([])
    const [order, setOrder] = useState({"status": "OPEN", "parameters":[]})

    useEffect(() => {
        getTechnicalTypes().then(response => {
                console.log("technicalTypes: " + response);
                setTechnicalTypes(response.listValues)
            }
        )
    }, []);

    //todo open page only when user registred
    //todo load parameters by model in future

    function onCreate() {
        order["executor"] = "89275785698"
        console.log("createOrder start: " + JSON.stringify(order))
        userService.createOrder(order)
            .then(r => {console.log("created order " + JSON.stringify(r))})
            .catch(r=>{console.log("cant create order " + JSON.stringify(r))})
    }

    function setOrderParameter(parameter) {
        let newOrder = {...order}
        if (isExistParam(newOrder, parameter.attrId)) {
            newOrder.parameters.forEach(
                function (item, i) {
                    if (item.attrId == parameter.attrId)
                        newOrder.parameters[i] = parameter;
                });
        } else {
            newOrder.parameters.push(parameter)
        }

        setOrder(newOrder)

        function isExistParam(order, attrId) {
            for (let p of order.parameters) {
                if (p.attrId == attrId) {
                    return true
                }
            }
            return false
        }
    }
    function setAddress(a,b){
        console.log("changeOrderParam ", a, b)
        let parameter = {
            "name": "Ваш Адрес",
            "attrId": "11",
            "type": "TEXT",
            "value":b
        };
        console.log("changeOrderParam ", JSON.stringify(parameter))
        setOrderParameter(parameter);
    }

    return (
        <div className="wrapper__content-repair">
            <div className="content-registr-repair">
                <div className="content__repair">
                    <div>
                        <img className="repair__page-img" alt="" src={logos}/>
                    </div>
                    <div className="input__regstr">
                        <AddressInput placeHolder="Адрес"
                                      setValue={setAddress}
                                      editable visible isFlex/>
                        <SortPopup
                            items={technicalTypes}
                            handleValue={(value) =>{
                                console.log("SortPopup: " + value)
                                let parameter = {
                                    "name": "Что чиним",
                                    "attrId": "1",
                                    "type": "LIST",
                                    "value": value
                                };
                                setOrderParameter(parameter);
                            }}
                        />
                        <div className="block__time-date">
                            <QuestionBlock
                                outline
                                icons={[<FaInfoCircle/>]}/>
                            <InputTimeDate placeholder="время" onChange={(e) =>{
                                let parameter = {
                                    "name": "Время",
                                    "attrId": "46",
                                    "type": "TIME",
                                    "value": e.target.value
                                };
                                setOrderParameter(parameter);
                            }}/>
                            <InputTimeDate placeholder="дата" onChange={(e) =>{
                                let parameter = {
                                    "name": "Дата",
                                    "attrId": "8",
                                    "type": "DATE",
                                    "value": e.target.value
                                };
                                setOrderParameter(parameter);
                            }}/>
                            <QuestionBlock
                                icons={[<FaInfoCircle/>]}
                                items={['Напишите любую для Вас удобную дату. Пример "22.02.2022"']}
                            />
                        </div>
                        <textarea placeholder="напишите что случилось"
                                  onChange={(e) =>{
                            let parameter = {
                                "name": "Напишите что произошло",
                                "attrId": "6",
                                "type": "TEXT",
                                "value": e.target.value
                            };
                            setOrderParameter(parameter);
                        }}></textarea>
                    </div>
                </div>
            </div>
            <div>
                <Button onClick={onCreate}>отправить</Button>
            </div>
        </div>
    );
}


export default Repair;