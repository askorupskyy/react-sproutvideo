import { type SproutVideoPlayerProps } from "./sproutvideo-player-props";
import { type SproutVideoPlayerRef } from "./sproutvideo-player-ref";

import { SV } from "../sproutvideo/sproutvideo";

import * as React from "react";

export const SproutVideoPlayer = React.forwardRef<
  SproutVideoPlayerRef,
  SproutVideoPlayerProps
>(({ id, url, className, style, ...props }, ref) => {
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
      videoId: id,
    });
  }, [iFrameRef.current]);

  return (
    <div
      style={{
        position: "relative",
        ...style,
      }}
      className={className}
    >
      <iframe
        src={url}
        ref={iFrameRef}
        className="sproutvideo-player"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        {...props}
      />
    </div>
  );
});
