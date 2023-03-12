import React from 'react';
import {useSelector} from "react-redux";
import {State} from "../../store";
import PlaylistCard from "../PlaylistCard/PlaylistCard";
import TopPlaylistCard from "../TopPlaylistCard/TopPlaylistCard";
import './Home.css'

const Home = () => {
    const playlists = useSelector((state: State) => state.spotify.playlists);
    const topPlaylists = useSelector((state: State) => state.spotify.topPlaylists);
    return (
        <div className={'Home'}>
            <div>
                <div className={'playlistTitle'}>Your playlists</div>
                <div className={'playlists'}>
                    {playlists.map((playlist,index) => {
                        return (
                            <PlaylistCard playlist={playlist} key={index}/>
                        );
                    })}
                </div>
            </div>
            <div>
                <div className={'topPlaylistTitle'}>TOP 50</div>
                <div className={'topPlaylists'}>
                    {topPlaylists.map((playlist, index) => {
                        return (
                            <TopPlaylistCard playlist={playlist} key={index}/>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;
