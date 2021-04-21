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
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    ],
    draw: 'Ничья - это тоже победа!'
};

// let [] = logs;

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
    const hit = ATTACK[randomNumber(0, ATTACK.length - 1)];
    const defence = ATTACK[randomNumber(0, ATTACK.length - 1)];

    return {
        id: 2,
        value: randomNumber(0, HIT[hit]),
        hit,
        defence,
    }
};

const causedDamage = function (action, counterAction) {
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

const checkWinners = function () {
    if (player1.hp === 0 || player2.hp === 0) {
        for (let item of $formFight) {
            item.disabled = 'true';
        };
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWin(player2.name));
        // player2 - winner
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWin(player1.name));
        // player1 - winner
        generateLogs('end', player1, player2);
    } else if (player2.hp === 0 && player1.hp === 0) {
        $arenas.appendChild(playerWin());
        // draw
        generateLogs('draw');
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

    return attack;
};

function generateLogs(type, player1 = {}, player2 = {}, damageLevel = 0) {
    let text = '';
    let logIndex = 0;
    let currentTime = new Date;

    let splitHours = currentTime.getHours() < 10 ? '0' : '';
    let splitMinutes = currentTime.getMinutes() < 10 ? '0' : '';

    switch (type) {
        case 'start':
            text = logs['start']
                .replace('[time]', `${splitHours}${currentTime.getHours()}:${splitMinutes}${currentTime.getMinutes()}`)
                .replace('[player1]', player1.name)
                .replace('[player2]', player2.name);
            break;
        case 'end':
            logIndex = randomNumber(0, logs['end'].length - 1);
            text = logs['end'][logIndex]
                .replace('[playerWins]', player1.name)
                .replace('[playerLose]', player2.name);
            break;
        case 'hit':
            logIndex = randomNumber(0, logs['hit'].length - 1);
            text = `
                ${splitHours}${currentTime.getHours()}:${splitMinutes}${currentTime.getMinutes()} — 
                ${logs['hit'][logIndex]
                    .replace('[playerKick]', player1.name)
                    .replace('[playerDefence]', player2.name)}
                -${damageLevel}
                 [${player2.hp}/100]
                    `;
            break;
        case 'defence':
            logIndex = randomNumber(0, logs['defence'].length - 1);
            text = `
                ${splitHours}${currentTime.getHours()}:${splitMinutes}${currentTime.getMinutes()} — 
                ${logs['defence'][logIndex]
                    .replace('[playerKick]', player1.name)
                    .replace('[playerDefence]', player2.name)}
                    `;
            break;
        case 'draw':
            text = logs['draw'];
            break;
        default:
            text = 'Что-то происходит... Но что?...';
            break;
    }

    const el = `<p>${text}</p>`;

    $chat.insertAdjacentHTML('afterbegin', el);
};

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();

    const enemy = enemyAttack();
    const attack = playerAttack();

    causedDamage.call(attack, attack.hit, enemy.defence);
    causedDamage.call(enemy, enemy.hit, attack.defence);

    checkWinners();
});

generateLogs('start', player1, player2);

/**
Для некоторых выходные выдались тяжелые из-за предыдущей домашней работы. Сегодня наводим порядок в приложении.

У нас будет небольшое понедельничное задание.

[]
1. Воспользоваться деструктуризацией, 
я видел в ваших ДЗ много мест, где деструктуризация сильно упростит жизнь. 
Поэтому покажи навыки из сегодняшнего урока  и не стесняйся ее использовать!

[]
2. Наконец-то мы научились разделять файлы на модули, 
пришло время разнести все функции по разным местам, 
оставив в main.js только создание героев, лог старта и, конечно же, функцию submit.

Я намеренно даю вам самим попробовать перенос функций в другие файлы, 
чтобы вы поняли, какие методы к чему относятся, и где они зовутся. 
Ты сможешь использовать наверняка import и export. 
Но не стоит экспортировать те функции, которые не должны применяться в других местах.

[]
3. Также мы познакомились со стрелочной функцией. 
Используй ее максимально. Но помни главное правило: у стрелочной функции нет контекста, 
а значит она легко может потерять this, просто возьми это на заметку.

Ну а на этом все.
 */