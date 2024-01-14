import React, {useReducer, useEffect} from "react";
import "./Auth.css";
import {validate} from "../util/validators";

const inputReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case "TOUCH":
            return {
                ...state,
                isTouched: true
            }
        default:
            return state;
    }
}

const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {value: "", isTouched: false, isValid: false});

    const {id, onInput} = props; // Destructuring
    const {value, isValid} = inputState;

    useEffect(() => {
        onInput(props.id, inputState.value, inputState.isValid);
    }, [id, value, isValid, onInput]);

    const changeHandler = event => {
        dispatch(
            {
                type: "CHANGE",
                val: event.target.value,
                validators: props.validators
            }
        ); // Sends an action option to the reducer function
    }

    const touchHandler = () => {
        dispatch({type: "TOUCH"});
    }

    return (
        <div className="auth-field">
            <h3>{props.title}</h3>
            <input className={!inputState.isValid && inputState.isTouched && "input-invalid"} type="text" id={props.id} onChange={changeHandler} onBlur={touchHandler} value={inputState.value} />
        </div>
    );
}

export default Input;