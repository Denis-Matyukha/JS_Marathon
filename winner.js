import {
    player1,
    player2
} from './main.js';

import {
    $arenas,
    $formFight,
} from './elements.js';

import {
    createWinnerTitle
} from './create.js';

import {
    generateLogs
} from './logs_generator.js';

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