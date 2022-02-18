import React from "react";
import '../App.css';
import {Button} from '../cards'
import {FaPhoneAlt} from "react-icons/fa"; //почта //геолокация //телефон
import TextInput from "./TextInput";
import AddressInput from "./AddressInput";
import EmailInput from "./EmailInput";
import {getCurrentUserInfo} from "../servises/UserService";
import axios from "axios";
import {serverUrl} from "../common/AppConstants";
import Cookies from "js-cookie";

function Settings() {
    const [user, setUser] = React.useState({})
    const [editable, setEditable] = React.useState(false)
    const onClickSettingVisible = () => {
        setEditable(!editable)
    };

    function changeUserProperty(property, value){
        let newUser = {...user}
        newUser[property] = value;
        setUser(newUser);
    }

    function changeUserParameter(property, value){
        let newParams = [...user["parameters"]]
        for(let p in user["parameters"]) {
            if (newParams[p].name == property) {
               let newParam = newParams[p];
               newParam["value"] = value;
               newParams[p] = newParam
               break
            }
        }
        let newUser = {...user}
        newUser["parameters"] = newParams
        setUser(newUser);
    }

    async function updateUser(user) {
        console.log("updateUser")
        await axios.patch(serverUrl + `/fixer/api/user/update`, user, {
            headers: {
                Authorization: "Bearer " + Cookies.get('access_token'),
                'X-CSRF-TOKEN': Cookies.get('csrf_token')
            }
        }).then(response => {
            console.log('response.data')
            console.log(response.data)
        })
    }

    function getInputs(parameters) {
        return parameters?.map(p => {
            let inputParams = {
                paramName: p.name,
                placeHolder: p.value,
                editable: editable,
                handleParam:changeUserParameter,
                propertyKey:p.name
            }
            if (p.type === "EMAIL") {
                return <EmailInput {...inputParams} />
            } else if (p.type === "ADDRESS") {
                return <AddressInput {...inputParams} />
            } else {
                return <TextInput {...inputParams} img={<FaPhoneAlt/>}/>
            }
        });
    }

    function loadFromServer() {
        getCurrentUserInfo().then(response => {
            console.log('loadFromServer: ' + response);
            setUser(response);
        })
    };

    React.useEffect(() => {
        loadFromServer()
    }, [setUser]);

    let inputs = getInputs(user["parameters"])

    return (
        <>
            <div className="wrapper__content-settings">
                <div className="content-registr-settings">
                    <div className="header__container">
                        <div className="header__logo">
                        </div>
                    </div>
                    <div className="content">
                        <div>
                            <div>
                                <h1 className="zgl__login--card--reg">Настройки</h1>
                            </div>
                            <div className="order__block">
                                <div className="order__content-telefon">

                                    <div className="block__setting-input">
                                        <p>Имя</p>
                                        <input onChange={(e) =>
                                            changeUserProperty("firstName", e.target.value )}
                                               placeholder={user["firstName"]}/>
                                    </div>
                                    <div className="block__setting-input">
                                        <p>Фамилия</p>
                                        <input onChange={(e) =>
                                            changeUserProperty("secondName", e.target.value )}
                                               placeholder={user["secondName"]}/>
                                    </div>
                                </div>
                                <div className={editable ? "lgk__setting--edit-block" : "bl__items-user"}>
                                    <TextInput
                                        paramName={"Телефон"}
                                        placeHolder={"+7 (900) 393-22-33"}
                                        img={<FaPhoneAlt/>}
                                        handleParam={changeUserProperty}
                                        propertyKey={"phoneNumber"}
                                        editable={editable}/>
                                    {inputs}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btn__setting">
                    <div className="btn__setting__container">
                        <Button
                            onClick={onClickSettingVisible}
                        >{editable ? "Отменить" : "Редактировать"}</Button>
                    </div>
                    <div className="btn__setting__container"><Button onClick={() => {
                        updateUser(user)
                    }}>Сохранить</Button></div>
                </div>
                <div className="text__setting">
                    <p>Укажите основную информацию <span>о себе</span></p>
                </div>
            </div>
        </>
    );
}


export default Settings;