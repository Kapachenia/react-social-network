import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you', likesCount: 12},
                {id: 2, message: 'It"s my firs post', likesCount: 11},
                {id: 3, message: 'Hi', likesCount: 11},
                {id: 4, message: 'Hello', likesCount: 11}
            ],
            newPostText: '111'
        },
        dialogsPage: {
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
                {id: 1, message: 'How is your it-kamasutra?'},
                {id: 1, message: 'Hi'},
                {id: 1, message: 'Yo'},
                {id: 1, message: 'Yep'}
            ],
            newMessageText: '222'
        }
    },
    _callSubscriber() {
        console.log('State changed');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

        this._callSubscriber(this._state);
    }
}

export default store;

window.store = store;