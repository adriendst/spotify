import React from 'react';
import './index.css';
import SpotifyWrapper from "./SpotifyWrapper";
import {ConfigProvider, theme} from "antd";

const App = () => {
    return <ConfigProvider
    theme={{
        algorithm : theme.darkAlgorithm,
    }}
    >
    <SpotifyWrapper/>
    </ConfigProvider>
};

export default App;
