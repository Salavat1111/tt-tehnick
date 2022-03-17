import './App.css';
import { FaChevronDown } from "react-icons/fa"; // стрелка вниз
import { FaPlusCircle } from "react-icons/fa"; // создать
import { FaBorderAll } from "react-icons/fa"; // заказы
import { FaLayerGroup } from "react-icons/fa"; // история
import { FaRegSun } from "react-icons/fa"; // настройки
import { СardOrder } from "./cards/comp-applications";
import { PasswordForma, FormatNamber, Registration, HistoryMap, Repair, Settings, NavigationBottom, BtnBurger, HomeRepair, } from './cards'
import { ProfileContact, ProfileEmail, ProfileAdress, ProfileName } from './cards/component-settings';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { Header } from './cards/header-logo'

const stepsComponents = {
  0: HomeRepair,
  1: Registration,
  2: FormatNamber,
  3: PasswordForma,
};

export const MainContext = React.createContext({});

function App() {

  const items = [
    { value: 'создать', href: '/rooms/1', icon: <FaPlusCircle />, },
    { value: 'заказы', href: '/rooms/2', icon: <FaBorderAll />, },
    { value: 'настройки', href: '/rooms/4', icon: <FaRegSun />, },
  ];

  const itemsUser= [
    { value: 'Пользователям', href: '/chapter/1', icon: <FaChevronDown />, },
    { value: 'Техникам', href: '/chapter/2', icon: <FaChevronDown />, },
    { value: 'Партнёрам', href: '/chapter/3', icon: <FaChevronDown />, },
  ];

  // const link = ['Мясные', 'Лесные', 'Саленные', 'Маленые', 'Крутые', 'Малые', 'Слепые', 'Топлые',]
  const [visibleRepir, setVisibleRepair] = React.useState(false);
  const repair = visibleRepir


  const onNextStep = () => {
    setStep((prev) => prev + 1)
  }

  const [step, setStep] = React.useState(0)
  const Step = stepsComponents[step];



  return (
    <>
      <div className="wrapper">
        <div className="wrapper__content">
          <div className="header__container">
            <div className="header__logo">
              {/* <Logo /> */}
              <Header items={items} itemsUser={itemsUser}/>
            </div>
          </div>
          <BtnBurger />
          <div className="content__repair">

            <Routes>
              <Route path="/rooms/1" element={<Repair />} />
              <Route path="/rooms/2" element={<СardOrder />} />
              <Route path="/rooms/3" element={<HistoryMap />} />
              <Route path="/rooms/4" element={<Settings />} />
              {/* <Route path="/rooms/2-2" element={< ProfileName />} />
              <Route path="/rooms/3-3" element={< ProfileContact />} />
              <Route path="/rooms/4-4" element={< ProfileEmail />} />
              <Route path="/rooms/5-5" element={< ProfileAdress />} /> */}
              <Route path="/chapter/1" element={<MainContext.Provider value={{ step, onNextStep }}>
                <Step />
              </MainContext.Provider>} />
            </Routes>


            {/* <NavigationBottom items={items} /> */}


          </div>
        </div>




      </div>
    </>
  );
}

export default App;
