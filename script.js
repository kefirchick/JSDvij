let frameRate = 60;

class Level {
    actors = {};
    player;

    constructor(player) {
        this.player = player;
    }

    createActor(x, y, w, h, name, color) {
        let actor = new Actor(x, y, w, h, name, color);
        this.actors[name] = actor;
        return actor;
    }

    update() {
        for (let col in this.player.collisions) {
            this.player.collisions[col] = null;
        }
        for (let actor in this.actors) {
            this.collisionCheck(this.player.x + this.player.w - this.actors[actor].x,
                this.actors[actor].x + this.actors[actor].w - this.player.x,
                this.player.y + this.player.h - this.actors[actor].y,
                this.actors[actor].y + this.actors[actor].h - this.player.y);
        }
        this.player.update();
    }

    collisionCheck(dLeft, dRight, dUp, dDown) {
        //dLeft = ax2-bx1, dRight = bx2-ax1, dUp = ay2-by1, dDown = by2-ay1
        if (dLeft<0 || dRight<0 || dUp<0 || dDown<0) {
            return;
        }
        if (dLeft <= dRight && dLeft <= dUp && dLeft <= dDown) {
            this.player.collisions.right = true;
            return;
        }
        if (dRight <= dUp && dRight <= dDown) {
            this.player.collisions.left = true;
            return;
        }
        if (dUp <= dDown) {
            this.player.collisions.down = true;
            return;
        }
        this.player.collisions.up = true;
    }
}

class Input {
    left = false;
    right = false;
    up = false;
    down = false;
    speed = 10;
    dx = 0;
    dy = 0;

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

    update() {
        if (this.left && !this.right) {
            this.dx = -this.speed;
        } else if (this.right && !this.left) {
            this.dx = this.speed;
        } else this.dx = 0;

        if (this.up && !this.down) {
            this.dy = -this.speed;
        } else if (this.down && !this.up) {
            this.dy = this.speed;
        } else this.dy = 0;

        return [this.dx, this.dy];
    }
}

class Actor {
    div = null;
    x; y; w; h;
    collisions = {
        left: false,
        right: false,
        up: false,
        down: false,
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
        input.update();
        if ( (input.dx < 0 && !this.collisions.left) || (input.dx > 0 && !this.collisions.right) ) this.x += input.dx;
        if ( (input.dy < 0 && !this.collisions.up) || (input.dy > 0 && !this.collisions.down) ) this.y += input.dy;
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
level.createActor(100, 100, 100, 100, 'test', 'green');


let timerId = setInterval(update, 1000/frameRate);

function update() {
    level.update();
}