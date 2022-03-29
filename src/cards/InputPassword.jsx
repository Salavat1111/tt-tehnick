import React from "react";
import '../App.css';


function InputPassword({handleFunc, inputKey, text}) {
    return (
        <div className="display__input">
            <input type="password" placeholder={text} onChange={(e)=>handleFunc(inputKey, e.target.value)} />
        </div>
    );
}
export default InputPassword;