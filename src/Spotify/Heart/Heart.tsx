import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import {addSongToPlaylist, removeSongFromPlaylist} from "../../Slices/playlistsSlice";
import './Heart.css'

interface Song {
    title: string,
    artist: string,
    genre: string,
    year: number,
    duration: number,
    popularity: number,
}

export interface HeartInterface {
    song: Song;
}

const Heart = ({song}: HeartInterface) => {
    const likedSongs = useSelector((state: State) => state.spotify.playlists[0]);
    const dispatch = useDispatch()
    const checkIfLicked = (song: Song) => {
        // const likedSongStrings = likedSongs.songs.map((likedSong) => JSON.stringify(likedSong, null, 2));
        // const songString = JSON.stringify(song, null, 2);
        return likedSongs.songs.includes(song);
    }
    return (<div>
        {!checkIfLicked(song) ?
            <img src={'/UnlikedHeart.png'} alt={'UnlikedHeart'} className={'UnlikedHeart'} onClick={(event) => {
                event.stopPropagation()
                dispatch(addSongToPlaylist([song, "Liked Songs"]))
            }}/> : <img src={'/LikedHeart.png'} alt={'LikedHeart'} onClick={(event) => {
                event.stopPropagation()
                dispatch(removeSongFromPlaylist([song, "Liked Songs"]))
            }}/>}
    </div>)
}

export default Heart
