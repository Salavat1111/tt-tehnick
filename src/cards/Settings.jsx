import React from "react";
import '../App.css';
import { Button, InputText } from '../cards'
import { FaChevronRight } from "react-icons/fa"; //стрелка вправо
import { FaEnvelope } from "react-icons/fa"; //почта
import { FaMapMarkerAlt } from "react-icons/fa"; //геолокация
import { FaPhoneAlt } from "react-icons/fa"; //телефон




function Settings() {

    const [visibleEdit, setVisibleEdit] = React.useState(false)
    const onClickSettingVisible = () => {
          setVisibleEdit(!visibleEdit)
    };

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
                                     <input placeholder="Cалават"/>
                                 </div>
                                 <div className="block__setting-input">
                                     <p>Фамилия</p>
                                     <input placeholder="Фаттахов"/>
                                 </div>
                            </div>
     {visibleEdit ?  
      <div className="lgk__setting--edit-block">
      <div className="block__setting-input">
      <p>Телефон</p>
      <input placeholder="+7 (900) 393-22-33"/>
      </div>
      <div className="block__setting-input">
      <p>Почта</p>
      <input placeholder="ropc@gmail.com"/>
      </div>
      <div className="block__setting-input">
      <p>Адрес</p>
      <input placeholder="г. Самара, ул. Корастелева 14, кв-7"/>
      </div>
      </div>

     : 
     
     <div className="bl__items-user">
                            <p className="title__contacts">Контакты</p>
                            <div className="order__content">
                                <div className="container__fasource">
                                    <div className="svg__content">
                                        <FaPhoneAlt />
                                    </div>
                                    <div className="">
                                        <p className="title__menu">Телефон</p>
                                        <p className="title__text">880090005555</p>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="order__content">
                                <div className="container__fasource">
                                    <div className="svg__content">
                                        <FaEnvelope />
                                    </div>
                                    <div className="">
                                        <p className="title__menu">Почта</p>
                                        <p className="title__text">reptilt@mail.ru</p>
                                    </div>
                                </div>
                            
                            </div>

                            <div className="order__content">
                                <div className="container__fasource">
                                    <div className="svg__content">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div className="">
                                        <p className="title__menu">Адрес</p>
                                        <p className="title__text">Москва, ул. Кутузова д. 17б, кв 14</p>
                                    </div>
                                </div>
                            </div>
        </div>   
}

                        </div>
                    </div>

                </div>
                {/* <NavigationBottom /> */}
                {/* <div className="bl_heitgh--crOrder"></div> */}
                </div>
               <div className="btn__setting">
                <div className="btn__setting__container">
                   <Button 
                   onClick={onClickSettingVisible}
                   >Редактировать</Button>
                </div>
               <div className="btn__setting__container"><Button>Сохранить</Button></div>
               </div>
               <div className="text__setting">
                   <p>Укажите основную информацию <span>о себе</span></p>
               </div>
                </div>
           </>
    );
}




export default Settings;