import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import {addSongToPlaylist} from "../../Slices/playlistsSlice";
import './ContextualMenu.css'

const ContextualMenu = () => {
    const dispatch = useDispatch()
    const playlists = useSelector((state: State) => state.spotify.playlists.filter(({name}) => name !== 'Liked Songs'));
    const menu = useSelector((state: State) => state.spotify.playlistMenu);

    return (<div
            className={'ContextualMenu'} style={{
            display: menu.visible ? 'block' : 'none',
            left: `${menu.x}px`,
            top: `${menu.y}px`,
        }}>
            <div className={'playlist'}>Add to Playlist</div>
            <ul>
                {playlists.map(({name}, index) => {
                    return (
                        <li onClick={() => {
                            dispatch(addSongToPlaylist([menu.song, name]))
                        }} key={index}>{name}</li>
                    )
                })}
            </ul>
        </div>
    );
}

export default ContextualMenu;
