import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyADtuHnr35vTclViPSC1PKKSaz7r849SyY",
    authDomain: "aspen-9dda6.firebaseapp.com", 
    databaseURL: "https://aspen-9dda6-default-rtdb.firebaseio.com",    
    projectId: "aspen-9dda6",    
    storageBucket: "aspen-9dda6.appspot.com",    
    messagingSenderId: "600393408710",   
    appId: "1:600393408710:web:af670c3b38c7b0414ab7c7",   
    measurementId: "G-CHS0Q9TT5T"
    
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();


export { db, auth, storage };