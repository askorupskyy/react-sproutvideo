export type SproutVideoPlayerProps = {
  id: string;
  url: string;
  className?: string;
  style?: React.CSSProperties;

  onVideoReady?: () => void;
} & React.IframeHTMLAttributes<{}>;
