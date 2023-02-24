'use strict';

import {createClient} from 'https://esm.sh/@supabase/supabase-js@2';
const supabase = createClient('https://ebvvkimmpybapqtxypfm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVidnZraW1tcHliYXBxdHh5cGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY3OTQ3MjYsImV4cCI6MTk5MjM3MDcyNn0.LZ87nhdYaIe7xlHJWgcM3-XIcskshwNtIF1ldkYAM_I')

async function getData() {
    let query = supabase.from('articleInfo').select('*');

    let {data: articleInfo, error} = await query.order('id', {ascending: true});
    console.log('articleInfo:', articleInfo);

}

getData();

const left = document.querySelector('.left');
const right = document.querySelector('.right');

const themeField = document.querySelectorAll('.theme');
const topicField = document.querySelectorAll('.topic');
const nameField = document.querySelectorAll('.displayName');

let fieldVal = '';
let themes, topics, names, ids;

const html = `  <tr>
        <td><a class="displayName" href="../../articles/${2}.pdf" target="_blank">20230219</a></td>
        <td class="theme">Culture</td>
        <td class="topic">Johnson</td>
        <td><a class="audio" href="../player/player.html?name=20230219" target="_blank"><img class="playerIcon"
                                                                                             width="25px"
                                                                                             height="25px"
                                                                                             src="../../img/play-outline.svg"
                                                                                             alt="audio"></a></td>
    </tr>`;


async function accessInfo() {
    const res = await fetch('https://ebvvkimmpybapqtxypfm.supabase.co/rest/v1/articleInfo', {
        headers: {
            apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVidnZraW1tcHliYXBxdHh5cGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY3OTQ3MjYsImV4cCI6MTk5MjM3MDcyNn0.LZ87nhdYaIe7xlHJWgcM3-XIcskshwNtIF1ldkYAM_I',
            authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVidnZraW1tcHliYXBxdHh5cGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY3OTQ3MjYsImV4cCI6MTk5MjM3MDcyNn0.LZ87nhdYaIe7xlHJWgcM3-XIcskshwNtIF1ldkYAM_I',
        }
    });
    fieldVal = await res.json();


    themes = fieldVal.map(val => val.theme);
    topics = fieldVal.map(val => val.topic);
    names = fieldVal.map(val => val.displayName);
    ids = fieldVal.map(val => val.id);

    // console.log(themes)
    // console.log(topics)
    // console.log(names)
    // console.log(ids);
    // console.log(fieldVal);
}

accessInfo();

// console.log(fieldVal);

async function initialSetup() {
    await accessInfo();

}

function assignValue(fields, type = 'theme') {
    const values = fieldVal.map(val => {
        val.theme;
    })
    fields.forEach(field => {
        field.textContent = fieldVal;
    })
}





