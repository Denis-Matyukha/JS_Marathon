import {
    $formFight
} from './constants.js';
import {
    getRandom,
    causedDamage,
    checkWinners,
    generateLogs,
    enemyAttack,
    playerAttack
} from './index.js';
import {
    Player
} from './player.js';

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

        const getPlayer2 = async () => {
            if (localStorage.getItem('player2') === null) {
                let p2 = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
                console.log(`alarm_0`);
                console.log(p2);
                localStorage.setItem('player2', JSON.stringify(p2));
                return p2;
            } else {
                let p2 = JSON.parse(localStorage.getItem('player2'));
                console.log(`alarm_1`);
                console.log(JSON.parse(localStorage.getItem('player2')));
                console.log(localStorage);
                console.log(p2);
                return p2;
            };
        };

        let p1 = JSON.parse(localStorage.getItem('player1'));
        let p2 = await getPlayer2();

        player1 = new Player({
            ...p1,
            player: 1,
            rootSelector: 'arenas',
        });

        player2 = new Player({
            ...p2,
            // ...(await getPlayer2()),
            player: 2,
            rootSelector: 'arenas',
        });
        // console.log(`player2`);
        // console.log(player2);

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