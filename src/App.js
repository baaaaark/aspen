import './App.css';
import './components/SignUpModalButton'
import { useState } from 'react';
import Feed from './components/Feed'
import TopBar from './components/TopBar';
import { SignUpModalButton } from './components/SignUpModalButton';
import Post from './components/Post';

function App() {


    return (
        <div className="App">
            <TopBar />
            <SignUpModalButton />
            <Feed />
        </div>
    );
};

export default App;
