export interface SproutVideoPlayerRef {
  play: () => void;
  pause: () => void;

  setVolume: (volume: number) => void;
  getVolume: () => number;

  progress: () => {
    percent: number;
    time: number; // in seconds
  };
}
