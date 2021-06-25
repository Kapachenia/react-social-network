import React from "react";
import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';

let initialState = {
    users: [],
    // количество пользователей на странице
    pageSize: 10,
    totalUsersCount: 0,
    // текущая страница
    currentPage: 1,
    isFetching: true,
    // в массив будем помещать id пользователя, которого follow
    followingInProgress: [],
    fake: 10

};

// reducer - это функция, через которую идёт модификация state

// UI может меняться от изменёного state. пользователь жмёт кнопку, мы dispatch action в state,
// reducer этот action обрабатывает, state меняется и идёт перерисовка UI.

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
// Меняем один из элементов массива.
// .map возвращает новый массив на основе старого массива. Пробегаем по массиву users

// проходим по id, возвращаем его, если не поменялся, если его нужно поменять, то меняем false на true
            return {
// вынесем чать логики в object-helpers
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
//                 users: state.users.map(u => {
// // если userID пробегаемого с помощью .map равен userID, которого нужно зафоловить (он сидит в action),
// // то мы должны скопировать пользователя, поменять followed на true и вернуть его копию
//                     if (u.id === action.userId) {
//                         return {...u, followed: true}
//                     }
//                     return u;
//                 })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
//                 users: state.users.map(u => {
// // если userID пробегаемого с помощью .map равен userID, которого нужно зафоловить (он сидит в action),
// // то мы должны скопировать пользователя, поменять followed на true и вернуть его копию
//                     if (u.id === action.userId) {
//                         return {...u, followed: false}
//                     }
//                     return u;
//                 })
            }
// старый state перезатираем users, которые пришли через action
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            // меняем currentPage на тот currentPage, который сидит в action
            return {...state, currentPage: action.currentPage}
        }
        // делаем копию state и подменяем те свойства, которые нужно заменить users, currentPage, totalUsersCount
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
// делаем копию массива и, если в action приходит false, то мы говорим,
// что загрузка завершилась, нам нужно из массива удалить id
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state;

    }
}

// action creator - чистая функция, которая возвращает action

export const followSuccess = (userId) => ({type: FOLLOW, userId})

export const unfollowSuccess = (userId) => {
    return {type: UNFOLLOW, userId}
}
// юзеров получаем из вне и можем засетать
export const setUsers = (users) => {
    return {type: SET_USERS, users}
}
// можем изменить текущую страничку
export const setCurrentPage = (currentPage) => {
    return {type: SET_CURRENT_PAGE, currentPage}
}
// установить общее значение пользователей
export const setTotalUsersCount = (totalUsersCount) => {
    return {type: SET_TOTAL_USERS_COUNT, count: totalUsersCount}
}
// action - это объект у которого есть как минимум свойство type, а так же свойства, которые нужны reduserу для обработки actiona
// reducer из actiona достаёт isFetching (action.isFetching), мы должны это свойство сформировать. Формируем isFetching
export const toggleIsFetching = (isFetching) => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
}
export const toggleFollowingProgress = (isFetching, userId) => {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId}
}

// создадим thunk - это функция которая внутри себя диспатчет обычные action
// принимает функцию dispatch
// создадим requestUsers ThunkCreator - функкция, которая может что-то принимать и возвращает Thunk
// вызов ThunkCreator создаст Thunk. Сможет достучаться до currentPage и pageSize, которые кто-то передаст в ThunkCreator
export const requestUsers = (page, pageSize) => {
// делаем thunk асинхронной
// thunk - внутренняя функция
    return async (dispatch) => {
        // перед запросом на сервер добавляем вызов toggleIsFetching
        dispatch(toggleIsFetching(true));
        // запрашиваем и dispatch setCurrentPage для подсветки выбранной страницы
        dispatch(setCurrentPage(page));
    // getUsers находится в api.js
    // .then - когда пользователи будут получины, можно обработать данные
    // вместо .then(response) => .then(data)
    let data = await usersAPI.getUsers(page, pageSize);
        // .then(data => {
        // когда приходит ответ от сервера toggleIsFetching = false
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        // из компоненты UI отправляем в state, для этого нужен call back. call back передают через props
        // call back, который меняет что-то в state к нам приходит через mapDispatchToProps
        dispatch(setTotalUsersCount(data.totalCount));
    // });
}
}

// зарефакторим follow и unfollow. Создадим общую функцию
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);

    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
    }
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
    }
}

// export const follow = (userId) => {
//     return async (dispatch) => {
//         dispatch(toggleFollowingProgress(true, userId));
//         // axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {},
//         //     {
//         //         withCredentials: true,
//         //         headers: {"API-KEY": "716f1b8b-bc85-4d85-b00e-40338217278b"}
//         //     })
//         let response = await usersAPI.follow(userId);
//             // .then(response => {
//                 if (response.data.resultCode == 0) {
//                     dispatch(followSuccess(userId));
//                 }
// // по окончанию асинхронного запроса мы диспатчем false
//                 dispatch(toggleFollowingProgress(false, userId));
//
//             // });
//     }
// }
//
// export const unfollow = (userId) => {
//     return async (dispatch) => {
//         dispatch(toggleFollowingProgress(true, userId));
//         // axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {},
//         //     {
//         //         withCredentials: true,
//         //         headers: {"API-KEY": "716f1b8b-bc85-4d85-b00e-40338217278b"}
//         //     })
//         let response = await usersAPI.unfollow(userId);
//             // .then(response => {
//                 if (response.data.resultCode == 0) {
//                     dispatch(unfollowSuccess(userId));
//                 }
// // по окончанию асинхронного запроса мы диспатчем false
//                 dispatch(toggleFollowingProgress(false, userId));
//             // });
//     }
// }


export default usersReducer;