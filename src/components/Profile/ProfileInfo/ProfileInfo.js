import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from "../../../common/Preloader/Proloader";
import ProfileStatus from "./ProfileInfoStatus"
import ProfileStatusWithHooks from "./ProfileInfoStatusWithHooks";

const ProfileInfo = ({profile, status, updateStatus}) => {
    // показывает preloader, если profile нет. profile загружен контейнерной компонентой Profile
    if (!profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={classes.profile_ava}>
                <img src='https://montegrappa.com.ua/wp-content/uploads/2019/03/Samurai-Banner-1200x400.png'></img>
            </div>
            <div className={classes.descriptionBlok}>
                {/*src достанем из профиля*/}
                {/*когда показыем profile статус есть и props и state синхронизированы*/}
                <img src={profile.photos.large}/>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />

            </div>
        </div>
    )
}

export default ProfileInfo;