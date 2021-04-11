const $arenas = document.body.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

let player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['rope', 'sword'],
    attack: function () {
        return console.log(`${this.name} Fight...`);
    },
};

let player2 = {
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
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

function createPlayer (player_obj) {
    $player = createElement('div', 'player'+player_obj.player);
    $progressbar = createElement('div', 'progressbar');
    $character = createElement('div', 'character');
    $life = createElement('div', 'life');
    $name = createElement('div', 'name');
    $characterImg = createElement('img');

    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($characterImg);

    $life.style.width = `${player_obj.hp}%`;
    $name.innerText = `${player_obj.name}`;
    $characterImg.src = `${player_obj.img}`;

    return $player;
};

function randomNumber(min, max) {
    let number = Math.round(Math.random() * max);
    if (number < min) {
        number = min;
    }
    return number;
};

function changeHP(player){
    const $playerLife = document.querySelector(`.player${player.player} .life`);
    player.hp -= randomNumber(1, 20);
    $playerLife.style.width = player.hp + '%';

    if (player.hp <= 0) {
        player.hp = 0;
        $playerLife.style.width = '0%';

        if (player.player === 1) {
            $arenas.appendChild(playerWin(player2.name));
        } else {
            $arenas.appendChild(playerWin(player1.name));
        }
    }
};

function playerWin(name) {
    const $winTitle = createElement('div', 'loseTitle');
    $winTitle.innerText = `${name} wins`;
    $randomButton.disabled = true;

    return $winTitle;
}

$randomButton.addEventListener('click', function(){
    changeHP(player1);
    changeHP(player2);
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));