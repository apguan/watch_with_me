import React, { PureComponent } from "react";
import styled from "styled-components";

const Window = styled.div`
  display: flex;
  justify-content: center;
  display-direction: column;
  width: 50vw;
  margin: 0 15px;
  height: 500px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Video = styled.div`
  width: 100% !important;
  height: 90% !important;
`;

class VideoContainer extends PureComponent {
  componentDidMount = () => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = this.loadVideo;
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      this.loadVideo();
    }
  };

  loadVideo = () => {
    // const { videoId } = this.props;
    const videoId = "4halg2kzPms";
    this.player = new window.YT.Player(`youtube-player-${videoId}`, {
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        rel: 0,
        showinfo: 0,
        egm: 0,
        showsearch: 1,
        controls: 0,
        modestbranding: 1
      },
      events: {
        onReady: this.onPlayerReady,
        onPlaybackQualityChange: this.onPlayerPlaybackQualityChange,
        onStateChange: this.onPlayerStateChange,
        onError: this.onPlayerError
      }
    });
  };

  onPlayerReady = event => {
    event.target.playVideo();
  };

  render = () => {
    // const { id } = this.props;
    return (
      <Window>
        <Video id={`youtube-player-4halg2kzPms`} />
      </Window>
    );
  };
}

export default VideoContainer;
