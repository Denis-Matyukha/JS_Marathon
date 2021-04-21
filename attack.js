import {
    getRandom
} from './randomiser.js';

import {
    HIT,
    ATTACK
} from './hits.js';

import {
    $formFight,
} from './elements.js';

export const enemyAttack = () => {
        const hit = ATTACK[getRandom(0, ATTACK.length - 1)];
        const defence = ATTACK[getRandom(0, ATTACK.length - 1)];

        return {
            id: 2,
            value: getRandom(0, HIT[hit]),
            hit,
            defence,
        }
    },
    playerAttack = () => {
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

            item.checked = false;
        }

        return attack;
    };