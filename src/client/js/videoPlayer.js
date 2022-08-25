/*
Create / Modify video player using the HTML DOM API(HTMLMediaElement Interface)
 ** https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
*/

const video = document.querySelector("video"); // The html Video object 

const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");


let volumeValue = 0.5;
let controlsTimeout = null; // id of current controller's showing/disappering timeout caused by leaving mouse .
let controlsMovementTimeout = null; // id of current controller's showing/disappering timeout caused by stop moving mouse in video .
video.volume = volumeValue;

const handlePlayClick = () => {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }

    playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMuteClick = (e) => {
    if (video.muted) {
        video.muted = false;
        video.volume = 0.5;
    } else {
        video.muted = true;
        video.volume = 0;
    }
    muteBtnIcon.classList = video.muted? "fas fa-volume-mute": "fas fa-volume-up";
    volumeRange.value = video.muted ? 0 : 0.5;
};
  
const handleVolumeChange = (event) => {
    const {
      target: { value },
    } = event;
    if (video.muted) {
      video.muted = false;
      muteBtnIcon.classList = "fas fa-volume-mute";
    }
    volumeValue = value;
    video.volume = value;

    if (Number(value) === 0) {
        muteBtnIcon.classList = "fas fa-volume-mute";
        video.muted = true;
    } else {
        video.muted = false;
        muteBtnIcon.classList = "fas fa-volume-up";
    }
  };

const handleLoadedMetadata = () => {
    //loadedmetadata event occurs when the first frame of media is loaded  
    totalTime.innerText = formatTime(video.duration);
    timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
    
    currenTime.innerText = formatTime(video.currentTime);
    // make sure to assign number to 'value'
    timeline.value = Math.floor(video.currentTime);
    
    
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

const handleFullscreen = () => {
    // Full Screen API : https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
    const fullscreen = document.fullscreenElement;
    if (fullscreen) {
      document.exitFullscreen();
      fullScreenIcon.classList = "fas fa-expand";
    } else {
      videoContainer.requestFullscreen();
      fullScreenIcon.classList = "fas fa-compress";
    }
  };

const handleMouseMove = () => {
if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
}
if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
}
showControls()
controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleKeyDown = (e) => {

    if(e.code === "Space") {
        handlePlayClick();
    } else if(e.code === "KeyM") {
        handleMuteClick()
    } else if(e.code === "KeyF") {
        handleFullscreen()
    }
}

const handleMouseLeave = () => {
    // setTimeOut returns an unique id for each timeout. Each timeout can be canceled usingi the id.
    controlsTimeout = setTimeout(() => {
    hideControls();
}, 3000); 
};  

const handleEnded = () => {
    // data set is a saved as html data-attribute from FE (See watch.pug)
    // html data attribute : https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
    const { id } = videoContainer.dataset;
    //send POST api request to the addrees
    fetch(`/api/videos/${id}/view`, {
      method: "POST",
    });
};

const hideControls = () => videoControls.classList.remove("showing");
const showControls = () => videoControls.classList.add("showing");

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);//loadedmetadata event occurs when the first frame of media is loaded
video.addEventListener("timeupdate", handleTimeUpdate);//timeupdate event occurs when the time data of the media is updated 
video.addEventListener("click", handlePlayClick);
video.addEventListener("ended", handleEnded); // register view after user finished watching video
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
timeline.addEventListener("input", handleTimeLineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
document.addEventListener("keydown", handleKeyDown);
