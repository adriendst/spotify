import React from 'react';
import {useSelector} from "react-redux";
import {State} from "../../store";
import Duration from "../Duration/Duration";
import Heart from "../Heart/Heart";
import './MusicPlayer.css'

const MusicPlayer = () => {

    const playingSong = useSelector((state: State) => state.spotify.playingSong);

    return (
        <div className={'MusicPlayer'}>
            <div className={'Music'}>
                <div className={'PlaylistColor'}
                     style={{background: `linear-gradient(90deg, #${playingSong.playlist.color1} 0%, #${playingSong.playlist.color2} 100%)`}}/>
                <div className={'InfoMusic'}>
                    <div className={'InfoMusicColumn'}>
                        <div className={'MusicTitle'}>
                            {playingSong.song.title}
                        </div>
                        <div>
                            {playingSong.song.artist}
                        </div>
                    </div>
                    <div className={'MusicHeart'}>
                        {playingSong.song.title === "Pas de musique" ? "" : <Heart song={playingSong.song}/>}
                    </div>
                </div>
            </div>

            <div className={'MusicButtonBar'}>
                <div className={'MusicButton'}>
                    <img className={'RandomButton'} src={'/aleatoire.png'} alt={'aleatoire'}/>
                    <img src={'/previous_musique.png'} className={'PreviousButton'} alt={'previous'}/>
                    <img src={'/gridicons_play.png'} className={'PlayButton'} alt={'play'}/>
                    <img src={'/previous_musique.png'} className={'NextButton'} alt={'next'}/>
                    <img src={'/repeat.png'}
                         className={'RepeatButton'} alt={'repeat'}/>
                </div>
                <div className={'MusicButton'}>
                    <div className={'LeftDuration'}>0:00</div>
                    <div className={'MusicBar'}/>
                    <div className={'RightDuration'}>
                        <Duration duration={playingSong.song.duration}/>
                    </div>
                </div>
            </div>
            <div className={'RightOptions'}>
                <img src={'/right_options.png'} alt={'rightOptions'}/>
            </div>
        </div>
    );
}

export default MusicPlayer;
