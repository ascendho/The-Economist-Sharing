'use strict';

import {createClient} from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient('https://ebvvkimmpybapqtxypfm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVidnZraW1tcHliYXBxdHh5cGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY3OTQ3MjYsImV4cCI6MTk5MjM3MDcyNn0.LZ87nhdYaIe7xlHJWgcM3-XIcskshwNtIF1ldkYAM_I')

// const left = document.querySelector('.left');
// const right = document.querySelector('.right');

const body = document.querySelector('body');
const footer = document.querySelector('footer');
const loader = document.querySelector('.loader');
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');
const tbody = document.querySelector('tbody');
let themes = [], topics = [], names = [], ids = [], dataSet = [], audio = [], html = '', iconSrc;

async function loadData() {
    let query = supabase.from('articleInfo').select('*');
    let {data: articleInfo, error} = await query.order('id', {ascending: true});
    return articleInfo;

}

function updateUI() {

    dataSet.forEach((data, i) => {
        html = `<tr>
        <td><a class="displayName" href="../../articles/${names[i]}.pdf" target="_blank">${names[i]}</a></td>
        <td class="theme">${themes[i]}</td>
        <td class="topic">${topics[i]}</td>
        <td>${audio[i] ? `<a class="audio" href="../player/player.html?name=${names[i]}" target="_blank"> <img class="playerIcon" width="25px" height="25px" src="${audio[i] ? '../../../img/play-outline.svg' : '../../img/no-entry.png'}" alt="audio"></a>` : `<img class="noAudio" width="20px" height="20px" src="${audio[i] ? '../../../img/play-outline.svg' : '../../img/no-entry.png'}" alt="audio">`}</td>
    </tr>`;
        tbody.insertAdjacentHTML('beforeend', html);

    })
}

function loading(isLoading) {
    isLoading ? loader.classList.remove("hidden") : loader.classList.add("hidden");
}

async function initialSetup() {
    loading(true);
    dataSet = await loadData();
    console.log(dataSet);
    themes = dataSet.map((element) => element.theme);
    topics = dataSet.map((element) => element.topic);
    names = dataSet.map((element) => element.displayName);
    audio = dataSet.map((element) => element.audio);

    updateUI();
    loading(false);
    // console.log(audio);
    // console.log('articleInfo:', dataSet);
    // console.log("themes:", themes);
    // console.log("topics:", topics);
    // console.log("names:", names);

}

function darkMode() {
    body.style.backgroundColor = '#0b7285';
    toggleIcon.children[0].textContent = 'Dark Mode';
    toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
    footer.style.color = '#f8f9fa';
}

function lightMode() {
    body.style.backgroundColor = '#96f2d7';
    toggleIcon.children[0].textContent = 'Light Mode';
    toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    footer.style.color = '#38464d';
}

function switchTheme(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        darkMode();
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        lightMode();
    }
}

initialSetup();

toggleSwitch.addEventListener('change', switchTheme);

// Check Local Storage For Theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        darkMode();
    }
}