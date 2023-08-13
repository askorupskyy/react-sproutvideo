declare namespace SV {
    interface PlayerOptions {
        videoId?: string;
        playlistId?: string;
        target?: HTMLIFrameElement;
        events?: any;
    }
    interface PlayerEvents {
        onStatus?: (status: any) => void;
    }
    interface Player {
        play(index?: string): void;
        pause(): void;
        setVolume(vol: number): void;
        getEvents(): PlayerEvents | undefined;
        bind(type: string, listener: (event: any) => void): void;
        fire(event: string | any): void;
        unbind(type: string, listener: (event: any) => void): void;
        updateStatus(message: any): void;
    }
    const players: Record<string, Player>;
    class PlayerImpl implements Player {
        private _iframe;
        private _events?;
        private _volume;
        private _playbackRate;
        private _qualityLevel;
        private _currentTime;
        private _duration;
        private _email;
        private _loaded;
        private _listeners;
        constructor(options: PlayerOptions);
        play(index?: string): void;
        pause(): void;
        getEvents(): PlayerEvents | undefined;
        setVolume(vol: number): void;
        bind(type: string, listener: (event: any) => void): void;
        fire(event: string | any): void;
        updateStatus(message: any): void;
        unbind(type: string, listener: (event: any) => void): void;
        private sendMessage;
        private routePlayerEvent;
        private findOrCreateIframe;
    }
    function routePlayerEvent(e: MessageEvent): void;
    namespace utils {
        function getElementsByClassName(classname: string): HTMLElement[];
    }
}
export { SV };
