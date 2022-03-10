import React from "react";
import './settings.css';
import {Button} from '../../cards';
import {FaMapMarkerAlt, FaPhoneAlt} from "react-icons/fa"; //телефон
import EmailInput from "../EmailInput";
import AddressInput from "../AddressInput";
import TextInput from "../TextInput";
import EditableInput from "../inputs/EditableInput";

function Settings({isLogin, user, userService}) {
    const [userSettings, setUserSettings] = React.useState({})
    const [editable, setEditable] = React.useState(false)
    const [savedInfo, setSavedInfo] = React.useState("")
    const [modelParams, setModelParams] = React.useState([])
    function setUserParameters(newParams) {
        setUserSettings((prev) => ({...prev, parameters: newParams}))
    }


    const onClickSettingVisible = (saved) => {
        let oldEditable = editable
        setEditable(!oldEditable)
        let newParams = [...userSettings.parameters];
        newParams = newParams.map(
            (p) => {
                if (saved) {
                    p.oldValue = p.value
                }
                if (!oldEditable && !p.visible) {
                    p.visible = !oldEditable;
                } else if (oldEditable && userSettings?.parameters != undefined) {
                    let userParam = getUserParam(user?.parameters, "" + p.attrId);
                    if (userParam == undefined) {
                        p.visible = false;
                    } else if (userParam != undefined && !saved) {
                        p.value = p.oldValue
                    }
                }
                return p;
            }
        );
        setUserParameters(newParams);
    };

    function getUserParam(params, attrId) {
        if (params != undefined) {
            for (let param of params) {
                if (param.attrId == attrId) {
                    return param
                }
            }
        }
        return undefined
    }

    React.useEffect(() => {
        userService.getUserModel().then((response) => {
                setModelParams(response)
                console.log("setModelParams: " + JSON.stringify(response))
            }
        ).catch((e) => {
            console.log("error to getUserMode")
            console.log(e)
        });
    }, [])

    function mergeUserParamsWithModelParams(user, modelParams) {
        if (user?.parameters) {
            let newParams = [...user.parameters,]
            newParams.map(p => {
                p.visible = true;
                p.oldValue = p.value;
            })
            for (let p of modelParams) {
                if (getUserParam(newParams, p.attrId) == undefined) {
                    p.visible = false
                    newParams.push(p);
                }
            }
            setUserSettings({...user, parameters: newParams})
        }
    }

    React.useEffect(() => {
        mergeUserParamsWithModelParams(user, modelParams);
        console.log("user: " + JSON.stringify(user))
    }, [
        user,
        modelParams
    ])

    function changeUserParameter(property, value) {
        let newParams = [...userSettings.parameters]
        for (let p in userSettings.parameters) {
            if (newParams[p].name == property) {
                let newParam = newParams[p];
                newParam.value = value;
                newParam.toSave = newParam.oldValue != value;
                newParams[p] = newParam
                break
            }
        }
        setUserParameters(newParams)
    }

    function getInputs(parameters) {
        console.log("getInputs:" + JSON.stringify(parameters))
        return parameters?.map(p => {
            let inputParams = {
                paramName: p.name,
                placeHolder: p.value,
                editable: editable,
                setValue: (e) => changeUserParameter(p.name, e.target.value),
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

    function SettingsContent() {
        return <div className="content">
            <div>
                <div>
                    <h1 className="zgl__login--card--reg">Настройки </h1>
                </div>
                <div className="order__block">
                    <div className="order__content-telefon">
                        <EditableInput
                            label={"Имя"}
                            value={userSettings?.firstName}
                            onChange={(e) => {
                            setUserSettings((prev) => ({...prev, firstName: e.target.value}));
                        }}
                        />
                        <EditableInput
                            label={"Фамилия"}
                            value={userSettings?.secondName}
                            onChange={(e) => {
                                setUserSettings((prev) => ({...prev, secondName: e.target.value}));
                            }}
                        />
                    </div>
                    <div className={editable ? "lgk__setting--edit-block" : "bl__items-user"}>
                        <TextInput
                            paramName={"Телефон"}
                            placeHolder={userSettings?.phoneNumber}
                            img={<FaPhoneAlt/>}
                            setValue={(e) => {setUserSettings((prev) => ({...prev, phoneNumber: e.target.value}));}}
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
                    <Button onClick={() => {onClickSettingVisible(false)}}>
                        {editable ? "Отменить" : "Редактировать"}
                    </Button>
                </div>
                {savedInfo}
                <div className="btn__setting__container">
                    <Button onClick={() => {
                    let toSaveData = {...userSettings}
                    toSaveData.parameters = userSettings.parameters.filter(p => {
                        return p.toSave;
                    });
                    const updateUser = userService.updateUser(toSaveData);
                    updateUser.then(
                        (response) => {
                            response.parameters.map(p=>{p.visible=true})
                            mergeUserParamsWithModelParams(response, modelParams);
                            console.log('updateUser setUserSettings' + JSON.stringify(response))
                        }
                    )
                    setSavedInfo("Сохранено!");
                    setEditable(false);
                    setTimeout(() => {
                                    setSavedInfo("")
                                }, 3000);
                    onClickSettingVisible(true);
                }}>Сохранить</Button>
                </div>
            </div>
        </div>;
    }

    return (
        <div className="wrapper__content-settings">
            <div className="content-registr-settings">
                <div className="header__container">
                    <div className="header__logo">
                    </div>
                </div>
                {isLogin ?
                    SettingsContent() :
                    (<div>
                        <h1 className="zgl__login--card--reg">Войти</h1>
                    </div>)
                }
            </div>
        </div>
    );
}

export default Settings;