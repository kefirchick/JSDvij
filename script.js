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
        this.player.update();
        // сюда писать проверки разностей координат чтоб найти направление коллизии
        if (this.actors.test) {
            this.test(this.player.x, this.player.x+this.player.w,
                      this.player.y, this.player.y+this.player.h,
                      this.actors.test.x, this.actors.test.x+this.actors.test.w,
                      this.actors.test.y, this.actors.test.y+this.actors.test.h);
            this.test2(this.player.x + this.player.w - this.actors.test.x,
                       this.actors.test.x + this.actors.test.w - this.player.x,
                       this.player.y + this.player.h - this.actors.test.y,
                       this.actors.test.y + this.actors.test.h - this.player.y);
        }

        // for (let actor in this.actors) {
        //     if (!this.isCollision(actor)) return;
        // }
    }

    test(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2) {
        // console.log("ax1, ax2, ay1, ay2, bx1, bx2, by1, by2:", ax1, ax2, ay1, ay2, bx1, bx2, by1, by2);
        console.log("ax2-bx1:", ax2-bx1, "bx2-ax1", bx2-ax1, "ay2-by1:", ay2-by1, "by2-ay1", by2-ay1);
    }

    test2(dLeft, dRight, dUp, dDown) {
        //dLeft = ax2-bx1, dRight = bx2-ax1, dUp = ay2-by1, dDown = by2-ay1
        console.log(dLeft, dRight, dUp, dDown);
        if (dLeft<0 || dRight<0 || dUp<0 || dDown<0) {
            console.log("No collision");
            return;
        }
        if (dLeft <= dRight && dLeft <= dUp && dLeft <= dDown) {
            console.log("Right");
            return;
        }
        if (dRight <= dUp && dRight <= dDown) {
            console.log("Left");
            return;
        }
        if (dUp <= dDown) {
            console.log("Down");
            return;
        }
        console.log("Up");
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
level.createActor(100, 100, 100, 100, 'test', 'green');


let timerId = setInterval(update, 1000/frameRate);

function update() {
    level.update();
}