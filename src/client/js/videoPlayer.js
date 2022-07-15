/*
Create / Modify video player using the HTML DOM API(HTMLMediaElement Interface)
 ** https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
*/

const video = document.querySelector("video"); // The html Video object 

const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }

    playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMuteClick = (e) => {
    if (video.muted) {
        video.muted = false;
        video.volume = 0.5;
    } else {
        video.muted = true;
        video.volume = 0;
    }
        muteBtn.innerText = video.muted ? "Unmute" : "Mute";
        volumeRange.value = video.muted ? 0 : 0.5;
    };
  
const handleVolumeChange = (event) => {
    const {
      target: { value },
    } = event;
    if (video.muted) {
      video.muted = false;
      muteBtn.innerText = "Mute";
    }
    volumeValue = value;
    video.volume = value;

    if (Number(value) === 0) {
        muteBtn.innerText = "Unmute";
        video.muted = true;
    } else {
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
  };

const handleLoadedMetadata = () => {
    //loadedmetadata event occurs when the first frame of media is loaded  
totalTime.innerText = formatTime(video.duration);
timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
currenTime.innerText = formatTime(video.currentTime);
};

const handleTimeLineChange = (event) => {
    const {
        target: { value },
      } = event;
      // set the time of the video to a input
      video.currentTime = value;

}

const formatTime = (seconds) => {
  return new Date(Math.floor(seconds) * 1000).toISOString().substring(11, 19);
}

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);

//loadedmetadata event occurs when the first frame of media is loaded  
video.addEventListener("loadedmetadata", handleLoadedMetadata);
//timeupdate event occurs when the time data of the media is updated 
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimeLineChange)