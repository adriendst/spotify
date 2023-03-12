import {Input, Select, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import ContextualMenu from "../ContextualMenu/ContextualMenu";
import {
    changePlayingSong,
    displayPlaylistMenu,
} from "../../Slices/playlistsSlice";
import Duration from "../Duration/Duration";
import Heart from "../Heart/Heart";
import './Playlist.css';
import {useParams} from "react-router-dom";


export interface PlaylistInterface {
    playlistName: string;
}

interface Song {
    title: string,
    artist: string,
    genre: string,
    year: number,
    duration: number,
    popularity: number,
}


const Playlist = ({playlistName}: PlaylistInterface) => {
    const {Option} = Select;

    const [newSearch, setNewSearch] = useState<string>('');
    const [newSort, setNewSort] = useState<string>('');

    const url=useParams()

    useEffect(() => {
        setNewSearch('')
        setNewSort('')
    }, [url]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSearch(e.target.value);
    };

    const handleOnSortChange = (newValue: string) => {
        setNewSort(newValue);
        console.log(newSort)
        songs(newValue);
    };



    const dispatch = useDispatch()
    const capitalizeFirstChar = (word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    const playlistYear = playlistName.slice(6)
    const playlist = useSelector((state: State) => {
        if (playlistName.slice(0, 6) == 'TOP 50') {
            return state.spotify.topPlaylists.filter(({year}) => year === parseInt(playlistYear))
        } else {
            return state.spotify.playlists.filter(({name}) => name === playlistName)
        }
    })

    const searchSongs = () => {
        if (newSearch !== undefined) {
            return playlist[0].songs.filter((song) => {
                return Object.entries(song).some(([key, value]) => {
                    if (typeof value === 'number') {
                        if (key == 'duration') {
                            if (value % 60 < 10) {
                                const duration = Math.floor(value / +60) + ':0' + value % 60
                                return duration.toString().includes(newSearch)
                            } else {
                                const duration = Math.floor(value / +60) + ":" + value % 60
                                return duration.toString().includes(newSearch)
                            }
                        } else {
                            return value.toString().includes(newSearch);
                        }
                    } else if (typeof value === 'string') {
                        return value.toLowerCase().includes(newSearch.toLowerCase());
                    }
                });
            });
        } else {
            return playlist[0].songs;
        }
    }

    const sortSongs = (newSort: string) => {
        let sortedSongs = searchSongs();
        if (newSort === 'title') {
            sortedSongs.sort((a, b) => a.title.localeCompare(b.title));
        } else if (newSort === 'genre') {
            sortedSongs.sort((a, b) => a.genre.localeCompare(b.genre));
        } else if (newSort === 'year') {
            sortedSongs.sort((a, b) => a.year - b.year);
        } else if (newSort === 'duration') {
            sortedSongs.sort((a, b) => b.duration - a.duration);
        } else if (newSort === 'popularity') {
            sortedSongs.sort((a, b) => b.popularity - a.popularity);
        }
        return sortedSongs;
    };

    const songs = (newSort: string | undefined) => {
        if (newSort !== undefined) {
            return sortSongs(newSort)
        } else {
            return searchSongs()
        }
    }

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            render: (item: any, record: Song, index: number) => <div>{index + 1}</div>,
            className : 'index'
        },
        {
            title: '',
            dataIndex: 'heart',
            key: 'heart',
            render: (item: any, record: Song) => <Heart song={record}/>,
            className : 'heart'
        },
        {
            title: 'Title',
            dataIndex: ['title', 'artist'],
            key: 'title',
            render: (text: string, row: any) => <p>{row['title']} - {row["artist"]}</p>,
            className : 'title'
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'Year',
            className: 'year'
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
            render: (text: string, row: any) => <p>{capitalizeFirstChar(row['genre'])}</p>,
            className: 'genre'
        },
        {
            title: 'Popularity',
            dataIndex: 'popularity',
            key: 'popularity',
            className: 'popularity'
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            render: (text: string, row: any) =>
                <Duration duration={row['duration']}/>,
            className: 'duration'
        },
    ];

    return (<div>
            <div className={'PlaylistColorBanner'}
                 style={{background: `linear-gradient(90deg, #${playlist[0].color1} 0%, #${playlist[0].color2} 100%)`}}>
                <div className={'PlaylistColorInBanner'}
                     style={{background: `linear-gradient(180deg, #${playlist[0].color1} 0%, #${playlist[0].color2} 100%)`,}}>
                    {playlist[0].name == 'Liked Songs' ?
                        <img src={'/BigHeart.png'} alt={'BigHeart'}/>
                        : playlist[0].name == 'TOP 50' ? playlist[0].name + ' ' + playlist[0].year : ''}
                </div>
                <div className={'PlaylistNameInBanner'}>
                    {playlist[0].name}
                </div>
            </div>
            <div className={'Search'}>
                <div>
                    <Input prefix={<img src={'/loupe.png'} alt={'Logo'}/>} className={'SearchInput'}
                           placeholder={'Artists, songs or podcasts'} value={newSearch} onChange={handleOnChange}/>
                </div>
                <div>
                    <Select placeholder={"Custom order"}
                            className={'SelectOrder'} onChange={handleOnSortChange}
                            value={newSort !== "" ? newSort : undefined}>
                        <Option key={'title'}>Title</Option>
                        <Option key={'year'}>Year</Option>
                        <Option key={'genre'}>Genre</Option>
                        <Option key={'popularity'}>Popularity</Option>
                        <Option key={'duration'}>Duration</Option>
                    </Select>
                </div>
            </div>
            <Table dataSource={songs(newSort)} columns={columns} pagination={false}
                   className={'Table'}
                   rowKey={(record) => `${record.artist}-${record.title}}`}
                   onRow={(record) => {
                       return {
                           onClick: () => {
                               dispatch(changePlayingSong([record, playlist[0]]))
                           },
                           onContextMenu: (event) => {
                               event.preventDefault();
                               dispatch(displayPlaylistMenu({
                                   visible: true,
                                   x: event.pageX,
                                   y: event.pageY,
                                   song: record
                               }))
                           },
                       };
                   }}
            />
            <ContextualMenu/>
        </div>
    );
};

export default Playlist;
