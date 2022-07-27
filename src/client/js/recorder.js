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
let recorder;
let videoFile;


// Create a downloadable link and add it to the body of document. Then simulate click of the link 
const handleDownload = () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "EtubeRecording.webm"; // name of the video file
  document.body.appendChild(a);
  a.click();
};

const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  // specify the type of the video as webm so it's available on many browsers. (mp4 doesn't work on some browsers)
  recorder = new MediaRecorder(stream, {mimeType: "video/webm"}); 
  // Fires when data is available (when recording stops)
  recorder.ondataavailable = (event) => {
    // Creates a video url that is saved on the browser 
    videoFile = URL.createObjectURL(event.data); 
    // Replace the preview video with the recorded video
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };

  recorder.start();
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