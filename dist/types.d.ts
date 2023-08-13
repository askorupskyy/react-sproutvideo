import * as React from 'react';

type SproutVideoPlayerProps = {
    id: string;
    url: string;
};

interface SproutVideoPlayerRef {
    play: () => void;
    pause: () => void;
    progress: () => {
        percent: number;
        time: number;
    };
}

declare const SproutVideoPlayer: React.ForwardRefExoticComponent<SproutVideoPlayerProps & React.RefAttributes<SproutVideoPlayerRef>>;

export { SproutVideoPlayer, SproutVideoPlayerProps, SproutVideoPlayerRef };
