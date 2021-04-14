const $arenas = document.body.querySelector('.arenas');
// const $randomButton = document.querySelector('.button');

const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

let player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['rope', 'sword'],
    attack,
    changeHP,
    elHP,
    renderHP,
};

let player2 = {
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['bat', 'knife'],
    attack,
    changeHP,
    elHP,
    renderHP,
};

function attack() {
    return console.log(`${this.name} Fight...`);
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
};

function createPlayer(player_obj) {
    $player = createElement('div', 'player' + player_obj.player);
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

function createReloadButton() {
    let $reloadWrap = createElement('div', 'reloadWrap');
    let $reloadBtn = createElement('button', 'button');
    $reloadBtn.innerText = 'Restart';
    $reloadWrap.appendChild($reloadBtn);

    $reloadBtn.addEventListener('click', function(){
        window.location.reload();
    })

    return $reloadWrap;
};

function changeHP (min = 0, max = 0) {
    this.hp -= randomNumber(min, max);

    if (this.hp <= 0) {
        this.hp = 0;
    }
};

function elHP () {
    return document.querySelector(`.player${this.player} .life`);
};

function renderHP () {
    elHP.call(this).style.width = this.hp + '%';
};

function playerWin(name) {
    const $winTitle = createElement('div', 'loseTitle');

    if (name) {
        $winTitle.innerText = `${name} wins`;
    } else {
        $winTitle.innerText = `draw`;
    }

    $arenas.appendChild(createReloadButton());

    return $winTitle;
}

// $randomButton.addEventListener('click', function () {

//     player1.changeHP(0,20);
//     player1.renderHP();

//     player2.changeHP(0,20);
//     player2.renderHP();

//     if (player1.hp === 0 || player2.hp === 0) {
//         $randomButton.disabled = true;
//     }

//     if (player1.hp === 0 && player1.hp < player2.hp) {
//         $arenas.appendChild(playerWin(player2.name));
//     } else if (player2.hp === 0 && player2.hp < player1.hp) {
//         $arenas.appendChild(playerWin(player1.name));
//     } else if (player2.hp === 0 && player1.hp === 0) {
//         $arenas.appendChild(playerWin());
//     }
// });

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
    const hit = ATTACK[randomNumber(0,2)];
    const defence = ATTACK[randomNumber(0,2)];

    return {
        value: randomNumber(0, HIT[hit]),
        hit,
        defence,
    }
};

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('___001 - formFight');
    console.log($formFight);
    console.log('___002 - formFight');
    console.dir($formFight);

    const enemy = enemyAttack();
    console.log('___003 - enemy');
    console.log(enemy);

    const attack = {};

    for (let item of $formFight) {
        console.log('___004 - item');
        console.dir(item);

        if (item.checked && item.name === 'hit') {
            attack.value = randomNumber(0, HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }

    console.log('___005 - attack');
    console.log(attack);

    console.log('___006 - enemy');
    console.log(enemy);
});