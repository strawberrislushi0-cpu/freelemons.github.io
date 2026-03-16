let mediaRecorder;
let audioChunks = [];
let audioBlob;

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const downloadBtn = document.getElementById("download");
const audioPlayback = document.getElementById("audioPlayback");

const themeToggle = document.getElementById("themeToggle");


// Theme system

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){

document.body.classList.add("dark");

}

themeToggle.addEventListener("click", () => {

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

localStorage.setItem("theme","dark");

}else{

localStorage.setItem("theme","light");

}

});




// Start recording

startBtn.addEventListener("click", async () => {

const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

mediaRecorder = new MediaRecorder(stream);

mediaRecorder.start();

audioChunks = [];

mediaRecorder.ondataavailable = event => {

audioChunks.push(event.data);

};

mediaRecorder.onstop = () => {

audioBlob = new Blob(audioChunks, { type: "audio/wav" });

const audioURL = URL.createObjectURL(audioBlob);

audioPlayback.src = audioURL;

downloadBtn.disabled = false;

};

startBtn.disabled = true;
stopBtn.disabled = false;

});




// Stop recording

stopBtn.addEventListener("click", () => {

mediaRecorder.stop();

startBtn.disabled = false;
stopBtn.disabled = true;

});




// Download recording

downloadBtn.addEventListener("click", () => {

const link = document.createElement("a");

link.href = URL.createObjectURL(audioBlob);

link.download = "recording.wav";

link.click();

});
