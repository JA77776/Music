const audio = new Audio();
const playlist = document.getElementById('playlist');
const tracks = playlist.getElementsByTagName('li');
const currentTrackInput = document.getElementById('current-track');
const playPauseButton = document.getElementById('play-pause');
const volumeControl = document.getElementById('volume');
const progressBar = document.getElementById('progress');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
let currentTrack = 0;
let isPlaying = false;

// Load the first track
loadTrack(currentTrack);

// Event listeners for the previous and next buttons
document.getElementById('prev').addEventListener('click', () => {
    currentTrack = (currentTrack > 0) ? currentTrack - 1 : tracks.length - 1;
    loadTrack(currentTrack);
    audio.play();
    updatePlayPauseButton();
});

document.getElementById('next').addEventListener('click', () => {
    currentTrack = (currentTrack < tracks.length - 1) ? currentTrack + 1 : 0;
    loadTrack(currentTrack);
    audio.play();
    updatePlayPauseButton();
});

// Event listener for the playlist items
for (let i = 0; i < tracks.length; i++) {
    tracks[i].addEventListener('click', () => {
        currentTrack = i;
        loadTrack(currentTrack);
        audio.play();
        updatePlayPauseButton();
    });
}

// Function to load a track
function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.getAttribute('data-src');
    for (let i = 0; i < tracks.length; i++) {
        tracks[i].classList.remove('active');
    }
    track.classList.add('active');
    currentTrackInput.value = track.textContent;
    audio.addEventListener('loadedmetadata', () => {
        progressBar.max = audio.duration;
        durationDisplay.textContent = formatTime(audio.duration);
    });
}

// Play/pause toggle
playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    updatePlayPauseButton();
});

audio.addEventListener('play', () => {
    isPlaying = true;
    updatePlayPauseButton();
});

audio.addEventListener('pause', () => {
    isPlaying = false;
    updatePlayPauseButton();
});



audio.addEventListener('timeupdate', () => {
    progressBar.value = audio.currentTime;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value;
});

// Update play/pause button text
function updatePlayPauseButton() {
    playPauseButton.textContent = isPlaying ? 'Pause' : 'Play';
}

// Volume control
volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

// Format time in minutes and seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
