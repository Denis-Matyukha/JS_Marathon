import {$formFight} from '../constants/index.js';
import { getRandom, causedDamage, checkWinners, generateLogs, enemyAttack, playerAttack } from './index.js';
import { Player } from './player.js';

export let player1;
export let player2;

export class Game {

    getPlayers = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
        return body;
    }

    start = async () => {

        const players = await this.getPlayers();

        console.log(players);

        const p1 = players[getRandom(0, players.length - 1)];
        const p2 = players[getRandom(0, players.length - 1)];

        player1 = new Player({
                ...p1,
                player: 1,
                rootSelector: 'arenas',
        });

        player2 = new Player({
                ...p2,
                player: 2,
                rootSelector: 'arenas',
        });

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