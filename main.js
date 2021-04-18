console.log('succsessful start');

const $arenas = document.body.querySelector('.arenas');

const $formFight = document.querySelector('.control');

const $chat = document.querySelector('.chat');

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

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
        // elements indexes 0 - 2
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
        // elements indexes 0 - 17
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
        // elements indexes 0 - 8
    ],
    draw: 'Ничья - это тоже победа!'
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

    $reloadBtn.addEventListener('click', function () {
        window.location.reload();
    })

    return $reloadWrap;
};

function changeHP(min = 0, max = 0) {
    this.hp -= randomNumber(min, max);

    if (this.hp <= 0) {
        this.hp = 0;
    }
};

function elHP() {
    return document.querySelector(`.player${this.player} .life`);
};

function renderHP() {
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

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
    const hit = ATTACK[randomNumber(0, 2)];
    const defence = ATTACK[randomNumber(0, 2)];

    return {
        id: 2,
        value: randomNumber(0, HIT[hit]),
        hit,
        defence,
    }
};

const causedDamage = function (action, counterAction) {
    // call examples
    // causedDamage.call(attack, attack.hit, enemy.defence);
    // causedDamage.call(enemy, enemy.hit, attack.defence);
    let victim = this.id === 1 ? player2 : player1;
    let damager = this.id === 1 ? player1 : player2;

    if (action !== counterAction) {
        // рабочий проверочный лог (1 из 2) ↓
        // console.log(`Удар! - ${damager.name} нанёс урон на ${this.value} hp`);

        victim.changeHP(this.value, this.value);
        victim.renderHP();

        // оставляем вывод 'hit' так как по логике игры может произойти только действие hit.
        generateLogs('hit', damager, victim);

    } else if (action === counterAction) {
        // рабочий проверочный лог (2 из 2) ↓
        // console.log(`Блок! - ${victim.name} отразил урон на ${this.value} hp`);
        generateLogs('defence', damager, victim);
    }
};

const checkWinners = function () {
    if (player1.hp === 0 || player2.hp === 0) {
        for (let item of $formFight) {
            item.disabled = 'true';
        };
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWin(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWin(player1.name));
    } else if (player2.hp === 0 && player1.hp === 0) {
        $arenas.appendChild(playerWin());
    }

};

function playerAttack() {
    const attack = {
        id: 1,
    };

    for (let item of $formFight) {

        if (item.checked && item.name === 'hit') {
            attack.value = randomNumber(0, HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }
    // console.log('###');
    // console.log(attack);
    // for (let item in attack) {
    //     console.log(item);
    // }
    // console.log('###');
    return attack;

};

function generateLogs(type, player1, player2) {
    let text = '';
    let logIndex = 0;

    switch (type) {
        case 'start':
            text = logs['start'];
            // console.log(text);
            break;
        case 'end':
            // прописать логику
            // console.log(text);
            break;
        case 'hit':
            logIndex = randomNumber(0, 17);
            text = logs['hit'][logIndex].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            // console.log(text);
            break;
        case 'defence':
            logIndex = randomNumber(0, 8);
            text = logs['defence'][logIndex].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            // console.log(text);
            break;
        case 'draw':
            text = logs['draw'];
            // console.log(text);
            break;
    }

    // прописать генерируемые номера индексов в зависимости от типа:
    // start: break or return
    // end: elements indexes 0 - 2
    // hit: elements indexes 0 - 17
    // defence:  elements indexes 0 - 8
    // draw: break or return
    // let logIndex = 0;
    // const text = logs[type][0].replace('[playerKick]',player1.name).replace('[playerDefence]',player2.name);
    // const text = logs['start'][0].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
    // console.log(`↓↓↓↓↓↓`);
    // console.log(type);

    // console.log(text);
    // return text;

    const el = `<p>${text}</p>`;
    // console.log(`el ↓`);
    // console.log(el);
    $chat.insertAdjacentHTML('afterbegin', el);
};

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();

    const enemy = enemyAttack();
    const attack = playerAttack();
    // const attack = {
    //     id: 1,
    // };

    // for (let item of $formFight) {

    //     if (item.checked && item.name === 'hit') {
    //         attack.value = randomNumber(0, HIT[item.value]);
    //         attack.hit = item.value;
    //     }

    //     if (item.checked && item.name === 'defence') {
    //         attack.defence = item.value;
    //     }

    //     item.checked = false;
    // }

    causedDamage.call(attack, attack.hit, enemy.defence);

    causedDamage.call(enemy, enemy.hit, attack.defence);

    checkWinners();
});

/*
 Сделай вывод лога боя.

 При старте игры первым делом инициализируй в лог боя строчку **start**.

Заметь, что там используется строчка *[time],* которую нужно заменить на время.

Во время битвы нужно писать лог в формате:

`[time] [text] [-player.hp] [hp/100]`

Посмотри на видео, как выглядит формат лога.

По окончании игры выведи один из элементов в `logs.end`

Для работы с выводом лога боя используй изученную конструкцию `switch...case`, которая будет в зависимости от type, который ты передаешь в функцию generateLogs, выводить нужную строчку.

Главная задача — научиться пользоваться этим методом.
 */