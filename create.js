import {
    $arenas
} from './elements.js';

const createElement = (tag, className) => {
        const $tag = document.createElement(tag);
        if (className) {
            $tag.classList.add(className);
        }
        return $tag;
    },

    createReloadButton = () => {
        let $reloadWrap = createElement('div', 'reloadWrap');
        let $reloadBtn = createElement('button', 'button');
        $reloadBtn.innerText = 'Restart';
        $reloadWrap.appendChild($reloadBtn);

        $reloadBtn.addEventListener('click', function () {
            window.location.reload();
        })

        return $reloadWrap;
    };

export const createPlayer = (playerObj) => {
        let $player = createElement('div', 'player' + playerObj.player),
            $progressbar = createElement('div', 'progressbar'),
            $character = createElement('div', 'character'),
            $life = createElement('div', 'life'),
            $name = createElement('div', 'name'),
            $characterImg = createElement('img');

        $player.appendChild($progressbar);
        $player.appendChild($character);
        $progressbar.appendChild($life);
        $progressbar.appendChild($name);
        $character.appendChild($characterImg);

        $life.style.width = `${playerObj.hp}%`;
        $name.innerText = `${playerObj.name}`;
        $characterImg.src = `${playerObj.img}`;

        return $player;
    },

    createWinnerTitle = (name) => {
        const $winTitle = createElement('div', 'loseTitle');

        if (name) {
            $winTitle.innerText = `${name} wins`;
        } else {
            $winTitle.innerText = `draw`;
        }

        $arenas.appendChild(createReloadButton());
        return $winTitle;
    };