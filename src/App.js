import './App.css';

import { FaArchive, FaFeatherAlt, FaCog } from "react-icons/fa"; // заказы // создать // настройки
import { FaHome, FaHubspot, FaUserCog } from "react-icons/fa"; // главная // партнерам // о нас
import { СardOrder } from "./cards/comp-applications";
import { BtnBurger, HistoryMap, HomeRepair, PasswordForma, Registration, Repair, Settings, } from './cards'
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { Header } from './cards/header-logo'
import Login from "./cards/Login";
import UserService from "./servises/UserService";
import { Footer } from "./cards/footer";
import { TechnicalStaff } from "./cards/technical-staff"
import { AboutUs } from "./cards/about-us"
const stepsComponents = {
  0: HomeRepair,
  1: Registration,
  // 2: FormatNamber,
  2: PasswordForma,
};

export const MainContext = React.createContext({});

function App() {

  const userService = new UserService();
  const items = [
    { value: 'создать', href: '/rooms/1', icon: <FaFeatherAlt />, },
    { value: 'заказы', href: '/rooms/2', icon: <FaArchive />, },
    { value: 'настройки', href: '/rooms/4', icon: <FaCog />, },
  ];
  const triad = [
    { value: 'главное', href: '/', icon: <FaHome />, },
    { value: 'партнерам', href: '/start/1', icon: <FaHubspot />, },
    { value: 'о нас', href: '/start/2', icon: <FaUserCog />, },
  ]





  const onNextStep = () => {
    setStep((prev) => prev + 1)
  }

  const [step, setStep] = React.useState(0)
  const [user, setUser] = React.useState({})
  const Step = stepsComponents[step];
  const [isLogin, setIsLogin] = React.useState(false)


  React.useEffect(() => {
    userService.getCurrentUserInfo().then(response => {
      console.log('getUser: ' + JSON.stringify(response));
      if (response != "") {
        setUser(response);
        setIsLogin(true)

      } else {
        setUser({});
        setIsLogin(false)

      }
    }).catch(() => {
      console.log("error to getUser");
      setIsLogin(false);
    }
    );
  }, [setUser, setIsLogin]);




  return (
    <>
      <div className="wrapper">
        <div className="wrapper__content">
          <div className="header__container">
            <div className="header__logo">
              <Header items={items} triad={triad} isLogin={isLogin} user={user} setIsLogin={setIsLogin} />
            </div>
          </div>
          <BtnBurger />
          <div className="content__repair">

            <Routes>
              <Route path="/start/1" element={<TechnicalStaff />} />
              <Route path="/start/2" element={<AboutUs />} />


              <Route path="/rooms/1" element={<Repair user={user} userService={userService} />} />
              <Route path="/rooms/2" element={<СardOrder />} />
              {/* <Route path="/rooms/3" element={<HistoryMap />} /> */}
              <Route path="/rooms/4" element={<Settings isLogin={isLogin} user={user} userService={userService} triad={triad} />} />
              <Route path="/l" element={< Login />} />
              <Route
                path="/"
                element={<MainContext.Provider value={{ step, onNextStep, user, setUser }}>
                  <Step />
                </MainContext.Provider>}
              />
            </Routes>

          </div>
          <footer>
            <Footer />
          </footer>
        </div>


      </div>
    </>
  );
}

export default App;
