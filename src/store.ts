import { configureStore } from '@reduxjs/toolkit';
import playlistsReducer, {Spotify} from './Slices/playlistsSlice';

export interface State {
    spotify: Spotify;
}

export default configureStore({
    reducer: {
        spotify: playlistsReducer,
    },
});
