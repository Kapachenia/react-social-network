import React from "react";
import {Redirect} from "react-router-dom";
import Dialogs from "../components/Dialogs/Dialogs";
import {connect} from "react-redux";


// вынесем isAuth из mapStateToProps
let mapStateToPropsForRedirect = (state) => ({
    // profile: state.profilePage.profile,
    // информация залогинены или нет
    isAuth: state.auth.isAuth
});

// создадим отдельный класс обертку для каждой целевой компоненты
// withAuthRedirect конектик к store и забирает isAuth

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to="/login"/>

            return <Component {...this.props} />
        }
    }
    // законектим RedirectComponent


// добавим ещё один connect. Конектим RedirectComponent, компонету, созданную внутри hoc к store
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);
    // когда вызываем hoc withAuthRedirect возвращается две контейнерные компоненты одна в одной
    return ConnectedAuthRedirectComponent;
}

