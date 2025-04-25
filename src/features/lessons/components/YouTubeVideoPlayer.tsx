'use client';

import Youtube from 'react-youtube';

type YoutubeVideoPlayerProps = {
  videoId: string;
  onFinishedVideo?: () => void;
};

function YouTubeVideoPlayer({ videoId, onFinishedVideo }: YoutubeVideoPlayerProps) {
  return (
    <Youtube
      videoId={videoId}
      className="w-full h-full"
      opts={{ width: '100%', height: '100%' }}
      onEnd={onFinishedVideo}
    />
  );
}
export default YouTubeVideoPlayer;
