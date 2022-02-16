import React from "react";
import '../App.css';
// import './step/step.css'
import {MainContext} from '../App';


import {Button} from '../cards'

function Registration({disabled}) {
    const {onNextStep} = React.useContext(MainContext);
    const [inputValue, setInputValue] = React.useState('');
    const nextDisabled = !inputValue;

    const handleChangeInput = (event) => {
        setInputValue(event.target.value);
    }


    const onClickNextStep = () => {
        onNextStep();
    }

    return (
        <div className="wrapper__content-registr">
            <div className="content-registr">
                <div>
                    <div>
                        <h1 className="zgl__login--card--reg">Регистрация</h1>
                        <div className="bl__registr">
                            <p>Заполните поля, чтобы создать аккаунт</p>
                        </div>
                    </div>
                </div>
                <div className="display__input--field">
                    <div className="input__regstr">
                        <input
                            placeholder="Имя"
                            className="field"

                        />
                        <input
                            placeholder="Фамилия"
                            className="field"
                            onChange={handleChangeInput}
                            value={inputValue}
                        />
                        <div>
                        </div>
                        <div className="blok__button--registr">
                        <Button
                            className={disabled}
                            disabled={nextDisabled}
                            onClick={onClickNextStep}
                        >Далее</Button>
                        </div>
                        {/* <button
                            disabled={nextDisabled}
                            onClick={onClickNextStep}
                        >Кнопка</button> */}
                    </div>
                    <div className="cont__bl--card--reg">
                        <p>Уже есть аккаунт? <span>Войти</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Registration;