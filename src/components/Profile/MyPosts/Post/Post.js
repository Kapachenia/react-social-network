import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {

    return (
        <div className={classes.item}>
            <img src='https://st2.depositphotos.com/1981013/7098/v/600/depositphotos_70983973-stock-illustration-samurai-man.jpg'></img>
            { props.message }
            <div>
                <span>like</span> { props.likesCount }
            </div>
        </div>
    )
}

export default Post;