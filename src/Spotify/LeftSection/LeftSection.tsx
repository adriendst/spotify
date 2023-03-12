import React from "react";
import './leftSection.css';
import '../../app.css'
import {Layout, Menu} from "antd";
import {useSelector} from "react-redux";
import {State} from "../../store";
import {
    Link, useParams,
} from "react-router-dom";
import '../../app.css'

interface LeftSectionInterface {
    onNewPlaylist(): void;
}

const LeftSection = ({onNewPlaylist}: LeftSectionInterface) => {
    const playlists = useSelector((state: State) => state.spotify.playlists.filter(({name}) => name !== 'Liked Songs'));

    const url = useParams();
    let selectedKey: string;
    if (url.playlistName == undefined) {
        selectedKey = "";
    } else {
        selectedKey = url.playlistName;
    }

    const displayModal = (key: string) => {
        if (key === 'playlist') {
            onNewPlaylist()
        }
    }

    const menuItems = [
        {
            key: "",
            icon: <div className={'RectangleLogo'}>
                <img src={'/homeLogo.png'} alt={'homeLogo'}/>
            </div>,
            label: <Link to={"/"}>Home</Link>,
            style: {marginBottom: "15px", height: '50px'},
        },
        {
            key: "playlist",
            icon: <div className={'RectangleLogo RectangleLogoPlaylist'}>
                <img src={'/CreatePlaylist.png'} alt={'CreatePlaylist'}/>
            </div>,
            label: 'Create Playlist',
            style: {marginBottom: "5px", height: '50px'},
        },
        {
            key: "Liked Songs",
            icon: <div className={'RectangleLogo RectangleLogoLikedSongs'}>
                <img src={'/Heart.png'} alt={"Heart"}/>
            </div>,
            label: <Link to={"/playlist/Liked Songs"}>Liked Songs</Link>,
            style: {height: '50px', marginBottom: '15px'},
        },
    ];

    const playlistItems = playlists.map(({name}) => ({
        key: name,
        label: <Link to={`/playlist/${name}`}>{name}</Link>,
        style: {height: '50px'},
    }));

    return <div className={'leftSection'}>
        <Layout>
            <div className={'logo'}>
                <img src={'/LogoSpotify.png'} alt={'Logo'}/>
            </div>
            <Menu
                className={'menuSection'}
                mode="inline"
                onClick={(e) =>
                    displayModal(e.key)}
                items={menuItems}
                selectedKeys={[selectedKey]}
            />
            <Menu
                className={'playlistSection'}
                mode="inline"
                items={playlistItems}
                selectedKeys={[selectedKey]}
            />
        </Layout>
    </div>
}

export default LeftSection
