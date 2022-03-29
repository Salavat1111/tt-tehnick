import React from "react";
import '../../App.css';
import {MainContext} from '../../App';


import {Button} from '../index'
import {Link} from "react-router-dom";
import {loginUrl} from "../../common/AppConstants";

function Registration({disabled}) {
    const {setStep, user, setUser} = React.useContext(MainContext);
    const [inputValue, setInputValue] = React.useState('');
    const nextDisabled = !inputValue;
    const label = "Регистрация"

    function handleChangeInput(propertyName, propertyValue) {
        setInputValue(propertyName, propertyValue);
        user[propertyName] = propertyValue
        setUser(user)
    }

    return (
        <div className="wrapper__content-registr">
            <div className="content-registr">
                <div>
                    <h1 className="zgl__login--card--reg">{label}</h1>
                    <div className="bl__registr">
                        <p>Заполните поля, чтобы создать аккаунт</p>
                    </div>
                </div>
                <div className="display__input--field">
                    <div className="input__regstr">
                        <input
                            placeholder="Имя"
                            className="field"
                            onChange={(e) => {
                                handleChangeInput("firstName", e.target.value)
                            }}
                        />
                        <input
                            placeholder="Номер телефона"
                            className="field"
                            onChange={(e) => {
                                handleChangeInput("phoneNumber", e.target.value)
                            }}
                        />
                        <div className="blok__button--registr">
                            <Button
                                className={disabled}
                                disabled={nextDisabled}
                                onClick={() => setStep(2)}
                            >Далее</Button>
                        </div>
                    </div>
                    <div className="cont__bl--card--reg">
                        <p>Уже есть аккаунт? <Link to={loginUrl}>Войти</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Registration;