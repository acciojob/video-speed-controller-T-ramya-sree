const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress_filled');
const toggle = document.querySelector('.player_button');
const volume = document.querySelector('.volume');
const playbackSpeed = document.querySelector('.playbackSpeed');
const rewind = document.querySelector('.rewind');
const skip = document.querySelector('.skip');
function togglePlay() {
   if (video.paused) {
       video.play();
   } else {
       video.pause();
   }
}
function updateButton() {
   if (video.paused) {
       toggle.textContent = '►';
   } else {
       toggle.textContent = '❚❚';
   }
}
function handleRangeUpdate() {
   video[this.name] = this.value;
}
function updateProgress() {
   const percent = (video.currentTime / video.duration) * 100;
   progressFilled.style.flexBasis = `${percent}%`;
}
function scrub(e) {
   const scrubTime =
       (e.offsetX / progress.offsetWidth) * video.duration;
   video.currentTime = scrubTime;
}
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgress);
volume.addEventListener('change', handleRangeUpdate);
volume.addEventListener('mousemove', handleRangeUpdate);
playbackSpeed.addEventListener('change', handleRangeUpdate);
playbackSpeed.addEventListener('mousemove', handleRangeUpdate);
rewind.addEventListener('click', function () {
   video.currentTime -= 10;
});
skip.addEventListener('click', function () {
   video.currentTime += 25;
});
let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', function (e) {
   if (mouseDown) {
       scrub(e);
   }
});
progress.addEventListener('mousedown', function () {
   mouseDown = true;
});
progress.addEventListener('mouseup', function () {
   mouseDown = false;
});