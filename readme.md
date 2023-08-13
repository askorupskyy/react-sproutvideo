# SproutVideo React Implementation

This is a typescript-safe React version of SproutVideo API. It allows you to embed SV videos as a React component and use in your project (via iframes).

## Installation

`npm install sproutvideo-react`

## Usage

Import the video object

```tsx
// import at the top of the file
import {
  SproutVideoPlayer,
  type SproutVideoPlayerRef,
} from "sproutvideo-react";

export function MyVideoPlayer() {
  // create a ref to have custom controls over the video
  const videoRef = useRef<SproutVideoPlayerRef>(null);

  // render in your component
  return (
    <>
      <SproutVideoPlayer
        id="123123"
        url="https://videos.sproutvideo.com/embed/123123/456456456"
        ref={videoRef}
      />

      <button onClick={() => videoRef.current?.play()}>Play</button>
    </>
  );
}
```
