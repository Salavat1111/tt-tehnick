import React from "react";
import './step.css';
import '../../macro.css';
import { Button } from '../../cards'
import { MainContext } from '../../App';
import Pages from '../../img/1.png';

function HomeRepair({ props }) {
    const { onNextStep } = React.useContext(MainContext);

    return (
      
        <div className="conteiner__wr__homepage">
              <div className="block__button--homerepair">
            <div className="wr__homepage">
            <div className="d-flex content__wr__homepage">
            <div className="block__rapair">
            <h1>Ремонт бытовой техники</h1>
            <h3>
                Вам нужна помощь в ремонте бытовой техники? Великолепно!
                Вы нашли нужное место, оставайтесь с нами, и мы обещаем,
                что не пожалеете!
            </h3>
            <h4>Как мы работаем?</h4> 
            </div>
            <div className="block__page">
            <img src={Pages} />
            </div>
            </div>
            <div className="message__block">
                <p>
                Мы работаем по вашим заявкам, Классический текст-«рыба». 
                Является искажённым отрывком из философского трактата Марка Туллия Цицерона 
                «О пределах добра и зла», написанного в 45 году до н. э. 
                </p>
            </div>
         
            <Button
                onClick={onNextStep}
                homerepair
            >оставить заявку</Button>
            
        </div>
        </div>
        </div>
    );
}


export default HomeRepair;