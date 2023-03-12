import React from 'react';
import {Provider} from "react-redux";
import store from "./store";
import Spotify from './Spotify/Spotify/Spotify'
import {Route, Routes} from "react-router-dom";

const SpotifyWrapper = () => {

    return (
        <Provider store={store}>
            <Routes>
                <Route path="" element={<Spotify/>} />
                <Route path="/playlist/:playlistName" element={<Spotify/>}/>
            </Routes>
        </Provider>
    );
};

export default SpotifyWrapper;
