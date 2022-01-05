import React from "react";
import '../App.css';
import './step/step.css'
import classNames from 'classnames';
import { MainContext } from '../App';



function Button({ children, disabled, onClick, outline, homerepair, }) {
    // const { onNextStep, nextDisabled } = React.useContext(MainContext);
    // const onClickNextStep = () => {
    //     onNextStep();
    // }


    return (
        <div>
            <button
                // disabled={disabled}
                disabled={disabled}
                onClick={onClick}
                className={classNames('btn__burger', {
                    'button--outline': outline,
                    'button--homerepair': homerepair,
                    'button--disabled': disabled,
                })}>
                {children}
            </button>
        </div>
    );
}


export default Button;

// npm install classnames скачать библиотеку //// https://www.npmjs.com/package/classnames
/* <Button classNames = {`btn__burger ${props.outline ? 'button--outline' : ''}`}>{props.children}</Button> */