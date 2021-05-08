import {
    $formFight
} from './constants.js';
import {
    causedDamage,
    checkWinners,
    generateLogs,
    playerAttack
} from './index.js';
import {
    Player
} from './player.js';

export let player1;
export let player2;
export class Game {

    start = async () => {

        const getPlayer2 = async () => {
            if (localStorage.getItem('player2') === null) {
                let p2 = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
                localStorage.setItem('player2', JSON.stringify(p2));
                return p2;
            } else {
                let p2 = JSON.parse(localStorage.getItem('player2'));
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
            player: 2,
            rootSelector: 'arenas',
        });

        player1.createPlayer();
        player2.createPlayer();

        $formFight.addEventListener('submit', async function (e) {
            e.preventDefault();

            const attack = playerAttack();

            const {
                hit,
                defence
            } = attack;

            const q = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
                method: 'POST',
                body: JSON.stringify({
                    hit,
                    defence,
                })
            }).then(res => res.json());

            q.player1 = {
                id: 1,
                ...q.player1,
            };

            q.player2 = {
                id: 2,
                ...q.player2,
            };

            const {
                player1,
                player2
            } = q;

            causedDamage(player1, player2);
            causedDamage(player2, player1);

            checkWinners();
        });

        generateLogs('start', player1, player2);
    }

};