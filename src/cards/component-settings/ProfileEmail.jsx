import React from "react";
import './settings.css'
import {Button, ButtonBack} from '../../cards'
import updateParameterValue from "../../servises/UserService";
import {userSettingsUrl} from "../../common/AppConstants";

function ProfileParameter() {
    const [email, setEmail] = React.useState("");
    return (
        <>
            <a href={userSettingsUrl}>
                <ButtonBack/>
            </a>
            <div className="content__profile">
                <div className="">
                    <div className="input__regstr">
                        <h3>Поменять адрес почты</h3>
                        <div className="display__input">
                            <input onChange={(e) => {
                                setEmail(e.target.value)}}
                                   type="text"
                                   name="" placeholder={"введите email"}/>
                        </div>
                    </div>
                    <div>
                        <Button onClick={() => updateParameterValue("Email", email)}>изменить</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

// function ProfileEmail() {
//     const [email, setEmail] = React.useState("");
//     return (
//         <>
//             <a href='/rooms/4'>
//                 <ButtonBack/>
//             </a>
//             <div className="content__profile">
//                 <div className="">
//                     <div className="input__regstr">
//                         <h3>Поменять адрес почты</h3>
//                         <div className="display__input">
//                             <input onChange={(e) => {
//                                 setEmail(e.target.value)}}
//                                    type="text"
//                                    name="" placeholder={"введите email"}/>
//                         </div>
//                     </div>
//                     <div>
//                         <Button onClick={() => updateParameterValue("Email", email)}>изменить</Button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

export default ProfileParameter;