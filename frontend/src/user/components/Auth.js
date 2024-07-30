import React, {
  useCallback,
  useReducer,
  useState,
  useEffect,
  useContext,
} from "react";
import "./Auth.css";
import Input from "./Input";
import AuthButton from "./AuthButton";

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../util/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

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
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const Auth = (props) => {
  const auth = useContext(AuthContext);
  const { type } = props;

  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    setIsLoginMode("login" == type);
  }, [type]);

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          JSON.stringify({
            username: formState.inputs.username.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" } // Tells middleware it is receiving JSON
        );

        auth.login(responseData.userID, responseData.token);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          "POST",
          JSON.stringify({
            username: formState.inputs.username.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );

        auth.login(responseData.userID, responseData.token);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="auth-block">
        <h1 className="auth-title">Enter Account Information</h1>
        <form onSubmit={authSubmitHandler}>
          <Input
            title="Username"
            id="username"
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
          />
          <Input
            title="Email"
            id="email"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />
          <Input
            title="Password"
            id="password"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />
          <AuthButton
            onClick={authSubmitHandler}
            type="submit"
            text={isLoginMode ? "Login" : "Signup"}
          />
        </form>
        <AuthButton
          inverse
          onClick={switchModeHandler}
          toWhere={isLoginMode ? "/signup" : "/login"}
          text={isLoginMode ? "Switch to Signup" : "Switch to Login"}
        />
      </div>
    </React.Fragment>
  );
};

export default Auth;
