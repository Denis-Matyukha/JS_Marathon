import { createElement, getRandom } from './index.js';

export class Player {
    
    constructor(props) {
        this.player = props.player;
        this.selector = `player${this.player}`;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.weapon = props.weapon;
        this.rootSelector = props.rootSelector;
    }

    attack = () => {
        return console.log(`${this.name} Fight...`);
    }

    changeHP = (min = 0, max = 0) => {
        this.hp -= getRandom(min, max);

        if (this.hp <= 0) {
            this.hp = 0;
        }
    }

    elHP = () => {
        return document.querySelector(`.${this.selector} .life`);
    }

    renderHP = () => {
        this.elHP().style.width = this.hp + '%';
    }

    createPlayer = () => {
        let $player = createElement('div', this.selector),
            $progressbar = createElement('div', 'progressbar'),
            $character = createElement('div', 'character'),
            $life = createElement('div', 'life'),
            $name = createElement('div', 'name'),
            $characterImg = createElement('img'),
            $root = document.querySelector(`.${this.rootSelector}`)
    
        $player.appendChild($progressbar);
        $player.appendChild($character);
        $progressbar.appendChild($life);
        $progressbar.appendChild($name);
        $character.appendChild($characterImg);
    
        $life.style.width = `${this.hp}%`;
        $name.innerText = `${this.name}`;
        $characterImg.src = `${this.img}`;
    
        $root.appendChild($player);

        return $player;
    };
    
};