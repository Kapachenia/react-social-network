import React from "react";
import s from "./FormsControls.module.css";
import {required} from "../../utils/validators/validators";
import {Field} from "redux-form";


// из props достаём input и meta и деструктуризируем оставшиеся props
// для этого используем рест оператор. props содержать всё, кроме input и meta
export const FormControl = ({input, meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        // если ошибка есть покажи hasError, иначе приплюсуй пустую строку
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            {/*Все props,к оторые пришли в нас необходимо отдать textarea*/}
            <div>
                {children}
            </div>
            {/*в meta сидит свойство error
            Проверка на то, что был ли этот элемент тронут и meta error тогда верни span
            текст ошибки, окторый вернул один из валидаторов сидит в meta.error*/}
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

// функция, которая будет возврощать Field в коспоненту login
// если props может не быть, по умолчанию пустой объект
// если текста не будет, то пустая строка, если текст есть отобразим рядом с Field
export const createField = (placeholder, name, validators, component, props = {}, text = "") => (

        <div>
            <Field name={name} placeholder={placeholder}
                   component={component} validate={validators} {...props} /> {text}
        </div>

)
