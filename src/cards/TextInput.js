import React from "react";

function TextInput({paramName, placeHolder, img, editable, handleParam, propertyKey, onInput}) {
    return editable ?
        (<div className="block__setting-input">
            <p>{paramName}</p>
            <input onInput={(e)=> onInput(e)}
                onChange={(e) => {
                console.log(e.target.value)
                if (handleParam) {
                    handleParam(propertyKey, e.target.value)
                }
            }} placeholder={placeHolder}/>
        </div>) : (<div className="order__content">
            <div className="container__fasource">
                <div className="svg__content">
                    {img}
                </div>
                <div className="">
                    <p className="title__menu">{paramName}</p>
                    <p className="title__text">{placeHolder}</p>
                </div>
            </div>

        </div>);
}

export default TextInput;