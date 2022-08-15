import React from "react";
import './staff.css';
import '../../macro.css';
import { FaAngleDown } from "react-icons/fa"; // стрелка вниз //  // 

function TechnicalStaff({ }) {
    const ItemsText = [
        {
            text: 'Каким может быть  доход техника?',
            icon: <FaAngleDown />,
            description: 'Финальный заработок техника зависит от региона и от выполние количество заказов. С компанией ТВОЙ ТЕХНИК можно как подрабатывать, так и выполнять заказы каждый день. И для техника в сервисе есть свои бонусы. С доходом всё прозрачно. В разделе «Заработок» в ТВОЙ ТЕХНИК ПЛЮС можно проверить список всех заказов и детальную информацию по каждой: детализация выполненных работ, стоимость, бонусы. Клиенты будут платить вам как наличными, так и картой. И возможно оставлять чаевые.'
        },
        {
            text: 'Условия работы?',
            icon: <FaAngleDown />,
            description: 'Можно подрабатывать, выполняя  один-два заказа, или брать заказы на целый рабочий день — решать вам.'
        },
        {
            text: 'Как я буду получать заказы?',
            icon: <FaAngleDown />,
            description: 'Начать работу техников с сервисом ТВОЙ ТЕХНИК очень просто. Вам понадобится смартфон с операционной системой Android 5.0, камерой, GPS-модулем и 2 ГБ оперативной памяти. Скачайте и установите приложение Яндекс.Про. Оно будет предлагать вам заказы, прокладывать маршрут, рассчитывать цену поездки и держать в курсе всех новостей сервиса. Вам не придётся искать себе пассажиров или думать о том, как лучше проехать — можно сосредоточиться на заказах.'
        },
        {
            text: 'Если нет опыта, можно у Вас работать?',
            icon: <FaAngleDown />,
            description: 'Выполнять заказы Яндекс.Такси могут водители старше 21 года, со стажем вождения от трёх лет и водительским удостоверением, выданным в РФ, Беларуси, Кыргызстане, Казахстане, Абхазии и Южной Осетии. Новичкам мы расскажем обо всех особенностях и стандартах качества нашего сервиса. Во всём остальном поможет Яндекс.Про: найдёт заказ и проложит маршрут c учётом пробок и перекрытий.'
        },
    ];

    const [togleClick, setTogleClick] = React.useState();
    const [activeItem, setActiveItem] = React.useState();

    const onSelectItem = (index) => {
        setActiveItem(index);
        console.log(activeItem)
    }

    // React.useEffect((name) => {
    //     if (document.querySelector('click') === !togleClick) {
    //         <div className='togle'>
    //             <span>{name.icon}</span>
    //         </div>
    //     }
    // }, [setTogleClick])


    return (
        <div className="staff__homepage">
            <div className="container__heading-text">
                <h1>Как стать техником?</h1>
                <div>
                    <h3>1. Оставить заявку.</h3>
                    <h3>2. Мы позвоним Вам, для уточнение деталей.</h3>
                </div>
            </div>
            <div className="container__description">
                {ItemsText && ItemsText.map((name, index) =>
                    <div>
                        <div className="d-flex justify-between cont__wth-icon">
                            <p className="">{name.text}</p>
                            <div
                                // className={activeItem === index ? 'togle active' : 'togle '}
                                className={activeItem === index ? 'togle active' : 'togle '}
                                onClick={() => onSelectItem(index)}
                            >
                                <span
                                    onClick={() => setTogleClick(!togleClick)}
                                // className={togleClick ? 'togle' : 'togle active'}
                                >{name.icon}</span>
                            </div>
                        </div>
                        <div
                            key={`${name}_${index}`}
                            className={activeItem === index ? "block__description-text active" : "block__description-text"}>{name.description}
                        </div>
                    </div>
                )}
            </div>
            <div className="container__application">
                <div className="container__application-block">
                    <div className="block__h1--zv"><h1>ОСТАВИТЬ ЗАЯВКУ</h1></div>
                    <div className="container__block__fm-namber">
                        <div className="block__femaly">
                            <h3>Ф.И.О</h3>
                            <input />
                        </div>
                        <div className="block__namber">
                            <h3>Номер телефона</h3>
                            <input />
                        </div>
                    </div>
                    <div className="container__span-block">
                        <span><font color='#ff1212'>*</font> Отправляя заявку, вы соглашаетесь с условиями оферты</span>
                    </div>
                </div>
            </div>
        </div >
    );
}


export default TechnicalStaff;