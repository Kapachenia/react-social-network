import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reduser";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer";

// reducer - это чистая функция, которая принимает старый state, action, если нужно, можифицирует старый state,
// возвращает модифицоронный, или старый, если не нужно было его менять.
// добавляем formReducer.
let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

// для работы придлжения Redux DevTools добавляем перед созданием stora
// composeEnhancers добавит ещё applyMiddleware для перехвата dispatch
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

// applyMiddleware - принять промежуточные слои
// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window._store_ = store;

export default store;