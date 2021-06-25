import React from "react";
import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                // если сюда придёт action, мы делаем копию state и меняем initialized на true
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

// задиспатчим action creation

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

// thunk crator, в нём thunk. В thunk мы делаем что-то, что нужно для инициализации
export const initializeApp = () => (dispatch) => {
    // задиспатчем получение авторизационных данных и когда данные будут получены задиспатчем initializedSuccess
    // мы проинициализировались, только после завершения асинхронных диспатчей
    // promise приходит из auth-reducer и мф можем дождаться, когда он зарезолвится
    // если thunk что-то return, то этот return становится return самого dispatch
    // вызываем thunk creator getAuthUserData(), возвращается thunk
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            // когда промис зарезолвится делаем initializedSuccess
            dispatch(initializedSuccess());
        });
}

export default appReducer;