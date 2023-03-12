import React from "react";

export interface DurationInterface {
    duration: number;
}

const Duration = ({duration}: DurationInterface) => {
    return (<div>
        {Math.floor(duration / 60)}:{duration % 60 < 10 ? '0' + duration % 60 : duration % 60}
    </div>)
}

export default Duration
