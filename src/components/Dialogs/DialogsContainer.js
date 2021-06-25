import React from 'react';
import {addMessageActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

// замапить state на props. Превратить часть state в props
// настраивает данные, которые мы возмём из state

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
        // достать из state информацию залогинены мы или нет
        // isAuth: state.auth.isAuth
    }
};

// настраивает call back, которые мы будем отправлять в презентационнуб компоненту

let mapDispatchToProps = (dispatch) => {
    return {
        // updateNewMessageText отправляем в контейнер Dialogs
        // updateNewMessageText: (text) => {
            // диспатчим action, который пришёл из action creator
            // dispatch(updateNewMessageText(text));
            // },
// запускаем ActionCreator, он возвращает action (объект у которого есть как min type)
// и dispatch то, что вернул ActionCreator (диспатчим action)
// newMessageBody - сформированное текстовое сообщение
        addMessage: (newMessageBody) => {
            dispatch(addMessageActionCreator(newMessageBody));
        }
    }
};

// isAuth произойдёт в withAuthRedirect
// let AuthRedirectComponent = withAuthRedirect(Dialogs);

// connect создаёт контейнерную компоненту, внутри контейнерной компоненты она рендерит презентационную компоненту и
// внутрь презентационной компоненты в качестве props передаёт те свойства, которые седят в 2-х объектах

// в первую функцию connect засунит state во вторую засунит distatch
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

// выполним последовательный вызов Dialogs, withAuthRedirect, connect

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);