import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you', likesCount: 12},
        {id: 2, message: 'It"s my firs post', likesCount: 11},
        {id: 3, message: 'Hi', likesCount: 11},
        {id: 4, message: 'Hello', likesCount: 11}
    ],
    // newPostText: '111',
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, newPost]
            };
        }
        // let newPost = {
        //     id: 5,
        //     message: state.newPostText,
        //     likesCount: 0
        // };
        // let stateCopy = {...state};
        // stateCopy.posts = [...state.posts];
        // stateCopy.posts.push(newPost);
        // stateCopy.newPostText = '';
        // return stateCopy;

        // case UPDATE_NEW_POST_TEXT: {
        //     return {
        //         ...state,
        //         newPostText: action.newText
        //     }
        //     // let stateCopy = {...state};
        //     // stateCopy.newPostText = action.newText;
        //     // return stateCopy
        // }
        // когда статус придёт с сервера, мы его засетаем
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        // если тип actiona SET_USER_PROFILE, то мы вернём копию ...state в котором поменяем profile на
        // profile который сидит в actione
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case DELETE_POST: {
            return {
// возвращается копия state в которой мы возмём старые посты и отфильтруем по id
// только те id, которые не равны action postId
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }
        }
        default:
            return state;
    }
}

// в action creator передаём newPostText, засовываем его в объект action
export const addPostActionCreator = (newPostText) => {
    return {
        type: ADD_POST, newPostText
    }
}

// создаём AC(функция возвращающая объект, action(объект в котором инкапсулированы данные, для того что бы
// reducer получил этот action и применил изменения на state ) ) в который приходит profile.
// SET_USER_PROFILE - названия действия (actiona). Хотим засетать юзерский профайл, reducer возмёт из экшина
export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE, profile
    }
}

// создадим AC
export const setStatus = (status) => {
    return {
        type: SET_STATUS, status
    }
}

export const deletePost = (postId) => {
    return {
        type: DELETE_POST, postId
    }
}
// заменим .then на await
export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getProfile(userId);
    // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
    // с servera приходит объект response в нём нужно свойство data
    // .then(response => {
    // весь объекст сэтаем в reduces
    dispatch(setUserProfile(response.data));
    // в props этот объект где-то должен появится, с помощье mapDispatchToProps
    // });
}

// создадим thunk
export const getStatus = (userId) => async (dispatch) => {
// в response будет сидеть результат, которым зарезолвится promise
    let response = await profileAPI.getStatus(userId)
    // .then(response => {
    dispatch(setStatus(response.data))
    // });
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    // .then(response => {
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
    // });
}

// export const deletePost = (postId) => async (dispatch) => {
//     let response = await profileAPI.delete(postId)
//             if (response.data.resultCode === 0) {
//                 dispatch(setStatus(status));
//                 }
//
// }

// export const updateNewPostTextActionCreator = (text) => {
//     return {
//         type: UPDATE_NEW_POST_TEXT, newText: text
//     }
// }

export default profileReducer;