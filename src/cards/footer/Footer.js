import React from "react";
import './footer.css';
import { Link } from 'react-router-dom';



function Footer() {

    return (
        <div className="container__wrapper">
            <div className="content__block--flex">
                <div className="block__white">
                    <div className="block__white--container">
                        <div className="container__with">
                            <Link className="block__white-li" to={"/"}>ПОЛЬЗОВАТЕЛЯМ</Link>
                            <Link className="block__white-li" to={"/start/1"}>ПАРТНЁРАМ</Link>
                            <Link className="block__white-li" to={"/start/2"}>О НАС</Link>
                        </div>
                        <div className="container__with">
                            <li className="font--bl--weigth">связаться с нами</li>
                            <li className="font--bl--weigth">тел: 8 800 888 30 30</li>
                            <li className="font--bl--weigth">teh@email.ru</li>
                        </div>
                    </div>


                    <div className="block__grey">
                        <div className="">
                            <div className="bl__container--grey">
                                <p>
                                    Твой <font color='#FFED50'>Техник</font> это команда профессионалов,
                                    которые готовы сделать качественный ремонт
                                    бытовой техники для вашего комфорта.
                                </p>
                            </div>
                            <div className="bl__container--grey">
                                <p>
                                    Мы прилагаем все усилия, чтобы предоставить нашим клиентам лучшие услуги по ремонту бытовой техники.
                                    Часто клиенты приходят к нам с жалобами «мой холодильник не охлаждается быстро»,
                                    «одна из конфорок на моей плите больше не работает» и т. д. Хорошо, если у вас есть эти или похожие жалобы,
                                    тогда Вам нужно войти в аккаунт и заполнить анкету в два клика, и мы обещаем восстановить комфорт вашего дома в кратчайшие сроки.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Footer;