import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import screenfull from "screenfull";
import ReactPlayer from "react-player";
import _ from "lodash";

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

class VideoContainer extends Component {
  state = {
    url: null,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    currTime: 0,
    scrubTime: 0,
    loaded: 0,
    duration: 0,
    loop: false
  };

  componentDidMount = () => {
    const { interval } = this.state;
    const { socket } = this.props;

    socket.on("video details", ({ currTime, action }) => {
      console.log(currTime, action);
      clearInterval(interval);
      switch (action) {
        case "restart":
          this.setState({ currTime: 0 }, () => {
            this.player.seekTo(0);
            this.progressBar();
          });
          break;
        case "play":
          this.setState({
            playing: true,
            currTime
          });
          this.progressBar();
          break;
        case "pause":
          this.setState({ playing: false });
          break;
        case "update":
          this.setState({ currTime: currTime }, () => {
            this.player.seekTo(currTime);
            this.progressBar();
          });
          break;
        default:
          break;
      }
    });
  };

  componentDidUpdate = prevProps => {
    if (
      !_.isEqual(prevProps.queue[0], this.props.queue[0]) &&
      this.props.queue.length
    ) {
      this.setState({ url: this.props.queue[0].url }, () =>
        this.player.seekTo(0)
      );
    }
  };

  componentWillUnmount = () => {
    this.props.socket.off("video details");
  };

  nextVideo = () => {
    clearInterval(this.state.interval);
    this.setState({ currTime: 0 }, () => this.props.dequeueVideo());
  };

  handlePlay = () => {
    this.setState({ playing: true }, () => {
      this.props.socket.emit("video details", {
        action: "play"
      });
    });
  };

  handlePause = () => {
    clearInterval(this.state.interval);
    this.props.socket.emit("video details", {
      currTime: this.state.currTime,
      action: "pause"
    });
    this.setState({ playing: false });
  };

  handleDuration = duration => {
    console.log(this.player.getDuration(), duration);
    this.setState({
      duration: this.player ? this.player.getDuration() : duration
    });
  };

  handleClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player));
  };

  updateProgressBarPosition = e => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const totalWidth = rect.width - 1; //subtract borders
    const newCurrTime = (x / totalWidth) * this.state.duration;

    this.props.socket.emit("video details", {
      currTime: newCurrTime,
      action: "update"
    });

    this.setState({ currTime: newCurrTime }, () => {
      clearInterval(this.state.interval);
      this.player.seekTo(newCurrTime);
      this.progressBar();
    });
  };

  progressBar = () => {
    let interval = setInterval(() => {
      this.setState({
        currTime: this.player ? this.player.getCurrentTime() : 0
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
    const newCurrTime = (x / totalWidth) * this.state.duration;
    this.setState({ scrubTime: newCurrTime });
  };

  secondsToTime = time => {
    if (!isNaN(time)) {
      let date = new Date(null);
      date.setSeconds(time);
      let timeString = date.toISOString().substr(11, 8);

      return timeString;
    }

    return "00:00:00";
  };

  ref = player => {
    this.player = player;
  };

  render = () => {
    const {
      url,
      playing,
      controls,
      light,
      volume,
      muted,
      loop,
      currTime,
      scrubTime,
      duration
    } = this.state;

    return (
      <Window width={50} minWidth={500}>
        {url ? (
          <>
            <ReactPlayer
              ref={this.ref}
              className="react-player"
              width="100%"
              height="100%"
              url={url}
              playing={playing}
              controls={controls}
              light={light}
              loop={loop}
              volume={volume}
              muted={muted}
              onReady={() => console.log("onReady")}
              onStart={() => console.log("onStart")}
              onPlay={this.handlePlay}
              onPause={this.handlePause}
              onBuffer={() => console.log("onBuffer")}
              onSeek={e => console.log("onSeek", e)}
              onEnded={this.handleEnded}
              onError={e => console.log("onError", e)}
              onProgress={this.handleProgress}
              onDuration={this.handleDuration}
            />
            <Timeline
              onClick={this.updateProgressBarPosition}
              onMouseMove={this.scrubVideo}
              onMouseOut={() => this.setState({ scrubTime: 0 })}
            >
              <Playback currTime={currTime} time={duration}></Playback>
            </Timeline>
            <TimeStamp>
              {scrubTime === 0
                ? this.secondsToTime(Math.ceil(currTime))
                : this.secondsToTime(scrubTime)}
              /{this.secondsToTime(duration)}
            </TimeStamp>
            <ButtonsContainer>
              <PlayButtons
                onClick={this.restart}
                className="fas fa-backward"
                aria-hidden="true"
              ></PlayButtons>
              <PlayButtons
                onClick={this.handlePlay}
                className="fas fa-play-circle"
                aria-hidden="true"
              ></PlayButtons>
              <PlayButtons
                onClick={this.handlePause}
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
