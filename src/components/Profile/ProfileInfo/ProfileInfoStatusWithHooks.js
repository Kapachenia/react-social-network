import React, {useEffect, useState} from 'react';

// class нужны для создания однопитных объектов. Когда React видит, что пытаются отрисовать
// классовую компоненту, React создаёт объект для этой классовой компоненты. Объект хранится в памяти.
// По этому в классовой компоненте есть свой локальный state, а в функциональной компоненте его нет.

const ProfileStatusWithHooks = (props) => {
    // useState функция, возвращает массив из двух элементов начальное значение делаем false,
    // оно будет первым элементом. Вторым элементом будет функция, которая будет изменять первое значение
    // let stateWithSetState = useState(true);
    // от editMode зависит показывание разметки
    // let editMode = stateWithSetState[0];
    // let setEditMode = stateWithSetState[1];
    // Деструктуризация массива
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    // useEffect - hook запускает какой-то эффект, функцию после того как всё
    // отрисуется и покажется на экране. useEffect запустится, когда придёт новый status
    useEffect(() => {
        setStatus(props.status);
    }, [props.status] );

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        // можем узнать новое значение и засетать в качестве стуса локального state
        // в state меняем только status, по этому в setState мы передаём объект со свойством status
        // новое его значение e.currentTarget.value;
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {/*если не editMode - покажи span, если editMode - покажи input*/}
            {/*{!this.state.editMode &&*/}
            {/*если не editMode показывай div*/}
            { !editMode &&
            <div>
                {/*отображает то что приходит в props. В span и */}
                {/*при double click на span переключать локальный статус с false на true*/}
                {/*что бы показался input вместо span*/}
                <span onDoubleClick={ activateEditMode }>{props.status || "------"}</span>
            </div>
            }
            {/*{this.state.editMode &&*/}
            {/*если editMode показывай div*/}
            { editMode &&
            <div>
                {/*статус берём из локального state*/}
                {/*если value зафиксировану необходимо вешать onChange*/}
                <input onChange={ onStatusChange } autoFocus={true}
                       onBlur={ deactivateEditMode } value={ status } />
            </div>
            }
        </div>
    )
}


export default ProfileStatusWithHooks;