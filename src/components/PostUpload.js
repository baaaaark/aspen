import { useState } from 'react';
import './PostUpload.css';
import { Button } from '@material-ui/core';
import { db, auth, storage } from '../firebase.js';
import firebase from 'firebase';
import { SignUpModalButton } from './SignUpModalButton.js';


function PostUpload({username}) {
    
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (event) => {
        if(event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error)=> { // error function
                console.log(error);
                alert(error.message);
            },
            () => { // complete function
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // post image inside db
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username,
                        })

                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    })
            }

        )
    };

    return (  
        <div className="post__upload"> 
            <progress className= 'imageUpload__progress' value ={progress} max="100" />
            <input type="text" placeholder="Add a description" onChange={event => setCaption(event.target.value)} />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload} >
                Upload
            </Button>
        </div>
    )
}

export default PostUpload;
