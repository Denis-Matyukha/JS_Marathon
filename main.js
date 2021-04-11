const $arenas = document.body.querySelector('.arenas');

let player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['rope', 'sword'],
    attack: function () {
        return console.log(`${this.name} Fight...`);
    },
};

let player2 = {
    player: 2,
    name: 'SUB-ZERO',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['bat', 'knife'],
    attack: function () {
        return console.log(`${this.name} Fight...`);
    },
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

const createPlayer = function (player_obj) {

    // const $player = document.createElement('div');
    $player = createElement('div', 'player'+player_obj.player);
    // const $progressbar = document.createElement('div');
    $progressbar = createElement('div', 'progressbar');

    // const $character = document.createElement('div');
    $character = createElement('div', 'character');

    // const $life = document.createElement('div');
    $life = createElement('div', 'life');

    // const $name = document.createElement('div');
    $name = createElement('div', 'name');

    // const $characterImg = document.createElement('img');
    $characterImg = createElement('img');

    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($characterImg);

    // $arenas.appendChild($player);

    // $player.classList.add(`${player_class}`)
    // $progressbar.classList.add('progressbar')
    // $character.classList.add('character')
    // $life.classList.add('life')
    // $name.classList.add('name')

    $life.style.width = `${player_obj.hp}%`;
    $name.innerText = `${player_obj.name}`;
    $characterImg.src = `${player_obj.img}`;

    return $player;
};

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
// createPlayer('player1', player1);
// createPlayer('player2', player2);
