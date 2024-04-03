import axios from "axios";
import {useDispatch} from 'react-redux';
axios.defaults.baseURL = "http://localhost:8080/api";


export function registerUser(user) {
    return function (dispatch, getState) {
        try {
            axios
                .post('/auth/register', user,
                    setHeaders(getState().authorization.currentUser))
                .then(response => {
                    dispatch(showMessage({message: response.data, isError: false}))
                })
                .catch(e => {
                    if (e.response.status === 400)
                        dispatch(showMessage({message: e.response.data, isError: true}));
                });
        } catch (e) {
            console.log("SingUp error", e);
        }
    }
}

export function loginUser(user) {
    return function (dispatch, getState) {
        try {
            axios
                .post('/auth/login', user,
                    setHeaders(getState().authorization.currentUser))
                .then(response => {
                    user = {username: user.username, token: response.data};
                    localStorage.setItem("token", response.data);
                    localStorage.setItem("username", user.username);
                    dispatch(actions.signIn(user));
                })
                .catch(e => {
                    if (e.response.status === 400)
                        dispatch(showMessage({message: e.response.data, isError: true}))
                })
        } catch (e) {
            console.log("SignIn error", e);
        }

    }
}

export function addUser(user, thunk) {
    return function (dispatch, getState) {
        Object.keys(getState().authorization.invalidInputs).forEach(field => getState().authorization.invalidInputs[field] && dispatch(actions.resetInvalidField(field)));
        dispatch(actions.validateUser(user));
        if (!Object.values(getState().authorization.invalidInputs).includes(true)) {
            dispatch(thunk(user));
        } else {
            setTimeout(() => {
                Object.keys(getState().authorization.invalidInputs).forEach(field => getState().authorization.invalidInputs[field] && dispatch(actions.resetInvalidField(field)));
            }, 3000);
        }
    }
}