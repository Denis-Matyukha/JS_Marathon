import {$arenas, $formFight, $chat, HIT, ATTACK, LOGS} from './constants/index.js';

import {causedDamage, checkWinners, createWinnerTitle, createReloadButton, createElement, getRandom, generateLogs, enemyAttack, playerAttack} from './utils/index.js';

import { Player } from './player.js';

export const player1 = new Player({
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['rope', 'sword'],
    rootSelector: 'arenas',
});

export const player2 = new Player({
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['cudgel', 'knife'],
    rootSelector: 'arenas',
});






// game: 
player1.createPlayer();
player2.createPlayer();

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();

    const enemy = enemyAttack();
    const attack = playerAttack();

    // ↓ деструктуризацию здесь решил не применять, 
    // ↓ так как в causedDamage() передается и сам объект enemy и затем объект attack
    // ↓ а обратиться к ним самим, если их деструктуризировать - не получится.
    causedDamage.call(attack, attack.hit, enemy.defence);
    causedDamage.call(enemy, enemy.hit, attack.defence);

    checkWinners();
});

generateLogs('start', player1, player2);