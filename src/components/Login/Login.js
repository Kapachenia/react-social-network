import React from 'react';
import {Field, reduxForm} from 'redux-form'
import {createField, Input} from "../../common/FormsControls/FormsConrols";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import s from "./../../common/FormsControls/FormsControls.module.css";

const LoginForm = ({handleSubmit, error}) => {
    // console.log('rerender')
    return (
        <form onSubmit={handleSubmit}>
            {createField("Email", "email", [required], Input)}
            {createField("Password", "password", [required], Input, {type: "password"})}
            {createField(null, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

            {error && <div className={s.formSummaryError}>
                {error}</div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

// название формы, которую мы обернули hoc
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

// в formData придут все значение из формы
const Login = (props) => {
    const onSubmit = (formData) => {
        // onSubmit приходит вся форма
        // залогинелись и должны отправить на сервер данные
        // создадим thunk в auth-reducer и её задача будет логинеться
        // из props вызываем login. login приходит из connect
        // здесь login будет call back, который внутри себя dispatch вызов thunk creator
        // call back принимает параметры email, password, rememberMe и потом диспатчет
        // вызов thunk creator и в thunk creator передаются те же параметры, что и в call back
        // из props вызываем login, login к нам приходит благодаря connect
        props.login(formData.email, formData.password, formData.rememberMe);
    }
// если в props придёт isAuth, значат залогинены и идём /profile
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
// если не залогинены идём сюда
    return <div>
        <h1>Login</h1>
        {/*reduxForm собрали данные и собмитим*/}
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

// в mapDispatchToProps можем закинуть ссылки thunk creators
// connect создаст call back обёртки и мы получим call back отдельно, который dispatch вызов
// thunk creator
// login - здесь thunk creator
// mapStateToProps это функция, которая принимает state и возвращает из state то что нам нужно
const mapStateToPropsAuth = (state) => ({
// нам нужен isAuth, который лежит в state в redux-store в combineReducers
    isAuth: state.auth.isAuth
})
export default connect(mapStateToPropsAuth, {login})(Login);