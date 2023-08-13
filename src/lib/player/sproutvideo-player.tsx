import { type SproutVideoPlayerProps } from "./sproutvideo-player-props";
import { type SproutVideoPlayerRef } from "./sproutvideo-player-ref";

import { SV } from "../sproutvideo/sproutvideo";

import * as React from "react";

export const SproutVideoPlayer = React.forwardRef<
  SproutVideoPlayerRef,
  SproutVideoPlayerProps
>((props, ref) => {
  const playerRef = React.useRef<SV.PlayerImpl>();
  const iFrameRef = React.useRef<HTMLIFrameElement | null>(null);

  React.useImperativeHandle(ref, () => ({
    play: () => {
      playerRef.current?.play();
    },
    pause: () => {
      playerRef.current?.pause();
    },
    progress: () => {
      return {
        percent: 0,
        time: 0,
      };
    },
  }));

  // wait for the iframe to be ready
  React.useEffect(() => {
    if (!iFrameRef.current) return;

    playerRef.current = new SV.PlayerImpl({
      videoId: props.id,
    });
  }, [iFrameRef.current]);

  return (
    <iframe
      src={props.url}
      ref={iFrameRef}
      className="sproutvideo-player"
    ></iframe>
  );
});
