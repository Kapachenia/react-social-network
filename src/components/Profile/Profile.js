import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
// Profile прокидывает props.profile через props в ProfileInfo. props пришли через ProfileContainer
    return (
        <div>
            <ProfileInfo profile = {props.profile} status={props.status} updateStatus={props.updateStatus} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;