import React from "react";
import Header from "./Header";
import {logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";

class HeaderContainer extends React.Component {
// компонента вмотрирована
// переносим в App.js
//     componentDidMount() {
//делаем ajax запрос
// передаём вторым параметром объект для настройки запроса. { withCredentials: true }
        // .me вернёт результат отработки метода .get
        // this.props.getAuthUserData();
        // authAPI.me()
//            .then(response => {
// // проверка response.data.resultCode === 0 - если 0, то мы залогинены
// // и в этом случае мы должны задиспатчик авторизационные данные, которые возмём из response.data.data.login
// // в response сидит data, стандартная axios структура
//            if (response.data.resultCode === 0) {
//                let {id, login, email} = response.data.data;
//                this.props.setAuthUserData(id, email, login);
// // авторизационные данные придут в reducer
//            }
//        });
//     }

    render() {
// пробрасываем все props
        return <Header {...this.props} />
    }
}

// обернём HeaderContainer ещё одной контейнерной компонентой которую нам возвращает connect
// функция принимающая state и возвращающая объект
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
    // данные попадут в <Header/>
});
// setAuthUserData находится в auth-reducer
// добавляем logout - это thunk creator для вылогиневания
// когда logout попадёт в контейнерную компоненту connect создаст обёртку над thunk creator
export default connect(mapStateToProps, {logout})(HeaderContainer);
// setAuthUserData - объект, которые содержит action creator, который содержится в auth-reducer
