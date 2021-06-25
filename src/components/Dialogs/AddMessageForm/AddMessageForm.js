import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormsControls/FormsConrols";
import React from "react";

const maxLength20 = maxLengthCreator(20)

// onSubmit - что должно выполниться, если форма засобмитится - специальный метод handleSubmit
// handleSubmit появляется из reduxForm

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={"newMessageBody"} placeholder="Enter your message" validate={[required, maxLength20]} />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export default reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);