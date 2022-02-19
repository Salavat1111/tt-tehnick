import './App.css';

import { FaPlusCircle } from "react-icons/fa"; // создать
import { FaBorderAll } from "react-icons/fa"; // заказы
import { FaLayerGroup } from "react-icons/fa"; // история
import { FaRegSun } from "react-icons/fa"; // настройки

import { PasswordForma, FormatNamber, Registration, HistoryMap, Repair, Settings, СardOrder, Logo, BtnBurger, HomeRepair,Login, } from './cards'
import { Routes, Route } from 'react-router-dom';
import React from 'react';


const stepsComponents = {
  0: HomeRepair,
  1: Registration,
  // 2: FormatNamber,
  2: PasswordForma,
};

export const MainContext = React.createContext({});

function App() {
  const onNextStep = () => {
    setStep((prev) => prev + 1)
  }

  const [step, setStep] = React.useState(0)
  const [user, setUser] = React.useState({})
  const Step = stepsComponents[step];

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
              <Route path="/l" element={< Login />} />
              <Route
                  path="/"
                  element={<MainContext.Provider value={{ step, onNextStep, user, setUser}}>
                            <Step />
                           </MainContext.Provider>}
              />
            </Routes>
          </div>
        </div>




      </div>
    </>
  );
}

export default App;
