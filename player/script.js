'use strict';
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


// console.log(document.querySelector('.player-container').textContent);
// console.log(document.querySelector('.player-container').innerHTML);
// Music
const songs = [
    {
        name: '20230207',
        displayName: '20230207',
        artist: 'The Economist',
    },
    {
        name: '20230210',
        displayName: '20230210',
        artist: 'The Economist',
    },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `../audios/${song.name}.mp3`;
    image.src = `../audios/cover/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// calculate time
function calculate(time) {
    return [Math.floor(time / 60), `${Math.floor(time % 60)}`.padStart(2, '0')];
}

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const {duration, currentTime} = e.target;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const [durationMinutes, durationSeconds] = calculate(duration, currentTime);

        // const durationMinutes = Math.floor(duration / 60);
        // const durationSeconds = `${Math.floor(duration % 60)}`.padStart(2, '0');
        // if (durationSeconds < 10) {
        //     durationSeconds = `0${durationSeconds}`;
        // }
        // Delay switching duration Element to avoid NaN
        if (durationMinutes) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for currentTime
        const [currentMinutes, currentSeconds] = calculate(currentTime);

        // const currentMinutes = Math.floor(currentTime / 60);
        // const currentSeconds = `${Math.floor(currentTime % 60)}`.padStart(2, '0');
        // if (currentSeconds < 10) {
        //     currentSeconds = `0${currentSeconds}`;
        // }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
    if (!isPlaying)
        playSong();
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
