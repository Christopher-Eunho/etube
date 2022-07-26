/* 
Handle video recording in upload page
Mainly use Media Capture and Streams API
https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API

Media Recorder:
https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

dataavailable (event)
Fires periodically each time timeslice milliseconds of media have been recorded 
(or when the entire media has been recorded, if timeslice wasn't specified). 
The event, of type BlobEvent, contains the recorded media in its data property.
*/

const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;

const handleStop = () => {
  startBtn.innerText = "Start Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleStart);
};

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);
  const recorder = new MediaRecorder(stream);
  
  recorder.ondataavailable = (e) => {
    console.log("recording done");
    console.log(e);
    console.log(e.data);
  };
  console.log(recorder);
  recorder.start();
  console.log(recorder);
  setTimeout(() => {
    recorder.stop();
  }, 4000);
};

// get video stream and show preview 
const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  video.srcObject = stream;
  video.play();
};

init();

startBtn.addEventListener("click", handleStart);