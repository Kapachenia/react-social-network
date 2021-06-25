import React, {Suspense} from "react";
import './App.css';
import './components/Header/Header.module.css';
import './components/Navbar/Navbar.module.css';
import './components/Profile/Profile.module.css';
import './components/Profile/MyPosts/MyPosts.module.css';
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";

import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./common/Preloader/Proloader";
import store from "./redux/redux-store";
import withSuspense from "./hoc/withSuspense";

// import DialogsContainer from "./components/Dialogs/DialogsContainer";
// import ProfileContainer from "./components/Profile/ProfileContainer";
// загрузка компоненты DialogsContainer с помощью React.lazy
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component {
    // делаем запрос в App, когда всё App отрендарилась и хочет замонтироваться мы делаем запрос
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        // будем возвращать всю разметку только если мы проинициализировались в противном случае proloader
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    {/* Route - это компонента, которая следит за URL в браузере и если URL совпадает,*/}
                    {/* то она делает render. В нашем случае возвращает jsx разметку, возвращает компоненту.*/}
                    {/*Добавляем имя параметра profile/:userId. Переменная в ProfileContainer*/}
                    {/*знак ? говорит об опциональности параметра*/}
                    <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                    <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                    <Route path='/users' render={() => <UsersContainer />}/>
                    <Route path='/news' render={() => <News />}/>
                    <Route path='/music' render={() => <Music />}/>
                    <Route path='/settings' render={() => <Settings />}/>
                    <Route path='/login' render={() => <LoginPage />}/>
                </div>
            </div>
        );
    }
}

// что бы в state был app, нужно закомбайнить appReducer

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppConteiner = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp = (props) => {
    // для того что бы приложение работало на gh-pages нужно добавить basename
    // return <BrowserRouter basename={process.env.PUBLIC_URL}>
    // возми URL из окружения (enviroment). process - глобальный объект в node.js
    return <BrowserRouter>
        <Provider store = {store}>
            <AppConteiner />
        </Provider>
    </BrowserRouter>
}

// когда connect компоненту сбивается роутинг. Нужно обернуть connect withRouter
// export default withRouter(connect(null, {getAuthUserData})(App));
// для того, чтобы убрать вложеность hoc в hoc используем метод compose
// диспастчем санку initializeApp
// export default compose(
//     withRouter,
//     connect(mapStateToProps, {initializeApp}))(App);

export default SamuraiJSApp;