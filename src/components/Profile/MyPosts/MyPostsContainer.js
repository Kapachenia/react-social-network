import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import MyPosts from "./MyPosts";

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        // принимает значение поста. newPostText передадим в action creator
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText));
        },
        // updateNewPostText: (text) => {
        //     let action = updateNewPostTextActionCreator(text);
        //     dispatch(action);
        // }
    }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;