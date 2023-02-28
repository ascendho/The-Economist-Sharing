'use strict';

import {createClient} from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient('https://ebvvkimmpybapqtxypfm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVidnZraW1tcHliYXBxdHh5cGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY3OTQ3MjYsImV4cCI6MTk5MjM3MDcyNn0.LZ87nhdYaIe7xlHJWgcM3-XIcskshwNtIF1ldkYAM_I')

// const left = document.querySelector('.left');
// const right = document.querySelector('.right');

const tbody = document.querySelector('tbody');
let themes = [], topics = [], names = [], ids = [], dataSet = [], audio = [], html = '', iconSrc;

async function loadData() {
    let query = supabase.from('articleInfo').select('*');
    let {data: articleInfo, error} = await query.order('id', {ascending: true});
    return articleInfo;

}

async function initialSetup() {
    dataSet = await loadData();
    themes = dataSet.map((element) => element.theme);
    topics = dataSet.map((element) => element.topic);
    names = dataSet.map((element) => element.displayName);
    audio = dataSet.map((elment) => elment.audio);

    updateUI();

    // console.log(audio);
    // console.log('articleInfo:', dataSet);
    // console.log("themes:", themes);
    // console.log("topics:", topics);
    // console.log("names:", names);

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

initialSetup();