import React from "react";
import './settings.css';
import {Button} from '../../cards';
import {FaMapMarkerAlt, FaPhoneAlt} from "react-icons/fa"; //телефон
import {getUserModel, updateUser} from "../../servises/UserService";
import EmailInput from "../EmailInput";
import AddressInput from "../AddressInput";
import TextInput from "../TextInput";

function Settings({isLogin, user, }) {
    const [userSettings, setUserSettings] = React.useState({})
    const [paramsToSave, setParamsToSave] = React.useState([])
    const [editable, setEditable] = React.useState(false)
    const [modelParams, setModelParams] = React.useState([])
    const [saveInfo, setSaveInfo] = React.useState("")

    function setUserParameters(newParams) {
        let newUser = {...userSettings}
        newUser.parameters = newParams;
        setUserSettings(newUser)
    }

    const onClickSettingVisible = () => {
        let oldEditable = editable
        setEditable(!oldEditable)
        let newParams = [...userSettings.parameters];
        newParams = newParams.map(
            (p) => {
                if (!oldEditable && !p.visible) {
                    p.visible = !oldEditable;
                } else if(oldEditable && user.parameters != undefined) {
                    let userParam = getUserParam(user.parameters, "" + p.attrId);
                    if (userParam == undefined) {
                        p.visible = false;
                    } else if (userParam != undefined) {
                        p.value = userParam.value
                    }
                }
                return p;
            }
        );
        setUserParameters(newParams);
    };

    function changeUserProperty(property, value) {
        let newUser = {...userSettings}
        newUser[property] = value;
        setUserSettings(newUser);
    }

    function getUserParam(params, attrId) {
        for (let param of params) {
            if (param.attrId == attrId) {
                return param
            }
        }
        return undefined
    }

    React.useEffect(() => {
        getUserModel().then((response) => {
                console.log("getUserMode: response:" + JSON.stringify(response))
                setModelParams(response)
                console.log("getUserMode: modelParams:" + JSON.stringify(modelParams))

                let parameters = user != undefined ?
                    user.parameters != undefined ? [...user.parameters] : userSettings.parameters
                    :userSettings.parameters;
                if (parameters == undefined) {
                    parameters = response.map(p => {
                        p.visible = false
                        return p;
                    })
                    console.log("p1: " + JSON.stringify(parameters))
                } else {
                    parameters.map(p=>p.visible=true)
                    let allParams = [...parameters]
                    console.log("p2: " + JSON.stringify(allParams))
                    console.log("p22: " + JSON.stringify(parameters))

                    for (let p of response) {
                        if (getUserParam(parameters, p.attrId) == undefined) {
                            p.visible = false
                            allParams.push(p)
                        }
                    }
                    parameters = allParams;
                }

                console.log("allParams:")
                console.log(JSON.stringify(parameters))
                setUserParameters(parameters)
            }
        ).catch((e) => {
            console.log("error to getUserMode")
            console.log(e)
        });


    }, [setModelParams, setUserSettings])

    function changeUserParameter(property, value) {
        let newParams = [...userSettings.parameters]
        let _paramsToSave = [...paramsToSave]
        for (let p in userSettings.parameters) {
            if (newParams[p].name == property) {
                let newParam = newParams[p];
                newParam["value"] = value;
                newParams[p] = newParam
                if (value != "" && value != undefined) {
                    let userParam = getUserParam(_paramsToSave, newParam.attrId);
                    if (userParam == undefined) {
                        _paramsToSave.push(newParam)
                    } else {
                        _paramsToSave = _paramsToSave.map(p=> {
                            if (p.attrId == newParam.attrId) {
                                p.value = value
                            }
                            return p
                        })
                    }
                }
                break
            }
        }
        setUserParameters(newParams)
        setParamsToSave(_paramsToSave)
        console.log("changeUserParameter:" + JSON.stringify(newParams))
        console.log("changeUserParameter2:" + JSON.stringify(userSettings))
        console.log("changeUserParameter2:" + JSON.stringify(user))
    }

    function getInputs(parameters) {
        return parameters?.map(p => {
            let inputParams = {
                paramName: p.name,
                placeHolder: p.value,
                editable: editable,
                handleParam: changeUserParameter,
                propertyKey: p.name,
                visible: p.visible
            }
            if (p.type === "EMAIL") {
                return <EmailInput {...inputParams} />
            } else if (p.type === "ADDRESS") {
                return <AddressInput {...inputParams} img={<FaMapMarkerAlt/>}/>
            } else {
                return <TextInput {...inputParams} img={<FaPhoneAlt/>}/>
            }
        });
    }

    let inputs = getInputs(userSettings.parameters)

    return (
        <div className="wrapper__content-settings">
            <div className="content-registr-settings">
                <div className="header__container">
                    <div className="header__logo">
                    </div>
                </div>
                {isLogin ?
                    (<div className="content">
                        <div>
                            <div>
                                <h1 className="zgl__login--card--reg">Настройки</h1>
                            </div>
                            <div className="order__block">
                                <div className="order__content-telefon">

                                    <div className="block__setting-input">
                                        <p>Имя</p>
                                        <input onChange={(e) =>
                                            changeUserProperty("firstName", e.target.value)}
                                               value={user["firstName"]}
                                        />
                                    </div>
                                    <div className="block__setting-input">
                                        <p>Фамилия</p>
                                        <input onChange={(e) =>
                                            changeUserProperty("secondName", e.target.value)}
                                               value={user["secondName"]}
                                        />
                                    </div>
                                </div>
                                <div className={editable ? "lgk__setting--edit-block" : "bl__items-user"}>
                                    <TextInput
                                        paramName={"Телефон"}
                                        placeHolder={user["phoneNumber"]}
                                        img={<FaPhoneAlt/>}
                                        handleParam={changeUserProperty}
                                        propertyKey={"phoneNumber"}
                                        editable={editable}
                                        visible={true}
                                    />
                                    {inputs}
                                </div>
                            </div>
                        </div>

                        <div className="btn__setting">
                            <div className="btn__setting__container">
                                <Button
                                    onClick={onClickSettingVisible}
                                >{editable ? "Отменить" : "Редактировать"}</Button>
                            </div>
                            {saveInfo}
                            <div className="btn__setting__container"><Button onClick={() => {
                                userSettings.parameters = paramsToSave
                                console.log("userSettings when save")
                                console.log(JSON.stringify(userSettings))
                                updateUser(userSettings)
                                    .then((resp) => {
                                        setUserSettings(resp);
                                        setSaveInfo("Сохранено!")
                                        setEditable(false);
                                        onClickSettingVisible()
                                        setTimeout(() => {
                                            setSaveInfo("")
                                        }, 3000);
                                    });

                            }}>Сохранить</Button></div>
                        </div>
                        {/*<div className="text__setting">*/}
                        {/*    <p>Укажите основную информацию <span>о себе</span></p>*/}
                        {/*</div>*/}

                    </div>) :
                    (<div>
                        <h1 className="zgl__login--card--reg">Войти</h1>
                    </div>)
                }
            </div>
        </div>
    );
}


export default Settings;