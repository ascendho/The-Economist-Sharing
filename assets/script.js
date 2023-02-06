'use strict';

const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');
const currentYear = new Date().getFullYear();
let formattedDate = '';

//get created time
function getCreatedTime(repo) {
    fetch(`https://api.github.com/repos/ascendho/${repo}`).then(function (response) {
            return response.json();
        }
    ).then(function (data) {
        // console.log(data.created_at);
        formattedDate = new Date(data.created_at);
    })
}


// Update countdown time
function updateCountdown() {
    const currentTime = new Date();
    const diff = currentTime - formattedDate;

    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    const h = Math.floor(diff / 1000 / 60 / 60) % 24;
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;

    // Add values to DOM
    days.innerHTML = d;
    hours.innerHTML = h < 10 ? '0' + h : h;
    minutes.innerHTML = m < 10 ? '0' + m : m;
    seconds.innerHTML = s < 10 ? '0' + s : s;
}

// Show spinner before countdown
setTimeout(() => {
    loading.remove();
    countdown.style.display = 'flex';
}, 1000);


getCreatedTime('English-Reading-The-Economist');
// Run every second
setInterval(updateCountdown, 1000);