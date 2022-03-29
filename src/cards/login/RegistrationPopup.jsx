import RegistrationPopupTemplate from "./LoginPopupTemplate";
import {Button} from "../index";
import React, {useState} from "react";

function RegistrationPopup({user, setUser, createUser}) {

    const [action, setAction] = useState(0)

    return <RegistrationPopupTemplate>
        <RegistrationHeader page={action}/>
        <RegistrationFields page={action} user={user} setUser={setUser}/>
        <RegistrationButtons page={action} user={user} setAction={setAction} createUser={createUser}/>
    </RegistrationPopupTemplate>
}


function RegistrationHeader({page}) {
    const labels = ["Регистрация", "Придумайте пароль"]

    return <div>
        <h1 className="zgl__login--card--reg">{labels[page]}</h1>
        <div className="bl__registr">
            <p>Заполните поля, чтобы создать аккаунт</p>
        </div>
    </div>
}

function RegistrationFields({user, setUser, page}) {
    function onChange(propertyName, propertyValue) {
        user[propertyName] = propertyValue
        setUser(user)
    }

    const registration = <div>
        <input
            key="name"
            placeholder="Имя"
            className="field"
            onChange={(e) => {
                onChange("firstName", e.target.value)
            }}
        />
        <input
            key="phoneNumber"
            placeholder="Номер телефона"
            className="field"
            onChange={(e) => {
                onChange("phoneNumber", e.target.value)
            }}
        />
    </div>
    const passwords = <div className="input__regstr-password">
        <input
            key="password"
            type="password"
            placeholder="Пароль"
            className="field"
            onChange={(e) => {
                onChange("password", e.target.value)
            }}
        />
        <input
            key="cpassword"
            type="password"
            placeholder="Повторите пароль"
            className="field"
            onChange={(e) => {
                onChange("cpassword", e.target.value)
            }}
        />
    </div>
    const pages = [
        registration, passwords
    ]
    return pages[page]
}

function RegistrationButtons({page, setAction, createUser, user}) {
    const buttonActions = [() => setAction((prev) => prev + 1), () => createUser(user)]

    return <div className="blok__button--registr">
        <Button onClick={buttonActions[page]}>Зарегистрироваться</Button>
    </div>
}

export default RegistrationPopup;