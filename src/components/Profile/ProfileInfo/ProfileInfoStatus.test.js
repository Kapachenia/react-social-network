import React from "react";
import { create } from "react-test-renderer";
import ProfileInfoStatus from "./ProfileInfoStatus";

describe("Button component", () => {
    // если через props компонета получает статус, то этот статус должен быть в state
    test("status from props should be in state", () => {
        // создали компонент create component
        // компонента дай getInstance - экземпляр объекта
        const component = create(<ProfileInfoStatus status="it front-end" />);
        const instance = component.getInstance();
        // берём instance и проверяем, что в статусе сть "it front-end"
        expect(instance.seamless.status).toBe("it front-end");
    });
    test("after creation input shouldn t be displayed", () => {
        // создали компонент create component
        // компонента дай getInstance - экземпляр объекта
        const component = create(<ProfileInfoStatus status="it front-end" />);
        const root = component.root;
        // когда компонента создалась мы в instance ищем span
        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    });
    test("after creation span should contains correct status", () => {
        // отрисовываем компоненту, закидываем в props status
        const component = create(<ProfileInfoStatus status="it front-end" />);
        const root = component.root;
        let span = root.findByType("span");
    // проверяем в spane внутри есть innerText, который отображает статус "it front-end"
        expect(span.children[0]).toBe("it front-end");
    });
    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileInfoStatus status="it front-end" />);
        const root = component.root;
        // нашли span
        let span = root.findByType("span");
        // сделали dubleClick на нём
        span.props.onDoubleClick();
        // span исчез и мы нашли input
        let input = root.findByType("input");
        expect(input.props.value).toBe("it front-end");
    });
    test("callback should be called", () => {
        // заготовим тестовую функцию и передадим в качетве call back в компоненту
        const mockCallback = jest.fn();
        const component = create(<ProfileInfoStatus status="it front-end" updateStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        // если компонент вызовет нашу функцию, то мы может об этом узнать
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});