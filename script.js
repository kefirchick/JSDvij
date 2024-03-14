let frameRate = 60;

class Level {
    actors = {};
    player;

    constructor(player) {
        this.player = player;
    }

    createActor(x, y, w, h, name, color) {
        let actor = new Actor(x, y, w, h, name, color);
        this.actors.name = actor;
        return actor;
    }

    update() {
        for (let actor in this.actors) {
            if (!this.isCollision(actor)) return;
        }
    }

    isCollision(actor) {
        if (this.player.x <= actor.x+actor.w &&
            this.player.x+this.player.w >= actor.x &&
            this.player.y <= actor.y+actor.h &&
            this.player.y+this.player.h >= actor.y) return true;
    }
}

class Input {
    left = false;
    right = false;
    up = false;
    down = false;

    constructor() {
        document.addEventListener('keydown', (event) => {
            if (event.key == 'ArrowLeft') this.left = true;
            if (event.key == 'ArrowRight') this.right = true;
            if (event.key == 'ArrowUp') this.up = true;
            if (event.key == 'ArrowDown') this.down = true;
        });
        document.addEventListener('keyup', (event) => {
            if (event.key == 'ArrowLeft') this.left = false;
            if (event.key == 'ArrowRight') this.right = false;
            if (event.key == 'ArrowUp') this.up = false;
            if (event.key == 'ArrowDown') this.down = false;
        });
    }
}

class Actor {
    div = null;
    x; y; w; h;
    collisions = {
        left: null,
        right: null,
        up: null,
        down: null,
    }

    constructor(x=0, y=0, w=0, h=0, name='', color='white') {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.div = document.createElement('div');
        this.div.className = name;
        this.div.style.cssText = `
            background-color: ${color};
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${w}px;
            height: ${h}px;
        `;
        document.body.append(this.div);
    }
}

class Player extends Actor {
    speed;
    input = null;

    constructor(input, x=0, y=0, w=50, h=50, speed=10, color='red') {
        super(x, y, w, h, 'player', color);
        this.speed = speed;
        this.input = input;
    }

    update() {
        if (input.left && !this.collisions.left) this.x -= this.speed;
        if (input.right && !this.collisions.right) this.x += this.speed;
        if (input.up && !this.collisions.up) this.y -= this.speed;
        if (input.down && !this.collisions.down) this.y += this.speed;
        this.div.style.left = this.x + 'px';
        this.div.style.top = this.y + 'px';

    }
}

let input = new Input();
let player = new Player(input, 20, 20);
let level = new Level(player);
let border1 = level.createActor(10, 10, 10, 320, 'border1', 'blue');
level.createActor(20, 10, 300, 10, 'border2', 'blue');
level.createActor(320, 10, 10, 320, 'border3', 'blue');
level.createActor(20, 320, 300, 10, 'border4', 'blue');


let timerId = setInterval(update, 1000/frameRate);

function update() {
    player.update();
}