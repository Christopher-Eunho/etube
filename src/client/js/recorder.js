/* 
Handle video recording in upload page
Mainly use Media Capture and Streams API
https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API

*/

const startBtn = document.getElementById("startBtn");

const handleStart = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  console.log(stream);
  console.log("sds");
};

startBtn.addEventListener("click", handleStart);