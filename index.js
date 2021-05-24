const dialog = document.getElementById('dialog');
const dialogContent = dialog.querySelector('.dialog--content');
const dialogCross = dialog.querySelector('.dialog--cross');

const personnages = [
    'Plongeur',
    'Éclaireur',
    "Géologue",
    'Ingénieur',
    'Grimpeur',
    'Médecin',
    'Garde du corps',
    'Chef',
];

const getRandom = (arr) => {
    const max = arr.length - 1;

    return Math.floor(Math.random() * (max + 1));
};

// Créé un tableau avec le nombre de joueur indiqué
const generatePlayersArray = (array) => {
    const players = [];

    for (let i = 0; i < array.length; i++) {
        const player = array[i];
        players.push(player);
    }

    if (array.length === 2) {
        players.push(...players);
    }

    return players;
};

const getRandomArray = (count, arr = personnages) => {
    const array = [...arr];
    const randomArray = [];

    for (let i = 0; i < count; i++) {
        const index = getRandom(array);

        const character = array[index];

        randomArray.push(character);

        array.splice(index, 1);
    }

    return randomArray;
};

const getLogs = (players, characters) => {
    let logs = '';

    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        const character = characters[i];

        logs += `<li>n°${i + 1} - ${player} joue "${character}".</li>`;
    }

    return logs;
};

const hideDialog = (e) => {
    dialog.classList.remove('open');
};

dialogCross.addEventListener('click', hideDialog);

const randomGame2 = (playersInput) => {
    const players = generatePlayersArray(playersInput);
    const randomPlayers = getRandomArray(players.length, players);
    const randomCharacters = getRandomArray(players.length);

    const logs = getLogs(randomPlayers, randomCharacters);

    dialogContent.innerHTML = `<ul>${logs}</ul>`;
    dialog.classList.add('open');
};

document.getElementById('sub-terra').addEventListener('submit', (e) => {
    e.preventDefault();

    const inputPlayers = e.target.elements.players.value;

    if (!inputPlayers.trim()) {
        window.alert('Il faut au minimum 2 joueurs !');
        return;
    }

    const players = inputPlayers.split(/[,;\.]/).map(player => player.trim());

    if (players.length < 2) {
        window.alert('Il faut au minimum 2 joueurs !');
        return;
    }

    randomGame2(players);
});
