let frameRate = 20;
let x = 0;
let y = 0;
let input = {
    left: false,
    right: false,
    up: false,
    down: false,
}

let field = document.querySelector('.field');
let fieldRect = field.getBoundingClientRect();

let player = document.createElement('div');
player.className = "player";
document.body.append(player);
let playerRect = player.getBoundingClientRect();

document.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowLeft') input.left = true;
    if (event.key == 'ArrowRight') input.right = true;
    if (event.key == 'ArrowUp') input.up = true;
    if (event.key == 'ArrowDown') input.down = true;
});

document.addEventListener('keyup', (event) => {
    if (event.key == 'ArrowLeft') input.left = false;
    if (event.key == 'ArrowRight') input.right = false;
    if (event.key == 'ArrowUp') input.up = false;
    if (event.key == 'ArrowDown') input.down = false;
});

let timerId = setInterval(update, 1000/frameRate);

function update() {
    if (input.left) x--;
    if (input.right) x++;
    if (input.up) y--;
    if (input.down) y++;
    player.style.left = x + 'px';
    player.style.top = y + 'px';
    playerRect = player.getBoundingClientRect();
    console.log(playerRect);
}