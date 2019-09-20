import React, { Component } from "react";
import { Window } from "./styled_components/containers.js";
import styled from "styled-components";

const Video = styled.div`
  width: 100% !important;
  height: 90% !important;
`;

class VideoContainer extends Component {
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

  componentDidUpdate(nextProps) {
    console.log(nextProps.queue[0] !== this.props.queue[0]);
    if (nextProps.queue[0] !== this.props.queue[0]) {
      this.loadVideo();
    }
  }

  // https://www.youtube.com/watch?v=DyX-QZZBgpw
  loadVideo = () => {
    let { queue } = this.props;
    let url = queue[0];
    let videoId = this.parseVideoId(url);

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

  parseVideoId = url => {
    if (url) {
      let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      let match = url.match(regExp);
      if (match && match[2].length == 11) {
        return match[2];
      }
    }
  };

  onPlayerReady = event => {
    event.target.playVideo();
  };

  render = () => {
    const { queue } = this.props;
    const url = queue[0];
    const videoId = this.parseVideoId(url);

    return (
      <Window width={50}>
        <Video id={videoId ? `youtube-player-${videoId}` : null} />
      </Window>
    );
  };
}

export default VideoContainer;
