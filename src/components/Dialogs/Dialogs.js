import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from 'redux-form';
import {Textarea} from "../../common/FormsControls/FormsConrols";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import AddMessageForm from "./AddMessageForm/AddMessageForm";

const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogElements = state.dialogs.map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/>);

    let messagesElements = state.messages.map(message => <Message message={message.message} key={message.id}/>);

    // let addMessage = () => {
    //     props.addMessage();
    // }

    // обработчик события на нажатие на каждый символ
    // let onMessageChange = (e) => {
    //     let text = e.target.value;
    //     // call back пришёл из DialogsContainer
    //     props.updateNewMessageText(text);
    // }
// свойство такое же как name у Field
    let addNewMessage = (values) => {
        // alert(values.newMessageBody);
        // в обработчике вызовем addMessage() и передадим текстовое сообщение values.newMessageBody;
        // addMessage приходит в props в Dialogs из контейнерной компоненты благодоря mapDispatchToProps
        // props.addMessage(values.newMessageBody);
    // alert(values.newMessageBody)
        props.addMessage(values.newMessageBody);
    }

    if (props.isAuth == false) return <Redirect to={"/login"}/>;
    // другая запись с !, если не залогинен - редирект
    if (!props.isAuth) return <Redirect to={"/login"}/>;

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
{/* onSubmit - когда форма засобмитится вызови addNewMessage */}
            </div>
            <AddMessageForm onSubmit={addNewMessage} />
        </div>
    )
}

// const maxLength20 = maxLengthCreator(20)

// onSubmit - что должно выполниться, если форма засобмитится - специальный метод handleSubmit
// handleSubmit появляется из reduxForm

// вынесли в AddMessageForm
// const AddMessageForm = (props) => {
//     return (
//         <form onSubmit={props.handleSubmit}>
//             <div>
//                 <Field component={Textarea} name={"newMessageBody"} placeholder="Enter your message" validate={[required, maxLength20]} />
//             </div>
//             <div>
//                 <button>Send</button>
//             </div>
//         </form>
//     )
// }
//
// const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);

export default Dialogs;