let frameRate = 20;
let input = {
    left: false,
    right: false,
    up: false,
    down: false,
}
let player = {
    x: 0,
    y: 0,
}

let fieldElement = document.querySelector('.field');

let playerElement = document.createElement('div');
playerElement.className = "player";
document.body.append(playerElement);

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
    fieldRect = fieldElement.getBoundingClientRect();
    if (input.left ) player.x--;
    if (input.right) player.x++;
    if (input.up) player.y--;
    if (input.down) player.y++;
    playerElement.style.left = fieldRect.left + player.x + 'px';
    playerElement.style.top = fieldRect.top + player.y + 'px';
    console.log();
}