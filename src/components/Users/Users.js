import React from "react";
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";

// страничка User отрисовывает Paginator и каждого юзера
let Users = ({currentPage, totalUsersCount, onPageChanged, pageSize, users, ...props}) => {
    return <div>
        <Paginator totalItemsCount={totalUsersCount} currentPage={currentPage} onPageChanged={onPageChanged}
                   pageSize={pageSize} />
        <div>
            {
                users.map(u => <User user={u}
                                     key={u.id}
                                     followingInProgress={props.followingInProgress}
                                     unfollow={props.unfollow}
                                     follow={props.follow}
                />
//                                  <div >
//                 <span>
//                     <div>
//                         <NavLink to={'/profile/' + u.id}>
//                             <img src={u.photos.small != null ? u.photos.small : userPhoto}
//                                  className={classes.userPhoto}></img>
//                         </NavLink>
//                     </div>
//                     <div>
//                         {/*При нажатии на кнопку вызывается анонимная функция. При нажатии на кнопку мы из props вызываем call back follow unfollow*/}
//                         {/*Когда по кнопке кликнут, отработает call back функция и передай id*/}
// {/* если в props будет fallowinInProgress будет true, то кнопка будет disabled */}
//                         {u.followed ? <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
//                             // Во время onClick мы вызываем что-то что приходит из props
//                             unfollow(u.id);
// // перед асинхронным запросом мы диспатчем true
//
// //                                 props.toggleFollowingProgress(true, u.id);
//                                 // axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
//                                 //     {
//                                 //         withCredentials: true,
//                                 //         headers: {"API-KEY": "716f1b8b-bc85-4d85-b00e-40338217278b"}
//                                 //     })
//                                 // вместо axios обращаемся к usersAPI
//                             // usersAPI.unfollow(u.id)
//                             //
//                             //         .then(response => {
//                             //         // если resultCode = 0, значит сервер подтвердил, что подписка произошла
//                             //         if (response.data.resultCode == 0) {
//                             //             // если подписка произошла, то мы в этом случае должны задиспатчить в reducer, вызвать call back
//                             //             props.unfollow(u.id);
//                             //         }
//                             //         props.toggleFollowingProgress(false, u.id);
//                             //     });
//
//                             }}>Unfollow</button>
//                             // когда по кнопке кликнут вызове анонимную стрелочную функцию () => { props.follow(u.id) }
//                             // внутри стрелочной функции обращение к props, из props берётся unfollow и передаётся id
//                             : <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
//                                 follow(u.id);
// //                                 props.toggleFollowingProgress(true, u.id);
// //                                 // axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {},
// //                                 //     {
// //                                 //         withCredentials: true,
// //                                 //         headers: {"API-KEY": "716f1b8b-bc85-4d85-b00e-40338217278b"}
// //                                 //     })
// //                                 usersAPI.follow(u.id)
// //                                     .then(response => {
// //                                     if (response.data.resultCode == 0) {
// //                                         props.follow(u.id);
// //                                     }
// // // по окончанию асинхронного запроса мы диспатчем false
// //                                     props.toggleFollowingProgress(false, u.id);
// //
// //                                 });
//                             }}>Follow</button>}
//                         {/*follow unfollow - это action creator. Находятся в UserContainer, где connect создал  call back функцию
//                             в которой он вызывает fallow action creator потом action creator возвращает action и потом action диспатчется*/}
//                 </div>
//                 </span>
//                 <span>
//                     <span>
//                         <div>{u.name}</div>
//                         <div>{u.status}</div>
//                     </span>
//                     <span>
//                         <div>{'u.location.country'}</div>
//                         <div>{'u.location.city'}</div>
//                     </span>
//                 </span>
//             </div>)
                )
            }
        </div>
    </div>
}

// [
//     {id: 1, photoUrl: 'https://icon-library.com/images/samurai-icon/samurai-icon-8.jpg',
//         followed: false, fullName: 'Yauheni', status: 'Hello', location: {city: 'Minsk', country: 'Belarus'}},
//     {id: 2, photoUrl: 'https://icon-library.com/images/samurai-icon/samurai-icon-8.jpg',
//         followed: true, fullName: 'Yauheni', status: 'Hello', location: {city: 'Minsk', country: 'Belarus'}},
//     {id: 3, photoUrl: 'https://icon-library.com/images/samurai-icon/samurai-icon-8.jpg',
//         followed: false, fullName: 'Yauheni', status: 'Hello', location: {city: 'Minsk', country: 'Belarus'}},
// ]

export default Users;


// <div>
//     {/*При нажатии на кнопку вызывается анонимная функция. При нажатии на кнопку мы из props вызываем call back follow unfollow*/}
//     {/*Когда по кнопке кликнут, отработает call back функция и передай id*/}
//     {u.followed ? <button onClick={() => {
//             getUnFollow(u).then(data => {
//
//                 // если resultCode = 0, значит сервер подтвердил, что подписка произошла
//                 if (data.resultCode == 0) {
//                     // если подписка произошла, то мы в этом случае должны задиспатчить в reducer, вызвать call back
//                     props.unfollow(u.id);
//                 }
//             });
//         }}>Unfollow</button>
//         // когда по кнопке кликнут вызове анонимную стрелочную функцию () => { props.follow(u.id) }
//         // внутри стрелочной функции обращение к props, из props берётся unfollow и передаётся id
//         : <button onClick={() => {
//             getFollow(u).then(data => {
//                 if (data.resultCode == 0) {
//                     props.follow(u.id);
//                 }
//             });
//         }}>Follow</button>}
//     {/*follow unfollow - это action creator. Находятся в UserContainer, где connect создал  call back функцию
//                             в которой он вызывает fallow action creator потом action creator возвращает action и потом action диспатчется*/}
// </div>