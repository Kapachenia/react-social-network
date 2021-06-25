import React from 'react';

// class нужны для создания однопитных объектов. Когда React видит, что пытаются отрисовать
// классовую компоненту, React создаёт объект для этой классовой компоненты. Объект хранится в памяти.
// По этому в классовой компоненте есть свой локальный state, а в функциональной компоненте его нет.

// переделаем классовую компоненту в функциональную ProfileStatusWithHooks с помощью hook
class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        // status, локальный state возми своё начальное значение из приходящих props
        // из props взялся статус и засетался в state
        status: this.props.status
    }

    // в функциональной компоненте мы создаём функцию, в классовой компонете - метод

    activateEditMode = () => {
        // setState() метод из React.Component. В this.setState() мы должны передать объект,
        // свойство которого перезапишут те свойство, которые были в state
        // console.log(this.state.editMode);
        // console.log("this:", this);
        this.setState({
            // меняем EditMode на true
            editMode: true
        });
        // console.log(this.state.editMode);
    }

    // setState асинхронен. Не моментально поменяет state, а когда будет очередной цикл асинхронного запуска

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e) => {
        // можем узнать новое значение и засетать в качестве стуса локального state
        // в state меняем только status, по этому в setState мы передаём объект со свойством status
        // новое его значение e.currentTarget.value;
        this.setState({
            status: e.currentTarget.value
        });

    }

    // коспонета перерисовывается извне и новые props внедряются либо компонента перерисовывается, когда меняется локальный state
    componentDidUpdate(prevProps, prevState) {
        // если в предыдущих props статус был такой, который не равен статусу в текущих props
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
        // console.log("componentDidUpdate")
    }

    render() {
        console.log("render")
        return (
            <div>
                {/*если не editMode - покажи span, если editMode - покажи input*/}
                {!this.state.editMode &&
                <div>
                    {/*отображает то что приходит в props. В span и */}
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || "------"}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    {/*статус берём из локального state*/}
                    {/*если value зафиксировану необходимо вешать onChange*/}
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode}
                           value={this.state.status}/>
                </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;