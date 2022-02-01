import React from "react";
import './settings.css'
import {Button, InputText, ButtonBack} from '../../cards'
import {patch} from "axios";
import Cookies from "js-cookie";

function ProfileEmail() {
    async function updateEmailValue() {
        console.log("asdasd")
        await patch('http://localhost:8050/fixer/api/user/p', {
            phoneNumber: "89276976454",
            parameters: [{
                name: "Email",
                value: "value@sdf.ru"
            }]
        }, {
            headers: {
                Authorization: "Bearer " + Cookies.get('access_token'),
                'X-CSRF-TOKEN': Cookies.get('csrf_token'),
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": true
            }
        }).then(response => {
            console.log('response.data')
            console.log(response)
        });
    }


    return (
        <>
            <a href='/rooms/4'>
                <ButtonBack/>
            </a>
            <div className="content__profile">
                <div className="">
                    <div className="input__regstr">
                        <h3>Поменять адрес почты</h3>
                        <InputText text="введите email"/>
                    </div>
                    <div>
                        <Button onClick={updateEmailValue}>изменить</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileEmail;