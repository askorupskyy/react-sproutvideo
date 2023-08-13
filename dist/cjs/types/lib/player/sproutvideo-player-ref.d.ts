export interface SproutVideoPlayerRef {
    play: () => void;
    pause: () => void;
    progress: () => {
        percent: number;
        time: number;
    };
}
