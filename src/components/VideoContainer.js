import React, { Component } from "react";
import {
  Window,
  ButtonsContainer,
  Timeline
} from "./styled_components/containers";
import {
  PlayButtons,
  Playback,
  TimeStamp
} from "./styled_components/components";
import styled from "styled-components";

const Video = styled.div`
  width: 100% !important;
  height: 85% !important;
`;

class VideoContainer extends Component {
  state = {
    time: 0,
    currTime: 0,
    scrubTime: 0,
    videoId: null,
    play: true,
    ready: false
  };

  componentDidMount = () => {
    this.createIframeTag();

    this.props.socket.on("video details", ({ currTime, action }) => {
      console.log(currTime, action);
      clearInterval(this.state.interval);
      switch (action) {
        case "play":
          this.player.seekTo(currTime);
          this.player.playVideo();
          this.progressBar();
          break;
        case "pause":
          this.player.pauseVideo();
          break;
        case "update":
          this.player.seekTo(currTime);
          this.progressBar();
        default:
          break;
      }
    });
  };

  componentDidUpdate(nextProps) {
    if (nextProps.queue[0] !== this.props.queue[0]) {
      this.createIframeTag();
    }
  }

  componentWillUnmount() {
    this.props.socket.off("video details");
  }

  createIframeTag = () => {
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
    clearInterval(this.state.interval);
    this.setState({ currTime: 0 });

    let videoId = this.parseVideoId(this.props.queue[0]);

    this.player = new window.YT.Player(`video-player`, {
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        rel: 0,
        showinfo: 1,
        egm: 0,
        showsearch: 1,
        controls: 0,
        modestbranding: 0
      },
      events: {
        onReady: this.onPlayerReady,
        onPlaybackQualityChange: this.onPlayerPlaybackQualityChange,
        onStateChange: this.onPlayerStateChange
      }
    });
  };

  onPlayerStateChange = event => {
    if (event.data === window.YT.PlayerState.ENDED) {
      this.nextVideo();
    }
  };

  onPlayerReady = event => {
    event.target.seekTo(0);
    this.setState(
      {
        time: event.target.getDuration(),
        ready: true
      },
      () => this.progressBar()
    );
  };

  playVideo = () => {
    this.props.socket.emit("video details", {
      currTime: this.state.currTime,
      action: "play"
    });
    this.player.playVideo();
    this.progressBar();
  };

  pauseVideo = () => {
    clearInterval(this.state.interval);
    this.props.socket.emit("video details", {
      currTime: this.state.currTime,
      action: "pause"
    });
    this.player.pauseVideo();
  };

  nextVideo = () => {
    if (this.player) this.player.destroy();
    clearInterval(this.state.interval);
    this.setState({ currTime: 0 }, () => this.props.dequeueVideo());
  };

  updateProgressBarPosition = e => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const totalWidth = rect.width - 1; //subtract borders
    const newCurrTime = (x / totalWidth) * this.state.time;

    this.props.socket.emit("video details", {
      currTime: newCurrTime,
      action: "update"
    });

    clearInterval(this.state.interval);
    this.player.seekTo(newCurrTime);
    this.progressBar();
  };

  progressBar = () => {
    console.log("function is hit");
    let interval = setInterval(() => {
      this.setState({
        currTime: this.player.getCurrentTime()
      });
    }, 1000);

    this.setState({
      interval: interval
    });
  };

  scrubVideo = e => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const totalWidth = rect.width - 1; //subtract borders
    const newCurrTime = (x / totalWidth) * this.state.time;

    this.setState({ scrubTime: newCurrTime });
  };

  parseVideoId = url => {
    if (url) {
      let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      let match = url.match(regExp);
      if (match && match[2].length === 11) {
        return match[2];
      }
    }
  };

  secondsToTime = time => {
    let date = new Date(null);
    date.setSeconds(time); // specify value for SECONDS here
    let timeString = date.toISOString().substr(11, 8);

    return timeString;
  };

  render = () => {
    const { currTime, time, scrubTime, ready } = this.state;
    const videoId = this.parseVideoId(this.props.queue[0]);

    return (
      <Window width={50} minWidth={500}>
        {videoId ? (
          <>
            <Video id="video-player" />
            {ready ? (
              <Timeline
                onClick={this.updateProgressBarPosition}
                onMouseMove={this.scrubVideo}
                onMouseOut={() => this.setState({ scrubTime: 0 })}
              >
                <Playback currTime={currTime} time={this.state.time}></Playback>
              </Timeline>
            ) : null}
            <TimeStamp>
              {scrubTime === 0
                ? this.secondsToTime(currTime)
                : this.secondsToTime(scrubTime)}
              /{this.secondsToTime(time)}
            </TimeStamp>
            <ButtonsContainer>
              <PlayButtons
                onClick={() => this.player.seekTo(0)}
                className="fas fa-backward"
                aria-hidden="true"
              ></PlayButtons>
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
                className="fas fa-fast-forward"
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
