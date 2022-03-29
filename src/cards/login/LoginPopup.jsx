import React from "react";
import {Button} from "../index";
import NumberFormat from "react-number-format";
import LoginPopupTemplate from "./LoginPopupTemplate";

function LoginPopup({login}){
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [password, setPassword] = React.useState("");

    return <LoginPopupTemplate>
        <LoginHeader />
        <LoginFields setPassword={setPassword} setPhoneNumber={setPhoneNumber} />
        <LoginButtons onClick={() => login(phoneNumber, password)}/>
    </LoginPopupTemplate>
}

function LoginHeader(){
    return <div>
        <h1 className="zgl__login--card--reg">Войти</h1>
        <div className="bl__registr">
            <p>Заполните поля, чтобы войти в аккаунт</p>
        </div>
    </div>
}

function LoginFields({setPhoneNumber, setPassword}) {
    return <div>
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
    </div>
}

function LoginButtons({onClick}){
    return <div className="blok__button--registr">
        <Button onClick={onClick}>Далее</Button>
    </div>
}

export default LoginPopup;