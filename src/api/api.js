import React from "react";
import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    // базовый URL будет автоматически приклеиваться к строке
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "716f1b8b-bc85-4d85-b00e-40338217278b"}
});


// функция получит данные от того, кто будет её вызывать
// axios возвращает promise
// return promise, который возвращается не методом .get, а в then из response
// берём data и её возвращаем. Ретурнем то, что вернул then, а он возвращает другой promise

// export const getUsers = (currentPage = 1, pageSize = 10) => {
//     return instance.get(`users?page=${currentPage}&
//             count=${pageSize}`).then(response => response.data);


// вспомогательный объект для групировки методов
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data;
        });

    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId) {
        console.warn('Please use profileAPI')
        // если обратиться к методу getProfile, то мы перенаправим на profileAPI передав туда userId
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`);
        // необходимо сделать return, потому что .get возвращает promise, мы на этот promise
        // подписываемся .then и этот .then после подписки возвращает другой promise
    },
    getStatus(userId) {
        // делаем get запрос за статусом
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status) {
        // вторым параметром отправлчем объект у котого есть свойство status
        return instance.put(`profile/status`, {status: status});
    }
}

export const authAPI = {
    // возвращает promise, используется в auth-reducer
    me() {
        return instance.get('auth/me');
    },
    // для put и для post есть возможжность в запрос полодить объект
    login(email, password, rememberMe = false) {
// вторым параметром отправляем данные { email, password, rememberMe }
        return instance.post(`auth/login`, { email, password, rememberMe });
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}

