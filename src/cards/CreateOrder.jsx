import React, {useEffect, useState} from "react";
import '../App.css';
import logos from '../img/2.png';
import {FaInfoCircle} from "react-icons/fa";
import {Button, InputTimeDate, InputText,} from '../cards'
import {SortPopup, QuestionBlock} from "./components";
import axios from "axios";
import Cookies from "js-cookie";

async function getTechnicalTypes() {
    const url = `http://localhost:8050/fixer/api/attrs/1`;
    const res = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`,
            'X-CSRF-TOKEN': Cookies.get('csrf_token')
        }
    });
    return res.data;
}

async function createOrder(userId, order) {
    console.log("createOrderFunc")
    await axios.post(`/fixer/api/user/${userId}`, order, {
        headers: {
            Authorization: "Bearer " + Cookies.get('access_token'),
            'X-CSRF-TOKEN': Cookies.get('csrf_token')
        }
    }).then(response => {
        console.log('response.data')
        console.log(response.data)
    })
}

function CreateOrder() {

    const [technicalTypes, setTechnicalTypes] = useState([])
    const [order, setOrder] = useState({})
    const [address, setAddress] = useState("")
    const [technicType, setTechnicType] = useState([])
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [comment, setComment] = useState([])

    useEffect(() => {
        getTechnicalTypes().then(response => {
                console.log("technicalTypes: " + response);
                setTechnicalTypes(response.listValues)
            }
        )
    }, [setTechnicalTypes]);

    return (
        <div className="content__repair">
            <div>
                <img className="repair__page-img" alt="" src={logos}/>
            </div>

            <div className="input__regstr">
                <InputText handleValue={setAddress} placeholder="Адрес"/>
                <SortPopup handleValue={setTechnicType} items={technicalTypes}/>
                <div className="block__time-date">
                    <InputTimeDate handleValue={setTime} placeholder="время"/>
                    <QuestionBlock
                        outline
                        icons={[<FaInfoCircle/>]}
                        items={['Напишите любое для Вас удобное время. Пример "с 16:00 до 18:00"']}
                    />

                    <InputTimeDate handleValue={setDate} text="дата"/>
                    <QuestionBlock
                        icons={[<FaInfoCircle/>]}
                        items={['Напишите любую для Вас удобную дату. Пример "22.02.2022"']}
                    />
                </div>
                <textarea onChange={(e) => setComment(e.target.value)}
                          placeholder="напишите что случилось"/>
                <Button onClick={(e) => {

                    console.log(address)
                    console.log(technicType)
                    console.log(date)
                    console.log(time)
                    console.log(comment)
                    const newOrder = {}
                    newOrder["status"] = "OPEN"
                    newOrder["parameters"] = []
                    const userId = 2
                    const orderAddress = {"":""}
                    // createOrder(userId, newOrder);
                }} disabled={false}>отправить</Button>
            </div>
            <div className="bl_heitgh--crOrder"></div>
        </div>
    );
}

export default CreateOrder;
