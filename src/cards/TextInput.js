import React from "react";

function TextInput({paramName, placeHolder, img, editable, setValue, propertyKey, onInput, visible}) {
    return visible ?
        editable ?
            (<div className="block__setting-input">
                <p>{paramName}</p>
                <input
                    onInput={(e) => {
                        console.log(e.target.value)
                        // if (handleParam) {
                        setValue(propertyKey, e.target.value)
                        // }
                    }}
                    // onChange={(e) => {
                    //        console.log(e.target.value)
                           // if (handleParam) {
                           // handleParam(propertyKey, e.target.value)
                           // }
                       //}}
                    placeholder={placeHolder}
                    value={placeHolder}
                />
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

            </div>) :
        <div></div>
        ;
}

export default TextInput;