import { $arenas, $formFight, $chat, LOGS, ATTACK, HIT } from './constants.js';
import { player1, player2 } from './game.js';

const {
    start: logStart,
    end: logEnd,
    hit: logHit,
    defence: logDefence,
    draw: logDraw
} = LOGS;


export const getRandom = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);


export const generateLogs = (type, {name: playerName1 } = {}, { name: playerNmae2, hp: playerHp2} = {}, damageLevel = 0) => {
    let text = '';
    let logIndex = 0;
    let currentTime = new Date;

    let splitHours = currentTime.getHours() < 10 ? '0' : '';
    let splitMinutes = currentTime.getMinutes() < 10 ? '0' : '';

    switch (type) {
        case 'start':
            text = logStart
                .replace('[time]', `${splitHours}${currentTime.getHours()}:${splitMinutes}${currentTime.getMinutes()}`)
                .replace('[player1]', playerName1)
                .replace('[player2]', playerNmae2);
            break;
        case 'end':
            logIndex = getRandom(0, logEnd.length - 1);
            text = logEnd[logIndex]
                .replace('[playerWins]', playerName1)
                .replace('[playerLose]', playerNmae2);
            break;
        case 'hit':
            logIndex = getRandom(0, logHit.length - 1);
            text = `
                ${splitHours}${currentTime.getHours()}:${splitMinutes}${currentTime.getMinutes()} — 
                ${logHit[logIndex]
                    .replace('[playerKick]', playerName1)
                    .replace('[playerDefence]', playerNmae2)}
                -${damageLevel}
                 [${playerHp2}/100]
                    `;
            break;
        case 'defence':
            logIndex = getRandom(0, logDefence.length - 1);
            text = `
                ${splitHours}${currentTime.getHours()}:${splitMinutes}${currentTime.getMinutes()} — 
                ${logDefence[logIndex]
                    .replace('[playerKick]', playerName1)
                    .replace('[playerDefence]', playerNmae2)}
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


export const enemyAttack = () => {
    const hit = ATTACK[getRandom(0, ATTACK.length - 1)];
    const defence = ATTACK[getRandom(0, ATTACK.length - 1)];

    return {
        id: 2,
        value: getRandom(0, HIT[hit]),
        hit,
        defence,
    }
};


export const playerAttack = () => {
    const attack = {
        id: 1,
    };

    for (let item of $formFight) {

        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(0, HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        // item.checked = false;
    }

    return attack;
};


export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
};


export const createReloadButton = () => {
    let $reloadWrap = createElement('div', 'reloadWrap');
    let $reloadBtn = createElement('button', 'button');
    $reloadBtn.innerText = 'Restart';
    $reloadWrap.appendChild($reloadBtn);

    $reloadBtn.addEventListener('click', function () {
        // window.location.reload();
        // localStorage.getItem('player2')
        localStorage.removeItem('player2');
        window.location.pathname = '../index.html';
    })

    return $reloadWrap;
};


export const createWinnerTitle = (name) => {
    const $winTitle = createElement('div', 'loseTitle');

    if (name) {
        $winTitle.innerText = `${name} wins`;
    } else {
        $winTitle.innerText = `draw`;
    }

    $arenas.appendChild(createReloadButton());
    return $winTitle;
};


export const causedDamage = function ({id, hit, value}, {defence}) {    

    let damager = id === 1 ? player1 : player2;
    let victim = id === 1 ? player2 : player1;

    if (hit !== defence) {
        victim.changeHP(value, value);
        victim.renderHP();
        generateLogs('hit', damager, victim, value);

    } else if (hit === defence) {
        generateLogs('defence', damager, victim);
    }
};


export const checkWinners = () => {
    if (player1.hp === 0 || player2.hp === 0) {
        for (let item of $formFight) {
            item.disabled = 'true';
        };
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(createWinnerTitle(player2.name));
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(createWinnerTitle(player1.name));
        generateLogs('end', player1, player2);
    } else if (player2.hp === 0 && player1.hp === 0) {
        $arenas.appendChild(createWinnerTitle());
        generateLogs('draw');
    }
};