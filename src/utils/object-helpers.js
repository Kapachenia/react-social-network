export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
// универсальная функция, которая вернёт новый массив в котором заменит совпадения по
// такому проперти name из объекта с таким itemId
    return items.map(u => {
        // натация через квадратные скобки
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u;
    })
}
