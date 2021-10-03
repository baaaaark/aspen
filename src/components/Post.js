import React from 'react';
import './Post.css';
import { Avatar } from '@material-ui/core';

function Post({ username, caption, imageUrl }) {
    return (
        <div className="post">
            <header className="post__header">
                <Avatar className="post__avatar"
                    src=""
                    alt=""
                /> 
                <h2> { username }</h2>
            </header>
            
            <img className="post__image" 
                src={ imageUrl }
                alt="" />
            <p> <strong> { username } </strong> { caption } 
            </p>
        </div>
    );
};

export default Post;
