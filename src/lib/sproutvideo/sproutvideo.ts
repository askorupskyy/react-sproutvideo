namespace SV {
  export interface PlayerOptions {
    videoId: string;
    playlistId?: string;
    target?: HTMLIFrameElement;
    events?: any;
  }

  export interface PlayerEvents {
    onStatus?: (status: any) => void;
  }

  export interface Player {
    play(index?: string): void;
    pause(): void;
    setVolume(vol: number): void;
    getEvents(): PlayerEvents | undefined;
    getVolume(): number;
    /* setPlaybackRate(rate: number): void; */
    /* getPlaybackRate(): number; */
    /* getQualityLevel(): string; */
    /* setQualityLevel(level: string): void; */
    /* seek(loc: number): void; */
    /* toggleHD(): void; */
    /* getCurrentTime(): number; */
    /* getPercentLoaded(): number; */
    /* getDuration(): number; */
    /* getEmail(): string | null; */
    /* frameForward(): void; */
    /* frameBack(): void; */
    /* getPaused(): void; */
    /* getConsent(): void; */
    bind(type: string, listener: (event: any) => void): void;
    fire(event: string | any): void;
    unbind(type: string, listener: (event: any) => void): void;
    updateStatus(message: any): void;
  }

  export const players: Record<string, Player> = {};

  export class PlayerImpl implements Player {
    private _iframe: HTMLIFrameElement;
    private _events?: PlayerEvents;

    private _isReady: boolean = false;

    private _volume: number = 1;
    private _playbackRate: number = 1;
    private _qualityLevel: string = "auto";
    private _currentTime: number = 0;
    private _duration: number = 0;
    private _email: string | null = null;
    private _loaded: number = 0;

    private _listeners: Record<string, ((event: any) => void)[]> = {};
    // ... other private properties

    constructor(options: PlayerOptions) {
      if (typeof window === "undefined") throw new Error("No window object");
      // Initialize private properties
      // ...

      // Find or create the iframe
      this._events = options.events;
      this._iframe = this.findOrCreateIframe(options);

      SV.players[options?.videoId] = this;

      window.addEventListener("message", this.routePlayerEvent, false);
    }

    isReady(): boolean {
      return this._isReady;
    }

    // Implement play, pause, setVolume, and other methods
    play(index?: string): void {
      const message = index
        ? `{"name":"playVideo", "data":"${index}"}`
        : '{"name":"play"}';
      this.sendMessage(message);
    }

    pause(): void {
      this.sendMessage('{"name":"pause"}');
    }

    getEvents(): PlayerEvents | undefined {
      return this._events;
    }

    setVolume(vol: number): void {
      this.sendMessage(`{"name":"volume", "data":"${vol}"}`);
    }

    getVolume(): number {
      return this._volume;
    }

    bind(type: string, listener: (event: any) => void): void {
      if (!this._listeners[type]) {
        this._listeners[type] = [];
      }
      this._listeners[type].push(listener);
    }

    fire(event: string | any): void {
      const eventType = typeof event === "string" ? event : event.type;
      const listeners = this._listeners[eventType];
      if (listeners) {
        listeners.forEach((listener) => {
          if (typeof event !== "string") {
            event.target = this;
          }
          listener(event);
        });
      }
    }

    updateStatus(message: any): void {
      switch (message.type) {
        case "volume":
          this._volume = message.data;
          break;
        case "progress":
          this._currentTime = message.data.time;
          break;
        case "loading":
          this._isReady = true;
          this._loaded = message.data;
          break;
        case "ready":
          this._duration = message.data.duration;
          this._email = message.data.email;
          this._qualityLevel = message.data.qualityLevel;
          break;
        case "rateChange":
          this._playbackRate = message.data;
          break;
        case "qualityLevelChange":
          this._qualityLevel = message.data;
          break;
        case "canplay":
          this._isReady = true;
          break;
        default:
          // Do nothing or handle unknown status updates
          break;
      }
    }

    unbind(type: string, listener: (event: any) => void): void {
      const listeners = this._listeners[type];
      if (listeners) {
        const index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      }
    }

    private sendMessage(message: string): void {
      if (typeof this._iframe === "undefined" || typeof window === "undefined")
        return;
      this._iframe.contentWindow?.postMessage(
        message,
        window.location.protocol + "//videos.sproutvideo.com"
      );
    }

    private routePlayerEvent(e: MessageEvent): void {
      if ("videos.sproutvideo.com" == e.origin.split("//")[1]) {
        try {
          const message = JSON.parse(e.data);
          const player = SV.players[message.id];

          if (player) {
            player.updateStatus(message);
            player.fire({ type: message.type, data: message.data });

            const events = player.getEvents();
            if (events?.onStatus) events.onStatus(message);
          }
        } catch (e) {
          // Handle parsing or other errors
        }
      }
    }

    private findOrCreateIframe(options: PlayerOptions): HTMLIFrameElement {
      // Check if the iframe is provided in options
      if (options.target) {
        return options.target;
      }

      // Try to find the iframe in the document based on videoId or playlistId
      const idToSearch = options.videoId || options.playlistId;
      const iframes = SV.utils.getElementsByClassName("sproutvideo-player");

      for (let i = 0; i < iframes.length; i++) {
        const src = iframes[i].getAttribute("src");
        if (src && idToSearch && src.indexOf(idToSearch) !== -1) {
          return iframes[i] as HTMLIFrameElement;
        }
      }

      // If the iframe doesn't exist, throw an error or handle accordingly
      throw new Error("Cannot find video iframe.");
    }
  }

  export namespace utils {
    export function getElementsByClassName(classname: string): HTMLElement[] {
      const elements: HTMLElement[] = [];

      if (document.getElementsByClassName) {
        const nodeList = document.getElementsByClassName(
          classname
        ) as HTMLCollectionOf<HTMLElement>;
        elements.push(...Array.from(nodeList));
      } else {
        const allElements = document.getElementsByTagName(
          "*"
        ) as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < allElements.length; i++) {
          if (
            (" " + allElements[i].className + " ").indexOf(
              " " + classname + " "
            ) > -1
          ) {
            elements.push(allElements[i]);
          }
        }
      }

      return elements;
    }
  }
}

export { SV };
