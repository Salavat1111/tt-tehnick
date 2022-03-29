import React from "react";

function LoginPopupTemplate(props) {
    const {children} = props
    return <div className="wrapper__content-registr">
        <div className="content-registr">
            {children[0]}
            <div className="display__input--field">
                <div className="input__regstr">
                    {children[1]}
                    {children[2]}
                </div>
                <div className="cont__bl--card--reg">
                    {children[3]}
                </div>
            </div>
        </div>
    </div>
}

export default LoginPopupTemplate;