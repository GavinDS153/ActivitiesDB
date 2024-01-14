import React, {useCallback, useReducer, useState} from "react";
import "./Auth.css";
import Input from "./Input";
import AuthButton from "./AuthButton";

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../util/validators";

const formReducer = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {value: action.value, isValid: action.isValid}
                },
                isValid: formIsValid
            };
        default:
            return state;
    }
}

const Auth = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            username: {
                value: "",
                isValid: false
            },
            email: {
                value: "",
                isValid: false
            },
            password: {
                value: "",
                isValid: false
            }
        },
        isValid: false
    });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({type: "INPUT_CHANGE", value: value, isValid: isValid, inputId: id});
    }, []);

    const switchModeHandler = () => {
        setIsLoginMode(prevMode => !prevMode);
    }

    const authSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }
    
    return (
        <React.Fragment>
            <div className="auth-block">
                <h1 className="auth-title">Enter Account Information</h1>
                <form onSubmit={authSubmitHandler}>
                    <Input title="Username" id="username" validators={[VALIDATOR_MINLENGTH(5)]} onInput={inputHandler} />
                    <Input title="Email" id="email" onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} />
                    <Input title="Password" id="password" onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} />
                    <AuthButton type="submit" text={isLoginMode ? "Login" : "Signup"} />
                </form>
                <AuthButton inverse onClick={switchModeHandler} text={isLoginMode ? "Switch to Signup" : "Switch to Login"} />
            </div>
        </React.Fragment>
    );
}

export default Auth;