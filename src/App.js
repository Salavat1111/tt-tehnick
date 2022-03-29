import './App.css';

import {FaBorderAll, FaPlusCircle, FaRegSun} from "react-icons/fa"; // заказы // создать // настройки
import {СardOrder} from "./cards/comp-applications";
import {HistoryMap, HomeRepair, Repair, Settings,} from './cards'
import {Route, Routes} from 'react-router-dom';
import React from 'react';
import {Header} from './cards/header-logo'
import UserService from "./servises/UserService";
import {Footer} from "./cards/footer";
import LoginPopup from "./cards/login/LoginPopup";
import RegistrationPopup from "./cards/login/RegistrationPopup";

export const MainContext = React.createContext({});
function App() {

  const userService = new UserService();
  const items = [
    {value: 'создать', href: '/rooms/1', icon: <FaPlusCircle/>,},
    {value: 'заказы', href: '/rooms/2', icon: <FaBorderAll/>,},
    {value: 'настройки', href: '/rooms/4', icon: <FaRegSun/>,},
  ];

  const [user, setUser] = React.useState({})
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
                <Header items={items} isLogin={isLogin} user={user}/>
              </div>
            </div>
            <div className="content__repair">
              <Routes>
                <Route path="/rooms/1" element={<Repair user={user} userService={userService}/>}/>
                <Route path="/rooms/2" element={<СardOrder/>}/>
                <Route path="/rooms/3" element={<HistoryMap/>}/>
                <Route path="/rooms/4" element={<Settings isLogin={isLogin} user={user} userService={userService}/>}/>

                <Route path="/l" element={<LoginPopup login={userService.login}/>}/>
                <Route path="/r" element={<RegistrationPopup createUser={userService.creteUser} user={user} setUser={setUser}/>}/>
                <Route path="/" element={<HomeRepair isLogin={isLogin}/>}
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
