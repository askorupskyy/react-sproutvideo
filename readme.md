# SproutVideo React Implementation

This is a typescript-safe React version of SproutVideo API. It allows you to embed SV videos as a React component and use in your project (via iframes).

## Installation

`npm install react-sproutvideo`

## Usage

Import the video object

```tsx
// import at the top of the file
import {
  SproutVideoPlayer,
  type SproutVideoPlayerRef,
} from "react-sproutvideo";

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

## Props

```tsx
<SproutVideoPlayer
  id="123123123" // video ID
  url="https://videos.sproutvideo.com/embed/123123123/321321312" // embed Link, can contain other settings from Sprout
  className="w-[700px] h-[400px]" // className for video container, by default invisible unless you give it dimentions
  styles={{}} // same as above, I'm using Tailwind in the example
  ref={videoRef} // videoRef object
  onVideoReady={() => {
    // on video ready callback, in this case used to autoplay the video
    console.log("video ready");
    videoRef.current?.play();
  }}
/>
```

## Contibuting

All the contributions are welcome, please let me know if you want any additional features through issues.
