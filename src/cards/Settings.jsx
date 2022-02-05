import React from "react";
import '../App.css';

import {FaChevronRight} from "react-icons/fa";
import TextInput from "./TextInput";
import AddressInput from "./AddressInput";
import EmailInput from "./EmailInput";
import {getCurrentUserInfo} from "../servises/UserService";

function Settings() {
    const [user, setUser] = React.useState({})
    const [params, setParams] = React.useState([])
    const [phoneNumber, setPhoneNumber] = React.useState("")

    function getInputs(parameters) {
        return parameters.map(p => {
            if (p.type === "EMAIL") {
                return <EmailInput paramName={p.name} value={p.value} editLink={"/change_e"}/>
            } else if (p.type === "ADDRESS") {
                return <AddressInput paramName={p.name} value={p.value} editLink={"/change_a"}/>
            } else {
                return <TextInput paramName={p.name} value={p.value} editLink={"/change_t"}/>
            }
        });
    }

    function loadFromServer() {
        getCurrentUserInfo().then(response => {
            console.log('loadFromServer: ' + response);
            setUser(response);
            setPhoneNumber(response["phoneNumber"])
            setParams(response["parameters"])
        })
    };

    React.useEffect(() => {
        loadFromServer()
    }, [setUser, setPhoneNumber, setParams]);

    var inputs = getInputs(params)

    return (
        <div className="wrapper">
            <div className="wrapper__content">
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
                                <div className="">
                                    <p> {user["name"]}</p>
                                </div>
                                <div className="forward__lastname">
                                    <a href='/rooms/2-2'><FaChevronRight/></a>
                                </div>
                            </div>
                            <p className="title__contacts">Контакты</p>
                            <TextInput paramName={"Телефон"} value={phoneNumber} editLink={"/rooms/3-3"}/>
                            {inputs}
                            {/*<div className="order__content">*/}
                            {/*    <div className="container__fasource">*/}
                            {/*        <div className="svg__content">*/}
                            {/*            <FaPhoneAlt />*/}
                            {/*        </div>*/}
                            {/*        <div className="">*/}
                            {/*            <p className="title__menu">Телефон</p>*/}
                            {/*            <p className="title__text">{user["phoneNumber"]}</p>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className="forward">*/}
                            {/*        <a href='/rooms/3-3'><FaChevronRight /></a>*/}
                            {/*    </div>*/}

                            {/*</div>*/}

                            {/*<div className="order__content">*/}
                            {/*    <div className="container__fasource">*/}
                            {/*        <div className="svg__content">*/}
                            {/*            <FaEnvelope />*/}
                            {/*        </div>*/}
                            {/*        <div className="">*/}
                            {/*            <p className="title__menu">Почта</p>*/}
                            {/*            <p className="title__text">reptilt@mail.ru</p>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className="forward">*/}
                            {/*        <a href='/rooms/4-4'><FaChevronRight /></a>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            {/*<div className="order__content">*/}
                            {/*    <div className="container__fasource">*/}
                            {/*        <div className="svg__content">*/}
                            {/*            <FaMapMarkerAlt/>*/}
                            {/*        </div>*/}
                            {/*        <div className="">*/}
                            {/*            <p className="title__menu">Адрес</p>*/}
                            {/*            <p className="title__text">Москва, ул. Кутузова д. 17б, кв 14</p>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className="forward">*/}
                            {/*        <a href='/rooms/5-5'><FaChevronRight/></a>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                        </div>
                    </div>

                </div>
                <div className="bl_heitgh--crOrder"></div>
            </div>

        </div>
    );
}


export default Settings;