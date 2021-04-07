let player1 = {
    name: 'SCORPION',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['rope','sword'],
    attack: function() {
        return console.log(`${this.name} Fight...`);
    },
};

let player2 = {
    name: 'SUB-ZERO',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['bat','knife'],
    attack: function() {
        return console.log(`${this.name} Fight...`);
    },
};

const createPlayer = function(player_class, player_hero) {
    // создаём элементы
    const $player = document.createElement('div');
    const $progressbar = document.createElement('div');
    const $character = document.createElement('div');
    const $life = document.createElement('div');
    const $name = document.createElement('div');
    const $characterImg = document.createElement('img');
    // выстраиваем иерархию и вложенность
    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($characterImg);
    document.body.querySelector('.arenas').appendChild($player);
    // добавляем стили и контент
    $player.classList.add(`${player_class}`)
    $progressbar.classList.add('progressbar')
    $character.classList.add('character')
    $life.classList.add('life')
    $name.classList.add('name')
    $life.style.width = `${player_hero.hp}%`;
    $name.innerText = `${player_hero.name}`;
    $characterImg.src = `${player_hero.img}`;
};

createPlayer('player1', player1);
createPlayer('player2', player2);
