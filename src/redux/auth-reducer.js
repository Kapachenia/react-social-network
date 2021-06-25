import {authAPI, usersAPI} from "../api/api";
import {setUserProfile} from "./profile-reducer";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET-USER-DATA';
// SET_USER_DATA установить пользовательские данные.

// auth-reducer - его задача процессить текущего пользователя

let initialState = {
    userId: null,
    email: null,
    login: null,
    // залогинены или нет
    isAuth: false,
    // идёт загрузка или не идёт
    // isFetching: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
// с сервера приходят данные. Берём старый state и перезатираем данные
                ...state,
// данные приходят в action. Данные нужные reducer для преобразования state лежат в action
// В action создадим объект "data" мы его деструктуризируем.
// В объекте "data" положим userId, email, login
// В action будет свойство data в нём будет сидеть userId, email, ligin
// data меняем на payload
                ...action.payload,
// склеиваем ...state и ...action.data. Свойства, которые находятся в ...action.data перезатирают свойства в .state
                // если пришли пользовательские данные, то мы меняем на true
                // isAuth: true
            }
        default:
            return state
    }
}
// приходит data. Может приходить и в разобраном виде
// setUserData - это action creator - задача функции вернуть action
// Упаковываем action, который будет задиспатчен в reducer (диспатчем action )
export const setAuthUserData = (userId, email, login, isAuth) => {
    return {
        // data меняем на payload
        type: SET_USER_DATA, payload: {userId, email, login, isAuth}
        // в обхект data нужно упаковать свойства
    }
}

// функция внешняя, которая возвращает внутренюю функцию
// если из thunk мы возвращает что-то, то в том месте, где мы вызвали thunk в app-reducer
// если thunk что-то return, то этот return становится return самого dispatch
// async функция возвращает promise, функция зарезолвится, когда всё выполнится
export const getAuthUserData = () => async (dispatch) => {
// promise можем дождаться не с помощью .then, а с помощью await
// .me возвращает promise функция должна быть async. response - значение, которым promise зарезолвился
    let response = await authAPI.me()
// .me и .then возврощает promise, если допишем return, то promise нам вернётся наружу
// promise идёт в app-reducer
//         .then(response => {
// проверка response.data.resultCode === 0 - если 0, то мы залогинены
// и в этом случае мы должны задиспатчик авторизационные данные, которые возмём из response.data.data.login
// в response сидит data, стандартная axios структура
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
// если мы залогинелись правильно resultCode === 0, то мы данные, которые вернул сервер id, email, login
// задиспатчем с помощью setAuthUserData и true добавим
        dispatch(setAuthUserData(id, email, login, true));
// авторизационные данные придут в reducer
    }
    // });
    // return "yo";
}

// thunk это функция принимает метод dispatch
// thunk creator это функция возвращающая dispatch и может принимать что-то и это что-то доступно
// thunk в результате замыкания

export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe);
    // .then(response => {
    // если залогится будет resultCode === 0
    if (response.data.resultCode === 0) {
        // после логинизации мы заново должны запросить authAPI.me()
        // должны заново задиспатчить thunk. Вызываем thunk creator он возвращает thunk
        // thunk уходит через dispatch в store
        dispatch(getAuthUserData())
    } else {
        // stopSubmit - это специальный action creator из redux-form
        // мы stopSubmit собмитим, говоря, что хотим прекратить собмит формы и дальше dispatch action
        // в AC нужно передать сабмит какой формы мы стопаем. Вторым параметром передаём объект
        // с проблемными свойствами для каждого fild
        // форма получит одну ошибку на всю форму
        // let action = stopSubmit("login", {_error: "Common error"});
        // возмём ошибку из ответа
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
    // });
}

// thunk creator для logout

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()
    // .then(response => {
// мы вылогинелись, кука удалилась, resultCode === 0. Должны зачистить своё состояние
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
    // });
}

export default authReducer;