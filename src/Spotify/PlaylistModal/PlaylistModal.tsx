import {Button, Input, Modal} from 'antd';
import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {State} from "../../store";
import './PlaylistModal.css'
import { useNavigate } from 'react-router-dom';

interface PlaylistModalInterface {
    onClosePlaylist(): void;
    onSavePlaylist(name: string): void;
}

const PlaylistModal = ({onSavePlaylist, onClosePlaylist}: PlaylistModalInterface) => {
    const navigate = useNavigate();

    const displayModal = useSelector((state: State) => state.spotify.playlistModal)
    const playlist = useSelector((state: State) => state.spotify.playlists)

    const [newPlaylistName, setNewPlaylistName] = useState<string>();

    const handleOnSave = () => {
        if (newPlaylistName) {
            const playlistExists = Object.values(playlist).some((item) => item.name === newPlaylistName);
            if (playlistExists) {
                setNewPlaylistName(undefined);
                onClosePlaylist()
                navigate(`/playlist/${newPlaylistName}`)
            } else {
                onSavePlaylist(newPlaylistName);
                setNewPlaylistName(undefined);
            }
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPlaylistName(e.target.value);
    };

    return (
        <Modal open={displayModal} footer={null} width={245} onCancel={onClosePlaylist}>
            <div className={'PlaylistModal'}>
                <div className={'PlaylistModalDiv'}>
                    <div className={'PlaylistModalTitle'}>Create playlist</div>
                    <div className={'PlaylistModalBody'}>
                        <Input value={newPlaylistName} onChange={handleOnChange} className={'PlaylistModalInput'}/>
                        <Button onClick={handleOnSave} className={'PlaylistModalButton'}>
                            Create
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default PlaylistModal;
