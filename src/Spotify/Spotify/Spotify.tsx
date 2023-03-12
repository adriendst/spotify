import React from "react";
import LeftSection from "../LeftSection/LeftSection";
import {useDispatch, useSelector} from "react-redux";
import {
    addPlaylist,
    displayPlaylistMenu,
    displayPlaylistModal,
} from "../../Slices/playlistsSlice";
import PlaylistModal from "../PlaylistModal/PlaylistModal";
import {State} from "../../store";
import {useParams} from "react-router-dom";
import Home from "../Home/Home";
import Playlist from "../Playlist/Playlist";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import './Spotify.css'

const Spotify = () => {
    const dispatch = useDispatch()

    const playlistMenuVisble = useSelector((state: State) => state.spotify.playlistMenu.visible)

    const {playlistName} = useParams()

    const handleOnSavePlaylist = (name: string) => {
        dispatch(addPlaylist(name));
        handleOnClosePlaylist()
    };

    const handleOnNewPlaylist = () => {
        dispatch(displayPlaylistModal(true))
    };

    const handleOnClosePlaylist = () => {
        dispatch(displayPlaylistModal(false))
    };

    const removePlaylistMenu = () => {
        if (playlistMenuVisble)
            dispatch(displayPlaylistMenu({
                visible: false, x: 0, y: 0, song: {
                    title: '',
                    artist: '',
                    genre: '',
                    year: 0,
                    duration: 0,
                    popularity: 0,
                }
            }))
    };
    return <div className={'app'} onClick={removePlaylistMenu}>
        <LeftSection
            onNewPlaylist={handleOnNewPlaylist}
        />

        <PlaylistModal
            onClosePlaylist={handleOnClosePlaylist}
            onSavePlaylist={handleOnSavePlaylist}
        />
        <div className={'Spotify'}>
            {playlistName ? (
                <Playlist playlistName={playlistName}/>
            ) : (
                <Home/>
            )}

        </div>
        <MusicPlayer/>


    </div>
}

export default Spotify;
