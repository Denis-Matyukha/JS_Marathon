import {$formFight} from '../constants/index.js';
import { causedDamage, checkWinners, generateLogs, enemyAttack, playerAttack } from './index.js';
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

export class Game {

    start = () => {
        player1.createPlayer();
        player2.createPlayer();
        
        $formFight.addEventListener('submit', function (e) {
            e.preventDefault();
        
            const enemy = enemyAttack();
            const attack = playerAttack();
        
            causedDamage(attack, enemy);
            causedDamage(enemy, attack);
        
            checkWinners();
        });
        
        generateLogs('start', player1, player2);
    }
    
};