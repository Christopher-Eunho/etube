/* 
Handle video recording in upload page
Mainly use Media Capture and Streams API
https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API

Media Recorder:
https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

** Video Transcode



*/
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";


const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

/*
Download
Create a downloadable link and add it to the body of document. Then simulate click of the link 

Transcode (Webm -> MP4) using ffmpeg.wasm : ffmpeg(midea transformation software) + web assembly(virtual machine runnable on browser)

fetchFile(media): Promise (https://github.com/ffmpegwasm/ffmpeg.wasm/blob/master/docs/api.md#fetchfilemedia-promise)
Helper function for fetching files from various resource.

 */
const handleDownload = async () => {

  const ffmpeg = createFFmpeg({ corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
                                log: true });
  // Run ffmpeg program
  await ffmpeg.load();
  // Create a file on a virtual macine on the browser 
  ffmpeg.FS("writeFile", "EtubeRecording.webm", await fetchFile(videoFile)); // videoFile is a blob created by createObjectURL
  // convert the webinto mp4
  await ffmpeg.run("-i", "EtubeRecording.webm", "-r", "60", "output.mp4");

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

// Recording feature is currently disabled for deployed version as it is still being made.
// To enable the incomplete version, uncomment the init and front-end components on upload.pug 
// init();

startBtn.addEventListener("click", handleStart);