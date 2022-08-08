import React from "react";
import '../App.css';
import { MainContext } from '../App';


import { Button } from '../cards'
import NumberFormat from "react-number-format";

function Registration({ disabled }) {
    const { onNextStep, user, setUser } = React.useContext(MainContext);
    const [inputValue, setInputValue] = React.useState('');
    // const nextDisabled = !inputValue;

    function handleChangeInput(propertyName, propertyValue) {
        setInputValue(propertyName, propertyValue);
        user[propertyName] = propertyValue
        setUser(user)
    }

    const onClickNextStep = () => {
        onNextStep();
    }

    //валидация пробник------------«««««««<
    const [text, setText] = React.useState('')
    const [namber, setNamber] = React.useState('')
    const [dertyText, setDertyText] = React.useState(false)
    const [erroText, setErroText] = React.useState('введите имя')
    const [dertyNamber, setDertyNamber] = React.useState(false)
    const [errorNamber, setErrorNamber] = React.useState('введите номер')
    const [formValid, setFormValid] = React.useState(false)


    const namberHandler = (e) => {
        setNamber(e.target.value)
        // if (e.target.value.length < 18 || e.target.value.length > 17) 
        if (e.target.value.length <= 0) {
            setErrorNamber('поле пустое')
        } else {
            setErrorNamber('')
        }
    }
    const nameHandler = (e) => {
        setText(e.target.value)
        if (e.target.value.length < 0 || e.target.value.length <= 0) {
            setErroText('поле пустое')
        } else {
            setErroText('')
        }
    }


    const HandelBlur = (e) => {
        switch (e.target.name) {
            case 'Адрес':
                setDertyText(true)
                break
            case 'namber':
                setDertyNamber(true)
                break
        }
    }

    React.useEffect(() => {
        if (erroText || errorNamber) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [erroText, errorNamber])


    return (
        <div className="wrapper__content-registr">
            <div className="content-registr">
                <div>
                    <div>
                        <h1 className="zgl__login--card--reg">Регистрация</h1>
                        <div className="bl__registr">
                            <p>Заполните поля, чтобы создать аккаунт</p>

                        </div>
                        <div className="container__blockError">
                            {(dertyText && erroText) && <div className="error__container__text">{erroText}</div>}
                            {(dertyNamber && errorNamber) && <div className="error__container__namber">{errorNamber}</div>}
                        </div>
                    </div>
                </div>

                <div className="display__input--field">
                    <div className="input__regstr">
                        <input
                            value={text}
                            onBlur={e => HandelBlur(e)}
                            name='Адрес'
                            placeholder="Имя"
                            className="field"
                            onChange={(e) => {
                                handleChangeInput("firstName", e.target.value)
                                nameHandler(e)
                            }}
                        />
                        {/* <input
                            value={namber}
                            onBlur={e => HandelBlur(e)}
                            name='namber'
                            placeholder="Номер телефона"
                            className="field"
                            onChange={(e) => {
                                // handleChangeInput("phoneNumber", e.target.value)
                                namberHandler(e)
                            }}
                        /> */}
                        <NumberFormat

                            onBlur={e => HandelBlur(e)}
                            className="field"
                            format='+# (###) ###-##-##'
                            mask='_'
                            name='namber'
                            placeholder="+7 (999) 333-22-11"
                            value={inputValue.value}
                            onValueChange={(values) => setInputValue(values)}
                            onChange={(e) => { namberHandler(e) }}
                        />


                        <div>
                        </div>
                        <div className="blok__button--registr">
                            <Button
                                className={disabled}
                                // disabled={nextDisabled}
                                disabled={!formValid}
                                onClick={onClickNextStep}
                            >Далее</Button>
                        </div>
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