import React from "react";
import '../App.css';


import {Button} from '../cards'
import NumberFormat from "react-number-format";
import {post} from "axios";
import Cookies from 'js-cookie';

function Login({disabled}) {
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('phoneNumber:' + phoneNumber);
        console.log('password:' + password);
        // Cookies.put()
        // post(session_url, {
        //         "status": "OPEN",
        //         "parameters": [
        //             {
        //                 "attribute": {
        //                     "id": 13
        //                 },
        //                 "value": "24/09/2020"
        //             },
        //             {
        //                 "attribute": {
        //                     "id": 11
        //                 },
        //                 "value": "сломался хуй"
        //             },
        //             {
        //                 "attribute": {
        //                     "id": 12
        //                 },
        //                 "value": "photo"
        //             },
        //             {
        //                 "attribute": {
        //                     "id": 6
        //                 },
        //                 "value": "Газовая плита"
        //             }
        //         ]
        //     }
        //     , {
        //         headers: {
        //             Authorization: "Bearer " + Cookies.get('access_token'),
        //             'X-CSRF-TOKEN': Cookies.get('csrf_token'),
        //             "Content-Type": "application/json",
        //             "Accept": "application/json",
        //             "Access-Control-Allow-Origin": true
        //         }
        //     }).then(function (response) {
        //     console.log('Authenticated');
        // }).catch(function (error) {
        //     console.log('Error on Authentication');
        // });

        // var session_url = "http://localhost:8050/auth/login";
        let promise = post(
            "http://localhost:8050/auth/login", {
                username: phoneNumber,
                password: password
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": true
                }
            }
        ).then(function (response) {
            console.log('try to auth');

            if (response.data.accessToken) {
                // localStorage.setItem("user", JSON.stringify(response.data));
                Cookies.set('access_token', response.data.accessToken);
                console.log('Authenticated');

            } else {
                console.log('auth failed: no accessToken');
            }
            return true;
        }).catch(function (error) {
            console.log('Error on Authentication');
            console.log(error);
            return false;
        });
    };

    return (
        <>
            <div className="content">
                <div>
                    <div>
                        <h1 className="zgl__login--card--reg">Войдите</h1>
                        <div className="bl__registr">
                            <p>Заполните поля, чтобы войти в аккаунт</p>
                        </div>
                    </div>
                </div>
                <div className="display__input--field">
                    <div className="input__regstr">
                        <NumberFormat
                            className="field"
                            format='###########'
                            mask='_'
                            id={"username"}
                            name={"username"}
                            placeholder="Номер телефона"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <input
                            type={"password"}
                            id={"password"}
                            name={"password"}
                            placeholder="Пароль"
                            className="field"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div>
                        </div>
                        <Button onClick={handleSubmit}>Войти</Button>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Login;