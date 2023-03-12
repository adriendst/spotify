import React from 'react';
import {Link} from "react-router-dom";
import {Playlist} from "../../Slices/playlistsSlice";
import {Card} from "antd";
import Meta from "antd/es/card/Meta";
import './TopPlaylistCard.css'

interface TopPlaylistCard {
    playlist: Playlist;
}

const PlaylistCard = ({playlist}: TopPlaylistCard) => {
    return (
        <Link to={`/playlist/${playlist.name}${playlist.year}`} className={'LinkTop'}>
            <Card
                hoverable
                className={'CardTopPlaylist'}
                cover={<div className={'CardTopPlaylistColor'} style={{
                    background: `linear-gradient(180deg, #${playlist.color1} 0%, #${playlist.color2} 100%)`,
                }}>
                    {playlist.name} {playlist.year}
                </div>
                }
            >
                <Meta title={'TOP 50'} description={playlist.year}/>
            </Card>
        </Link>
    );
};

export default PlaylistCard;
