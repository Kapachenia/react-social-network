import React from "react";
import {createSelector} from "reselect";

// селектор - это функция, которая принимает весь state целиком и возвращает часть state

const getUsersSelector = (state) => {
    return state.usersPage.users;
}

// создадим селектор с помощью библиотеки reselect, специальной функции createSelector
// createSelector специальная функция,к оторая возвращает селектор, внутрь селектора передаём функцию,
// которая будет выбирать что-то из state
// первым параметром передаём тот селектор, который будет использоваться для получения значений
export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true);
})

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
}

export const countSomethingDifficult = (state) => {
    debugger;
    let count = 23;
    return count;
}