
import React, { useState, useEffect } from 'react';
import Post from './Post.js';
import { db, auth, storage } from '../firebase.js';

function Feed(){

    const [posts, setPosts] = useState([]);

    // This allows the created database 'db' to be put into a collection.  
    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => {
            setPosts(
                snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })));
        })
    }, []);

    return (
        <div className="app__posts">
            {posts.map(({id, post}) => (
                <Post 
                key={ id } 
                username={ post.username } 
                caption={ post.caption } 
                imageUrl={ post.imageUrl }
                />
            ))}
        </div>
    );
};
    
export default Feed;
    
