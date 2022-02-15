import React from "react";
import NumberFormat from "react-number-format";
import '../App.css';
import './step/step.css'



import { Button, InputPassword, } from '../cards'

function PasswordForma() {


    return (
        <>
        <div className="wrapper__content-password">
            <div className="content-registr-password">
            <div className="content">
                <div>
                    <div>
                        <h1 className="zgl__login--card--reg">Придумайте пароль</h1>

                    </div>
                </div>
                <div className="display__input--field">
                    <div className="input__regstr-password">



                        <InputPassword text="Пароль" />
                        <InputPassword text="Повторить пароль" />
                        <div className="src__password">
                            <p></p>
                        </div>
                        <div>
                        </div>
                        <div className="bl__password">
                        <Button>Далее</Button>
                        </div>
                    </div>
                    <div className="cont__bl--card--reg">
                        <p>Уже есть аккаунт? <span>Войдите</span></p>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </>
    );
}


export default PasswordForma;