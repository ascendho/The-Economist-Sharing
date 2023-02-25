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
const listBtn = document.getElementById('list');
let playList = document.querySelectorAll('.listset');
const listModal = document.querySelector('.listModal');

let songs = '';
const artistVal = 'The Economist';

// Check if Playing
let isPlaying = false;

let songName = (new URLSearchParams(location.search)).get('name');
let songIndex = -1;

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

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = artistVal;
    music.src = `../../audios/${song.name}.mp3`;
    image.src = `../../audios/cover/${song.name}.jpg`;
}

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

// calculate time
function calculate(time) {
    return [Math.floor(time / 60), `${Math.floor(time % 60)}`.padStart(2, '0')];
}

// Update Progress Bar & Time
function updateProgressBar(e) {
    // console.log("invoked!");
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
    // console.log('invoked!');

    // console.log(e);
    // console.log(this===e.target)
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
    !isPlaying && playSong();
    // if (!isPlaying)
    //     playSong();
}

function showList() {
    //toggle between opened and unopened
    let count = 0, maxCount = 4;
    let page = 0;
    listModal.classList.remove('hidden');
    songs.forEach(song => {
        let html = '';
        if (songs[songIndex].displayName === song.displayName)
            html = `<p class="audio curplaying">${song.displayName}.mp3</p>`;
        else
            html = `<p class="audio">${song.displayName}.mp3</p>`;
        playList[page].insertAdjacentHTML('beforeend', html);
        count++;
        if (count === maxCount) {
            playList[page].insertAdjacentHTML('afterend', '<div class="listset hidden"></div>');
            playList = document.querySelectorAll('.listset');
            page++;
            console.log(playList);
            count = 0;
        }

    });

}

async function accessData() {
    const res = await fetch('https://ebvvkimmpybapqtxypfm.supabase.co/rest/v1/Songs', {
        headers: {
            apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVidnZraW1tcHliYXBxdHh5cGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY3OTQ3MjYsImV4cCI6MTk5MjM3MDcyNn0.LZ87nhdYaIe7xlHJWgcM3-XIcskshwNtIF1ldkYAM_I',
            authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVidnZraW1tcHliYXBxdHh5cGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY3OTQ3MjYsImV4cCI6MTk5MjM3MDcyNn0.LZ87nhdYaIe7xlHJWgcM3-XIcskshwNtIF1ldkYAM_I',

        }
    });
    songs = await res.json();
    console.log(songs);
}

async function initialSetup() {
    await accessData();
    songIndex = songs.findIndex(s => s.name === songName);
    console.log(songIndex);
    if (songIndex >= 0) {
        loadSong(songs[songIndex]);
        playSong();
    } else {
        songIndex = 0;
        loadSong(songs[songIndex]);
        currentTimeEl.textContent = '';
        durationEl.textContent = '';
    }
}

initialSetup();

// Event Listeners
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
// listBtn.addEventListener('click', showList);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);


// Music
// const songs = [
//     {
//         name: '20230119',
//         displayName: '20230119',
//     },
//
//     {
//         name: '20230203',
//         displayName: '20230203',
//     },
//     {
//         name: '20230207',
//         displayName: '20230207',
//     },
//     {
//         name: '20230210',
//         displayName: '20230210',
//     },
//     {
//         name: '20230214',
//         displayName: '20230214',
//     },
//     {
//         name: '20230216',
//         displayName: '20230216',
//     },
//     {
//         name: '20230218',
//         displayName: '20230218',
//     },
//
//     {
//         name: '20230219',
//         displayName: '20230219',
//     },

//     {    name: '20230200',
//         displayName: '20230222',
//     },
// ];