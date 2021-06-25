import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";

// profileReducer функция, мы её вызываем, передаём state, action и получим newState
// и проверим, что при передам старом state мы получаем newState такой как мы ожидаем получить

let state = {
    posts: [
        {id: 1, message: 'Hi, how are you', likesCount: 12},
        {id: 2, message: 'It"s my firs post', likesCount: 11},
        {id: 3, message: 'Hi', likesCount: 11},
        {id: 4, message: 'Hello', likesCount: 11}
    ]
};

// название теста, что тестируем и передаём call back
test('length of posts should be incremented', () => {
// формируем action и его диспатчем
    let action = addPostActionCreator('rrrrrr');
// redux передаёт в reducer старый state и action
// передадим старый state
// вынесли за пределы теста
//     let state = {
//         posts: [
//             {id: 1, message: 'Hi, how are you', likesCount: 12},
//             {id: 2, message: 'It"s my firs post', likesCount: 11},
//             {id: 3, message: 'Hi', likesCount: 11},
//             {id: 4, message: 'Hello', likesCount: 11}
//         ]
//     };
// делаем action со стартовыми параметрами
    let newState = profileReducer(state, action);
// после dispatch action делаем проверку. Нам должен вернуться action у которого будет 5 постов
// проверка делается с помощью специальных функций
// newState.posts.length === 5;
// ожидаем, что значение переданное внутрь expect будет = 5
    expect(newState.posts.length).toBe(5);
    // expect(newState.posts[4].message).toBe("rrrrrr");
});

test('message of new post should be correct', () => {
    let action = addPostActionCreator('rrrrrr');
    let newState = profileReducer(state, action);
    expect(newState.posts[4].message).toBe('rrrrrr')
});

test(`after deleting length shouldn't be decrement if id is incorrect`, () => {
    let action = deletePost(1);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(3);
});
