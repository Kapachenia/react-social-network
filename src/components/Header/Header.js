import React from 'react';
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={classes.header}>
        <img src='https://i.pinimg.com/originals/7f/e1/92/7fe192806e4f48dad849363337ea0f66.png'></img>
            <div className={classes.loginBlock}>
                {/*если авторизованы, то мы покажем login и кнопку log out, в противном случае ссылку на авторизацию
                вызовем onClick и в onClick вызовем что-то, что пришло из props
                logout компоненту снабдит контейнерная компонента*/}
                { props.isAuth ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div> : <NavLink to={'/login'}>Login</NavLink> }
            </div>
        </header>
)
}

export default Header;