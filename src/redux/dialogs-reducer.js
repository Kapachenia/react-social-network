import React from "react";

const ADD_MESSAGE = 'ADD-MESSAGE';
// const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
    dialogs: [
        {id: 1, name: 'Dimych',},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-kamasutra?'},
        {id: 3, message: 'Hi'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yep'}
    ]
    // newMessageText: '222'
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
// будет брать текст не из state, а из action
            let text = action.newMessageBody;
            return  {
                ...state,
                // newMessageText: '',
// создаём новый массив.
// ...state.messages - закидывает элементы из старого messages
// {id: 6,message: text} - дописываем ещё один элемент
                messages: [...state.messages, {id: 6,message: text}]
            }
        // case UPDATE_NEW_MESSAGE_TEXT:
// создаём объект. Разворачиваем старый объект, заполняем старыми значениями,
// создаём новое (перезатираем конкретное свойство newMessageText)
//             return {
//                 ...state,
//                 newMessageText: action.newText
//             }
        default:
            return state;
    }
}

// newMessageBody -сообщение упадёт в action
export const addMessageActionCreator = (newMessageBody) => {
    return {
        type: ADD_MESSAGE, newMessageBody
    }
}

// action для обновления нажатия на клавиши
// export const updateNewMessageText = (text) => {
//     return {
//         type: UPDATE_NEW_MESSAGE_TEXT, newText: text
//     }
// }

export default dialogsReducer;