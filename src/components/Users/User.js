import React from "react";
import classes from './Users.module.css';
import userPhoto from '../../assets/images/user.jpg';
import {NavLink} from "react-router-dom";
import Paginator from "../../common/Paginator/Paginator";

let User = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small != null ? user.photos.small : userPhoto}
                                 className={classes.userPhoto}></img>
                        </NavLink>
                    </div>
                    <div>
                        {/*При нажатии на кнопку вызывается анонимная функция. При нажатии на кнопку мы из props вызываем call back follow unfollow*/}
                        {/*Когда по кнопке кликнут, отработает call back функция и передай id*/}
                        {/* если в props будет fallowinInProgress будет true, то кнопка будет disabled */}
                        {user.followed ?
                            <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                // Во время onClick мы вызываем что-то что приходит из props
                                unfollow(user.id);
// перед асинхронным запросом мы диспатчем true

//                                 props.toggleFollowingProgress(true, user.id);
                                // axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
                                //     {
                                //         withCredentials: true,
                                //         headers: {"API-KEY": "716f1b8b-bc85-4d85-b00e-40338217278b"}
                                //     })
                                // вместо axios обращаемся к usersAPI
                                // usersAPI.unfollow(user.id)
                                //
                                //         .then(response => {
                                //         // если resultCode = 0, значит сервер подтвердил, что подписка произошла
                                //         if (response.data.resultCode == 0) {
                                //             // если подписка произошла, то мы в этом случае должны задиспатчить в reducer, вызвать call back
                                //             props.unfollow(user.id);
                                //         }
                                //         props.toggleFollowingProgress(false, user.id);
                                //     });

                            }}>Unfollow</button>
                            // когда по кнопке кликнут вызове анонимную стрелочную функцию () => { props.follow(user.id) }
                            // внутри стрелочной функции обращение к props, из props берётся unfollow и передаётся id
                            : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                follow(user.id);
//                                 props.toggleFollowingProgress(true, user.id);
//                                 // axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {},
//                                 //     {
//                                 //         withCredentials: true,
//                                 //         headers: {"API-KEY": "716f1b8b-bc85-4d85-b00e-40338217278b"}
//                                 //     })
//                                 usersAPI.follow(user.id)
//                                     .then(response => {
//                                     if (response.data.resultCode == 0) {
//                                         props.follow(user.id);
//                                     }
// // по окончанию асинхронного запроса мы диспатчем false
//                                     props.toggleFollowingProgress(false, user.id);
//
//                                 });
                            }}>Follow</button>}
                        {/*follow unfollow - это action creator. Находятся в UserContainer, где connect создал  call back функцию
                            в которой он вызывает fallow action creator потом action creator возвращает action и потом action диспатчется*/}
                </div>
                </span>
            <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{'user.location.country'}</div>
                        <div>{'user.location.city'}</div>
                    </span>
                </span>
        </div>)
}

// [
//     {id: 1, photoUrl: 'https://icon-library.com/images/samurai-icon/samurai-icon-8.jpg',
//         followed: false, fullName: 'Yauheni', status: 'Hello', location: {city: 'Minsk', country: 'Belarus'}},
//     {id: 2, photoUrl: 'https://icon-library.com/images/samurai-icon/samurai-icon-8.jpg',
//         followed: true, fullName: 'Yauheni', status: 'Hello', location: {city: 'Minsk', country: 'Belarus'}},
//     {id: 3, photoUrl: 'https://icon-library.com/images/samurai-icon/samurai-icon-8.jpg',
//         followed: false, fullName: 'Yauheni', status: 'Hello', location: {city: 'Minsk', country: 'Belarus'}},
// ]

export default User;


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