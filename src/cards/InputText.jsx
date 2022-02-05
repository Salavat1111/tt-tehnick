import React, {useState} from "react";
import '../App.css';


function InputText(props) {
    const [value, setValue] = useState("");
    return (
        <div className="display__input">
            <input onChange={(e)=>props.handleValue(e.target.value)}
                   type="text" name="" placeholder={props.placeholder} />
        </div>
    );
}


export default InputText;