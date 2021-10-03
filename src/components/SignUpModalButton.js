import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { db, auth, storage } from '../firebase.js';
import { Modal } from '@material-ui/core/';
import { Button, Input } from '@material-ui/core';
import PostUpload from './PostUpload';


function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}
  
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing (2,4,3),
    },
}));

function SignUpModalButton() {

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [email , setEmail] = useState('');
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const [openSignIn, setOpenSignIn] = useState(false);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) { //if user has logged in, set them as user
                console.log(authUser);
                setUser(authUser);

                if (authUser.displayName) { //  if user already exists, then don't update username
                    
                }
                else { //if newly created user, update username
                    return authUser.updateProfile({
                        displayName: username,
                    });
                }
            }
            else { //if user has logged out
                setUser(null);
            }    
        })

            return () => { // perform some cleanup
                unsubscribe();
            }

    }, [user, username]);
  
    const signUp = (event) => {

        event.preventDefault();
        auth
            .createUserWithEmailAndPassword(email , password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                displayName: username
                })
            })
            .catch((error) => alert(error.message));

        setOpen(false);
      };
      
    const signIn = (event) => {
        event.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error)=> alert(error.message))

        setOpenSignIn(false);
    }

    return (
        <div>
            {user?.displayName ? (
                <PostUpload username={user.displayName}/>
            ) : (
                <h3>Please Log In To Post</h3>
            )}
            
            <Modal className="signup__modal__button"
            open={open}
            onClose={()=> setOpen(false)}
            >
                <div 
                    style={modalStyle} 
                    className={classes.paper}>
                    <form className = "app__signUp">
                        <center>
                            <img className="app__headerimage" alt="abc" src="https://static.abcteach.com/free_preview/l/leaf_aspen_autumn_rgb_p.png"></img>
                            <p>Signing up is super easy!  Just fill out the lines below and you're ready to go!</p>
                        </center>
                        <Input
                            type='text'
                            placeholder='username'
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                        />
                        <Input
                            type='email'
                            placeholder='email'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        <Input
                            type='password'
                            placeholder='password'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <Button type="submit" onClick={signUp}>Sign Up</Button>        
                    </form>
                </div>      
            </Modal>
            <Modal
                open={openSignIn}
                onClose={()=> setOpenSignIn(false)}>
                <div style={modalStyle} className={classes.paper}>
                    <form className = "app__signUp">
                        <center>
                            <img className="app__headerimage" alt="abc" src="https://static.abcteach.com/free_preview/l/leaf_aspen_autumn_rgb_p.png"></img>
                        </center>
                        <Input
                            type='email'
                            placeholder='email'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        <Input
                            type='password'
                            placeholder='password'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <Button type="submit"   onClick={signIn}>Sign In</Button>
                </form>
            </div>
            
            </Modal>
            {user ? (
                <Button onClick = { () => auth.signOut() }>Logout</Button>
            ): ( 
                <div>
                    <Button onClick = { () => setOpen(true) }>Sign Up</Button>
                    <Button onClick = { () => setOpenSignIn(true) }>Sign In</Button>
                </div>
            )}
            
            
        </div>
    );
};

export { useStyles, SignUpModalButton };
