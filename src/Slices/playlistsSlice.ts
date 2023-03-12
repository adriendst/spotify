import {createSlice} from '@reduxjs/toolkit';
import data from '../static/data.json'

export interface Playlist {
    name: string
    songs: Song[]
    color1: string
    color2: string,
    year: number | null

}

export interface Song {
    title: string,
    artist: string,
    genre: string,
    year: number,
    duration: number,
    popularity: number,
}

export interface playlistMenu {
    visible: boolean,
    x: number,
    y: number,
    song: Song
}


export interface PlayingSong {
    playlist: Playlist;
    song: Song;
}

export interface Spotify {
    playlists: Playlist[],
    topPlaylists: Playlist[]
    songs: Song[],
    playlistModal: boolean,
    playlistMenu: playlistMenu,
    playingSong: PlayingSong
}

let randomColor = () => (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

const topPlaylist = () => {
    let topPlaylist = [];
        const songs = data;
        for (let i = 2010; i < 2020; i++) {
            const playlist: Playlist = {
                name: "TOP 50",
                songs: [],
                color1: randomColor(),
                color2: randomColor(),
                year: i
            };

            let result = songs.filter(songs => songs.year == i)
            result.sort((a, b) => b.popularity - a.popularity);
            playlist.songs = result.slice(0, 50);
            topPlaylist.push(playlist)
        }
        return topPlaylist
}

export const playlistsSlice = createSlice({
    name: 'spotify',
    initialState: {
        topPlaylists: topPlaylist(),
        playlists: [{
            name: 'Liked Songs',
            songs: [],
            color1: '4000F4',
            color2: 'C0ECD7',
            year: null
        }],
        playlistModal: false,
        songs: data,
        playlistMenu: {
            visible: false, x: 0, y: 0, song: {
                title: '',
                artist: '',
                genre: '',
                year: 0,
                duration: 0,
                popularity: 0,
            },
        },
        playingSong: {
            playlist: {
                name: '',
                songs: [],
                color1: randomColor(),
                color2: randomColor(),
                year: null
            },
            song: {
                title: 'Pas de musique',
                artist: 'Pas de musique',
                genre: '',
                year: 0,
                duration: 0,
                popularity: 0
            }
        }
    },
    reducers: {
        addPlaylist: (state: { playlists: Playlist[] }, action: { payload: string }) => {
            state.playlists.push({
                name: action.payload,
                songs: [],
                color1: randomColor(),
                color2: randomColor(),
                year: null
            });
        },
        displayPlaylistModal: (state: { playlistModal: true | false }, action: { payload: true | false }) => {
            state.playlistModal = action.payload
        },
        displayPlaylistMenu: (state: { playlistMenu: playlistMenu }, action: { payload: playlistMenu }) => {
            state.playlistMenu = action.payload
        },
        addSongToPlaylist: (state: { playlists: Playlist[] }, action: { payload: [Song, string] }) => {
            const playlist = state.playlists.find(playlist => playlist.name === action.payload[1]);
            if (playlist) {
                playlist.songs.push(action.payload[0]);
            }
        },
        removeSongFromPlaylist: (state: { playlists: Playlist[] }, action: { payload: [Song, string] }) => {
            const playlist = state.playlists.find(playlist => playlist.name === action.payload[1]);
            if (playlist) {
                playlist.songs = playlist.songs.filter(song => song.title !== action.payload[0].title);
            }
        },
        changePlayingSong: (state: { playingSong: PlayingSong }, action: { payload: [Song, Playlist] }) => {
            state.playingSong.song = action.payload[0];
            state.playingSong.playlist = action.payload[1];
        },
    },
});


export const {
    addPlaylist,
    displayPlaylistModal,
    displayPlaylistMenu,
    addSongToPlaylist,
    removeSongFromPlaylist,
    changePlayingSong
} = playlistsSlice.actions;

export default playlistsSlice.reducer;
