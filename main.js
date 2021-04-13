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
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
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
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

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

// 
// Task #1
// Создай три функции: changeHP, elHP и renderHP

// 1. Функция changeHP должна в аргументах принимать, на какое кол-во надо изменять HP. 
// И решать, нужно ли отнимать или ставить 0. Больше ничего эта функция не должна делать.
// 2. Вторая функци elHP (это именно функция) должна возвращать document.querySelector, который должен ссылаться на внутреннее поле player, которое выводит 1 или 2. 
// 3. Третья функци renderHP должна только рендерить hp, т.е. рисовать hp при помощи style.width.

// Все эти функции должны быть созданы один раз и использоваться одноименных методах у обоих объектах.
// Т.е. ссылайся в них через this на свойства и методы того объекта, в котором они используются.
// 


// 
// ## Task #2 (*)
// Давайте дальше тренироваться в создании дополнительных элементов.
// Создайте функцию `createReloadButton` внутри это функции создайте div с классом *reloadWrap* и кнопку с классом *button*
// Текст внутри кнопки напишите Restart.
// не забудьте вложить эту кнопку в div.
// Стили для этих элементов уже добавил.

// Для начала повесть на кнопку событие click и в функции обратного вызова вызывай метод `window.location.reload()`
// Вторым этапом, кнопка должна появляться только в том случае когда игра закончилась.

//  Ну а на этом все.
// До встречи очень скоро...
// 

function changeHP (min = 0, max = 0) {
    // const $playerLife = document.querySelector(`.player${player.player} .life`);
    this.hp -= randomNumber(min, max);

    if (this.hp <= 0) {
        this.hp = 0;
    }
    console.log(this.hp);
    // $playerLife.style.width = player.hp + '%';
};

function elHP () {
    return document.querySelector(`.player${this.player} .life`);
};

function renderHP () {
    elHP.call(this).style.width = this.hp + '%';
    // elHP.call(this).style.width = this.hp - 20 + '%';
};

// function changeHP(player) {
//     const $playerLife = document.querySelector(`.player${player.player} .life`);
//     player.hp -= randomNumber(1, 20);

//     if (player.hp <= 0) {
//         player.hp = 0;
//     }

//     $playerLife.style.width = player.hp + '%';
// };

function playerWin(name) {
    const $winTitle = createElement('div', 'loseTitle');

    if (name) {
        $winTitle.innerText = `${name} wins`;
    } else {
        $winTitle.innerText = `draw`;
    }

    return $winTitle;
}

$randomButton.addEventListener('click', function () {
    // !!!
    // changeHP(player1);
    // !!!
    // changeHP(player2);

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWin(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWin(player1.name));
    } else if (player2.hp === 0 && player1.hp === 0) {
        $arenas.appendChild(playerWin());
    }
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));