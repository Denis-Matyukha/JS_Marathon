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

        // console.log(players);

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
            // console.log(`attack ↓`);
            // console.log(attack);
            
            const enemy = enemyAttack();
            // console.log(`enemy ↓`);
            // console.log(enemy);

            /*  initial values

            attack ↓
            {id: 1, value: 6, hit: "head", defence: "head"}

            enemy ↓
            {id: 2, value: 7, hit: "foot", defence: "foot"}

            const {
                start: logStart,
                end: logEnd,
                hit: logHit,
                defence: logDefence,
                draw: logDraw
            } = LOGS;

            */

           const {id, value, hit, defence} = attack;

           const q = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight',{
               method: 'POST',
               body: JSON.stringify({
                   hit,
                    defence,
               })
            // });
           }).then(res => res.json());
           console.log(`q-Succsess↑↓`);
           /*
           {
            player1: {value: 17, hit: "foot", defence: "foot"}
            player2: {value: 4, hit: "head", defence: "body"}
           }
           */
        //   q.then(res => console.log(res.json()));
        console.log(q);

        console.log(`### `);

        console.log(q.player1);
        console.log(q.player2);

        console.log(`###2`);

        q.player1 = {
            id:1,
            ...q.player1,
        };

        q.player2 = {
            id:2,
            ...q.player2,
        };

        const {player1, player2} = q;

        /**
         * 
         *  attack ↓
            {id: 1, value: 6, hit: "head", defence: "head"}
            enemy ↓
            {id: 2, value: 7, hit: "foot", defence: "foot"}
            
            {id: 1, value: 11, hit: "foot", defence: "foot"}
            {id: 2, value: 9, hit: "body", defence: "foot"}
         */

        console.log(q.player1);
        console.log(q.player2);


            // task3
            // causedDamage(attack, enemy);
            // causedDamage(enemy, attack);

            causedDamage(player1, player2);
            causedDamage(player2, player1);

            checkWinners();
        });

        generateLogs('start', player1, player2);
    }

};


/**
 ## #3

Для того что бы совершать бои вам нужно использовать *method* **POST**

Для запроса используйте ссылку 
http://reactmarathon-api.herokuapp.com/api/mk/player/fight


Ваш `fetch` будет выглядеть следующим образом.

fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
    method: 'POST',
    body: JSON.stringify({
        hit,
        defence,
    })
});


В метод `JSON.stringify` вы должны передать объект с двумя полями, *hit* и *defence*

Это куда ваш игрок собирается ударить, и что он будет защищать.

В ответ вы получите объект такого типа:

{
    player1: {value: 20, hit: 'foot', defence: 'head'},
    player2: {value: 19, hit: 'foot', defence: 'body'}
}

Где *player1* сколько нанес урона, что защищает и бьет. Тоже самое и для player2.

 */