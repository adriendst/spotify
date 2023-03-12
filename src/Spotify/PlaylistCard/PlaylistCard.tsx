import React from 'react';
import {Link} from "react-router-dom";
import {Playlist} from "../../Slices/playlistsSlice";
import './PlaylistCard.css'
interface PlaylistCard {
    playlist: Playlist;
}

const PlaylistCard = ({playlist}: PlaylistCard) => {
    return (
        <div className={'PlaylistCard'}>
            <Link to={`/playlist/${playlist.name}`} className={'Link'}>
                <div className={'Card'}>
                    <div className={'PlaylistCardColor'} style={{background: `linear-gradient(180deg, #${playlist.color1} 0%, #${playlist.color2} 100%)`}}>
                        {
                            playlist.name == "Liked Songs" ? <img src={'MidHeart.png'} alt={'MidHeart'}/> : ""
                        }
                    </div>
                    <div className={'PlaylistCardName'}>
                        {playlist.name}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PlaylistCard;
