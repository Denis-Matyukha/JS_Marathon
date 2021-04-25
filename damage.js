import {
    player1,
    player2
} from './main.js';

import {
    generateLogs
} from './logs_generator.js';

export const elHP = function () {
        return document.querySelector(`.player${this.player} .life`);
    };

export const renderHP = function () {
        elHP.call(this).style.width = this.hp + '%';
    };

export const causedDamage = function (action, counterAction) {
        let victim = this.id === 1 ? player2 : player1;
        let damager = this.id === 1 ? player1 : player2;

        if (action !== counterAction) {
            victim.changeHP(this.value, this.value);
            victim.renderHP();
            generateLogs('hit', damager, victim, this.value);

        } else if (action === counterAction) {
            generateLogs('defence', damager, victim);
        }
    };