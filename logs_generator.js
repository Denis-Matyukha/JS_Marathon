import {
    $chat
} from './elements.js'

import {
    logStart,
    logEnd,
    logHit,
    logDefence,
    logDraw
} from './main.js';

import {
    getRandom
} from './randomiser.js';

export const generateLogs = (type, player1 = {}, player2 = {}, damageLevel = 0) => {
    let text = '';
    let logIndex = 0;
    let currentTime = new Date;

    let splitHours = currentTime.getHours() < 10 ? '0' : '';
    let splitMinutes = currentTime.getMinutes() < 10 ? '0' : '';

    switch (type) {
        case 'start':
            text = logStart
                .replace('[time]', `${splitHours}${currentTime.getHours()}:${splitMinutes}${currentTime.getMinutes()}`)
                .replace('[player1]', player1.name)
                .replace('[player2]', player2.name);
            break;
        case 'end':
            logIndex = getRandom(0, logEnd.length - 1);
            text = logEnd[logIndex]
                .replace('[playerWins]', player1.name)
                .replace('[playerLose]', player2.name);
            break;
        case 'hit':
            logIndex = getRandom(0, logHit.length - 1);
            text = `
                ${splitHours}${currentTime.getHours()}:${splitMinutes}${currentTime.getMinutes()} — 
                ${logHit[logIndex]
                    .replace('[playerKick]', player1.name)
                    .replace('[playerDefence]', player2.name)}
                -${damageLevel}
                 [${player2.hp}/100]
                    `;
            break;
        case 'defence':
            logIndex = getRandom(0, logDefence.length - 1);
            text = `
                ${splitHours}${currentTime.getHours()}:${splitMinutes}${currentTime.getMinutes()} — 
                ${logDefence[logIndex]
                    .replace('[playerKick]', player1.name)
                    .replace('[playerDefence]', player2.name)}
                    `;
            break;
        case 'draw':
            text = logDraw;
            break;
        default:
            text = 'Что-то происходит... Но что?...';
            break;
    }

    const el = `<p>${text}</p>`;

    $chat.insertAdjacentHTML('afterbegin', el);
};