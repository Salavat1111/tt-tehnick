import './App.css';

import { FaPlusCircle } from "react-icons/fa"; // создать
import { FaBorderAll } from "react-icons/fa"; // заказы
import { FaLayerGroup } from "react-icons/fa"; // история
import { FaRegSun } from "react-icons/fa"; // настройки

import { PasswordForma, FormatNamber, Registration, HistoryMap, Repair, Settings, СardOrder, Logo, NavigationBottom, BtnBurger, HomeRepair,Login, } from './cards'
import { ProfileContact, ProfileEmail, ProfileAdress, ProfileName } from './cards/component-settings';
import { Routes, Route } from 'react-router-dom';
import React from 'react';


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
    { value: 'история', href: '/rooms/3', icon: <FaLayerGroup />, },
    { value: 'настройки', href: '/rooms/4', icon: <FaRegSun />, },
  ];

  // const link = ['Мясные', 'Лесные', 'Саленные', 'Маленые', 'Крутые', 'Малые', 'Слепые', 'Топлые',]
  const [visibleRepir, setVisibleRepair] = React.useState(false);
  const repair = visibleRepir


  const onNextStep = () => {
    setStep((prev) => prev + 1)
  }

  function getRoutersToEditUserParams() {

  }

  const [step, setStep] = React.useState(0)
  const Step = stepsComponents[step];

 let routersToEditUserParams = getRoutersToEditUserParams();

  return (
    <>
      <div className="wrapper">
        <div className="wrapper__content">
          <div className="header__container">
            <div className="header__logo">
              <Logo />
            </div>
          </div>
          <BtnBurger />
          <div className="content__repair">

            <Routes>
              <Route path="/rooms/1" element={<Repair />} />
              <Route path="/rooms/2" element={<СardOrder />} />
              <Route path="/rooms/3" element={<HistoryMap />} />
              <Route path="/rooms/4" element={<Settings />} />
              {routersToEditUserParams}
              {/*<Route path="/rooms/2-2" element={< ProfileName />} />*/}
              {/*<Route path="/rooms/3-3" element={< ProfileContact />} />*/}
              {/*<Route path="/rooms/4-4" element={< ProfileEmail />} />*/}
              {/*<Route path="/rooms/5-5" element={< ProfileAdress />} />*/}
              <Route path="/l" element={< Login />} />
              {/* <Route path="/rooms/2-2" element={< ProfileName />} />
              <Route path="/rooms/3-3" element={< ProfileContact />} />
              <Route path="/rooms/4-4" element={< ProfileEmail />} />
              <Route path="/rooms/5-5" element={< ProfileAdress />} /> */}
              <Route path="/" element={<MainContext.Provider value={{ step, onNextStep }}>
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
