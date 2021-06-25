import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile-reducer";
import {Redirect, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    // Sideeffe делаются в метоже жизненного цикла componentDidMount
    componentDidMount() {

        let userId = this.props.match.params.userId;
        // если у нас нет userId
        if (!userId) {
        // если вмонтировались и в параметрах ничего нет, покажи авторизированного юзера
            userId = this.props.authorizedUserId;
            // если userId не оказалось после присвоения
            if (!userId) {
                // в props у history есть метод push
                this.props.history.push("/login");
            }
        }
        this.props.getUserProfile(userId);
        // сделаем запрос за статусом и передадим userId статус которого нужно получить
        this.props.getStatus(userId);
        // usersAPI.getProfile(userId)
        // // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
        // // с servera приходит объект response в нём нужно свойство data
        //     .then(response => {
        //         // весь объекст сэтаем в reduces
        //         this.props.setUserProfile(response.data);
        //         // в props этот объект где-то должен появится, с помощье mapDispatchToProps
        //
        //     })
    }

    render() {
        // делаем редирект вместо отображения разметки
        // if (this.props.isAuth === false) return <Redirect to="/login" />;
        // другая запись с !, если не залогинен - редирект
        // перенесём редирект в AuthRedirectComponent
        // if (!this.props.isAuth) return <Redirect to="/login" />;
        return (
            // прокидываем статус дальше
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
        )
    }
}

// создадим контейнерную компонету AuthRedirectComponent над контейнерной компонентой ProfileContainer
// props перекидываем деструктуризацией в целевую компонету
// вызывает hoc с нужным параметром, передав нужную целевую компонету
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);


// над компонентой ProfileContainer делаем ещё одну с помощью connect.
// контейнерная компонента будет взаимодействовать со store

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    // информация залогинены или нет
    // isAuth: state.auth.isAuth
    // получить статус из state
    status: state.profilePage.status,
    // возмём id пользователя
    authorizedUserId: state.auth.userId,
    // авторизованы или нет
    isAuth: state.auth.isAuth
});

// вынесем isAuth из mapStateToProps
// let mapStateToPropsForRedirect = (state) => ({
// profile: state.profilePage.profile,
// информация залогинены или нет
// isAuth: state.auth.isAuth
// });

// добавим ещё один connect
// AuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent);

// withRouter венет новую компоненту,к оторая отрисует ProfileContainer, но закинутся данные из URL
// подключаем к роутору AuthRedirectComponent вместо ProfileContainer
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

// ProfileContainer оборачиваем ещё раз функцией connect
// connect получает данные от store и получает call back от store

// выполним последовательный вызов compose
export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
    // withAuthRedirect,
)(ProfileContainer);

// connect возвращает новую компоненту, которая отрисует ProfileContainer, но закинет данные из store
// поменяем ProfileContainer на WithUrlDataContainerComponent
// export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);
