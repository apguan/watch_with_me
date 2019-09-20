import React, { Component } from "react";
import {
  Window,
  ButtonsContainer,
  Timeline
} from "./styled_components/containers";
import { PlayButtons, Playback } from "./styled_components/components";
import styled from "styled-components";

const Video = styled.div`
  width: 100% !important;
  height: 85% !important;
`;

class VideoContainer extends Component {
  state = {
    time: 0,
    currTime: 0,
    ready: false
  };

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
        showinfo: 1,
        egm: 0,
        showsearch: 1,
        controls: 1,
        modestbranding: 0
      },
      events: {
        onReady: this.onPlayerReady,
        onPlaybackQualityChange: this.onPlayerPlaybackQualityChange,
        onStateChange: this.onPlayerStateChange,
        onError: this.onPlayerError
      }
    });
  };

  onPlayerStateChange = event => {
    if (event.data == window.YT.PlayerState.ENDED) {
      this.nextVideo();
    }
  };

  onPlayerReady = event => {
    event.target.seekTo(0);
    event.target.playVideo();
    this.setState(
      {
        time: event.target.getDuration(),
        ready: true
      },
      () => this.progressBar()
    );
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

  playVideo = () => {
    this.player.playVideo();
    this.progressBar();
  };

  pauseVideo = () => {
    this.player.pauseVideo();
    clearInterval(this.state.interval);
  };

  nextVideo = () => {
    clearInterval(this.state.interval);
    this.setState({
      currTime: 0
    });
    this.player.destroy();
    this.props.dequeueVideo();
  };

  progressBar = () => {
    let interval = setInterval(() => {
      console.log("hit");
      this.setState({
        currTime: this.player.getCurrentTime()
      });
    }, 1000);

    this.setState({
      interval: interval
    });
  };

  render = () => {
    const { queue } = this.props;
    const { ready, currTime } = this.state;
    const url = queue[0];
    const videoId = this.parseVideoId(url);

    return (
      <Window width={50}>
        {videoId ? (
          <>
            <Video id={`youtube-player-${videoId}`} />
            <Timeline>
              <Playback currTime={currTime} time={this.state.time}></Playback>
            </Timeline>
            <ButtonsContainer>
              <PlayButtons
                onClick={this.playVideo}
                className="fas fa-play-circle"
                aria-hidden="true"
              ></PlayButtons>
              <PlayButtons
                onClick={this.pauseVideo}
                className="far fa-pause-circle"
                aria-hidden="true"
              ></PlayButtons>
              <PlayButtons
                onClick={this.nextVideo}
                className="fas fa-chevron-right"
                aria-hidden="true"
              ></PlayButtons>
            </ButtonsContainer>
          </>
        ) : (
          <h2>Add a video in the queue </h2>
        )}
      </Window>
    );
  };
}

export default VideoContainer;
