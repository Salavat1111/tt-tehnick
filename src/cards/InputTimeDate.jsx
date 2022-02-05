import React from "react";
import '../App.css';


function InputTimeDate(props) {
    return (
        <div className="input__time-date">
            <input type="text"
                   onChange={(e)=> props.handleValue(e.target.value)}
                   name=""
                   placeholder={props.placeholder} />
        </div>
    );
}


export default InputTimeDate;