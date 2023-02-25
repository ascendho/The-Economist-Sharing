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
        iconSrc = audio[i] ? '../../../img/play-outline.svg' : '../../img/no-entry.png';
        html = `<tr>
        <td><a class="displayName" href="../../articles/${names[i]}.pdf" target="_blank">${names[i]}</a></td>
        <td class="theme">${themes[i]}</td>
        <td class="topic">${topics[i]}</td>
        <td><a class="audio" href="../player/player.html?name=${names[i]}" target="_blank"> <img class="playerIcon" width="25px" height="25px" src="${iconSrc}" alt="audio">
      </a></td>
    </tr>`;
        tbody.insertAdjacentHTML('beforeend', html);

    })


}

initialSetup();


/*
<!--    <tr>-->
<!--        <td><a class="displayName" href="../../articles/20230119.pdf" target="_blank">20230119</a></td>-->

<!--        <td class="theme">Leaders</td>-->
<!--        <td class="topic">The laws of nature</td>-->
<!--        <td><a class="audio" href="../player/player.html?name=20230119" target="_blank"><img class="playerIcon"-->
<!--                                                                                             width="25px"-->
<!--                                                                                             height="25px"-->
<!--                                                                                             src="../../img/play-outline.svg"-->
<!--                                                                                             alt="audio">-->
<!--        </a></td>-->
<!--    </tr>-->
<!--    <tr>-->
<!--        <td><a class="displayName" href="../../articles/20230123.pdf" target="_blank">20230123</a></td>-->
<!--        <td class="theme">By Invitation</td>-->
<!--        <td class="topic">Russia and Ukraine</td>-->
<!--        <td>-->
<!--            <svg width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"-->
<!--                 stroke-width="1.5" stroke="currentColor" class="w-6 h-6">-->
<!--                <path stroke-linecap="round" stroke-linejoin="round"-->
<!--                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>-->
<!--            </svg>-->
<!--        </td>-->
<!--    </tr>-->
<!--    <tr>-->
<!--        <td><a class="displayName" href="../../articles/20230126.pdf" target="_blank">20230126</a></td>-->
<!--        <td class="theme">Science & technology</td>-->
<!--        <td class="topic"> Archers and heart rates</td>-->
<!--        <td>-->
<!--            <svg width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"-->
<!--                 stroke-width="1.5" stroke="currentColor" class="w-6 h-6">-->
<!--                <path stroke-linecap="round" stroke-linejoin="round"-->
<!--                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>-->
<!--            </svg>-->
<!--        </td>-->
<!--    </tr>-->
<!--    <tr>-->
<!--        <td><a class="displayName" href="../../articles/20230203.pdf" target="_blank">20230203</a></td>-->
<!--        <td class="theme">Business</td>-->
<!--        <td class="topic">Mark to market</td>-->
<!--        <td><a class="audio" href="../player/player.html?name=20230203" target="_blank"><img class="playerIcon"-->
<!--                                                                                             width="25px"-->
<!--                                                                                             height="25px"-->
<!--                                                                                             src="../../img/play-outline.svg"-->
<!--                                                                                             alt="audio"></a></td>-->
<!--    </tr>-->
<!--    <tr>-->
<!--        <td><a class="displayName" href="../../articles/20230207.pdf" target="_blank">20230207</a></td>-->
<!--        <td class="theme">Business</td>-->
<!--        <td class="topic">Bartleby</td>-->
<!--        <td><a class="audio" href="../player/player.html?name=20230207" target="_blank"><img class="playerIcon"-->
<!--                                                                                             width="25px"-->
<!--                                                                                             height="25px"-->
<!--                                                                                             src="../../img/play-outline.svg"-->
<!--                                                                                             alt="audio"></a></td>-->
<!--    </tr>-->
<!--    <tr>-->
<!--        <td><a class="displayName" href="../../articles/20230210.pdf" target="_blank">20230210</a></td>-->
<!--        <td class="theme">Leaders</td>-->
<!--        <td class="topic">Wanted: severe contests</td>-->
<!--        <td><a class="audio" href="../player/player.html?name=20230210" target="_blank"><img class="playerIcon"-->
<!--                                                                                             width="25px"-->
<!--                                                                                             height="25px"-->
<!--                                                                                             src="../../img/play-outline.svg"-->
<!--                                                                                             alt="audio"></a></td>-->
<!--    </tr>-->
<!--    <tr>-->
<!--        <td><a class="displayName" href="../../articles/20230214.pdf" target="_blank">20230214</a></td>-->
<!--        <td class="theme">Leaders</td>-->
<!--        <td class="topic"> Search engines</td>-->
<!--        <td><a class="audio" href="../player/player.html?name=20230214" target="_blank"><img class="playerIcon"-->
<!--                                                                                             width="25px"-->
<!--                                                                                             height="25px"-->
<!--                                                                                             src="../../img/play-outline.svg"-->
<!--                                                                                             alt="audio"></a></td>-->
<!--    </tr>-->

<!--    <tr>-->
<!--        <td><a class="displayName" href="../../articles/20230216.pdf" target="_blank">20230216</a></td>-->
<!--        <td class="theme">Finance & economics</td>-->
<!--        <td class="topic">Property</td>-->
<!--        <td><a class="audio" href="../player/player.html?name=20230216" target="_blank"><img class="playerIcon"-->
<!--                                                                                             width="25px"-->
<!--                                                                                             height="25px"-->
<!--                                                                                             src="../../img/play-outline.svg"-->
<!--                                                                                             alt="audio"></a></td>-->
<!--    </tr>-->

<!--    <tr>-->
<!--        <td><a class="displayName" href="../../articles/20230218.pdf" target="_blank">20230218</a></td>-->
<!--        <td class="theme">International</td>-->
<!--        <td class="topic">Education in a can</td>-->
<!--        <td><a class="audio" href="../player/player.html?name=20230218" target="_blank"><img class="playerIcon"-->
<!--                                                                                             width="25px"-->
<!--                                                                                             height="25px"-->
<!--                                                                                             src="../../img/play-outline.svg"-->
<!--                                                                                             alt="audio"></a></td>-->
<!--    </tr>-->

<!--    <tr>-->
<!--        <td><a class="displayName" href="../../articles/20230219.pdf" target="_blank">20230219</a></td>-->
<!--        <td class="theme">Culture</td>-->
<!--        <td class="topic">Johnson</td>-->
<!--        <td><a class="audio" href="../player/player.html?name=20230219" target="_blank"><img class="playerIcon"-->
<!--                                                                                             width="25px"-->
<!--                                                                                             height="25px"-->
<!--                                                                                             src="../../img/play-outline.svg"-->
<!--                                                                                             alt="audio"></a></td>-->
<!--    </tr>-->

<!--    <tr>-->
<!--        <td><a class="displayName" href="../../articles/20230222.pdf" target="_blank">20230222</a></td>-->
<!--        <td class="theme">Britain</td>-->
<!--        <td class="topic">Track records</td>-->
<!--        <td><a class="audio" href="../player/player.html?name=20230222" target="_blank"><img class="playerIcon"-->
<!--                                                                                             width="25px"-->
<!--                                                                                             height="25px"-->
<!--                                                                                             src="../../img/play-outline.svg"-->
<!--                                                                                             alt="audio"></a></td>-->
<!--    </tr>-->
*/
