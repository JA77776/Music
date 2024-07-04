const audio = document.getElementById('audio');
const playlist = document.getElementById('playlist');
const tracks = playlist.getElementsByTagName('li');
const currentTrackInput = document.getElementById('current-track');
let currentTrack = 0;

// Load the first track
loadTrack(currentTrack);

// Event listeners for the previous and next buttons
document.getElementById('prev').addEventListener('click', () => {
    currentTrack = (currentTrack > 0) ? currentTrack - 1 : tracks.length - 1;
    loadTrack(currentTrack);
    audio.play();
});

document.getElementById('next').addEventListener('click', () => {
    currentTrack = (currentTrack < tracks.length - 1) ? currentTrack + 1 : 0;
    loadTrack(currentTrack);
    audio.play();
});

// Event listener for the playlist items
for (let i = 0; i < tracks.length; i++) {
    tracks[i].addEventListener('click', () => {
        currentTrack = i;
        loadTrack(currentTrack);
        audio.play();
    });
}

// Function to load a track
function loadTrack(index) {
    audio.src = tracks[index].getAttribute('data-src');
    
    for (let i = 0; i < tracks.length; i++) {
        tracks[i].classList.remove('active');
    }
    tracks[index].classList.add('active');
    currentTrackInput.value = tracks[index].textContent;
}





