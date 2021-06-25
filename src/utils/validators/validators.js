import React from "react";

export const required = (value) => {
    if (value) return undefined;
    return "Field is required";
}

// функция, которая возвращает другую функцию
// функция возврощает другую функцию и эта внутреняя функция получает доступ
// к переменным данным, которые находятся в функции родительской
export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
}
