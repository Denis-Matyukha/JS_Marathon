import {$formFight} from '../constants/index.js';
import {player1, player2, causedDamage, checkWinners, generateLogs, enemyAttack, playerAttack} from './index.js';

export class Game {

    start = () => {
        player1.createPlayer();
        player2.createPlayer();
        
        $formFight.addEventListener('submit', function (e) {
            e.preventDefault();
        
            const enemy = enemyAttack();
            const attack = playerAttack();
        
            causedDamage.call(attack, attack.hit, enemy.defence);
            causedDamage.call(enemy, enemy.hit, attack.defence);
        
            checkWinners();
        });
        
        generateLogs('start', player1, player2);
    }
};