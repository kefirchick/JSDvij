let frameRate = 60;

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
    height;
    width;
    collisions = {
        left: null,
        right: null,
        up: null,
        down: null,
    }

    constructor(h=0, w=0, name='', color='white') {
        this.height = h;
        this.width = w;
        this.div = document.createElement('div');
        this.div.className = name;
        this.div.style.cssText = `
            background-color: ${color};;
            position: absolute;
            height: ${h}px;
            width: ${w}px;
        `;
        document.body.append(this.div);
    }
}

class Field extends Actor {
    constructor(h=300, w=300, color='gray') {
        super(h, w, 'field', color);
        this.div.style.cssText += `
            top: 50%;
            left: 50%;
            margin-top: ${-0.5 * h}px;
            margin-left: ${-0.5 * w}px;
        `
    }
}

class Player extends Actor {
    x;
    y;
    speed;
    field = null;
    input = null;

    constructor(field, input, x=0, y=0, h=50, w=50, speed=10, color='red') {
        super(h, w, 'player', color);
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.field = field;
        this.input = input;
    }

    update() {
        let fieldRect = field.div.getBoundingClientRect();
        this.checkFieldCollision();
        if (input.left && !this.collisions.left) this.x -= this.speed;
        if (input.right && !this.collisions.right) this.x += this.speed;
        if (input.up && !this.collisions.up) this.y -= this.speed;
        if (input.down && !this.collisions.down) this.y += this.speed;
        this.div.style.left = fieldRect.left + this.x + 'px';
        this.div.style.top = fieldRect.top + this.y + 'px';
        console.log(this.collisions);
    }

    checkFieldCollision() {
        this.collisions.left = (this.x <= 0) ? field : null;
        this.collisions.right = (this.x + this.width >= field.width) ? field : null;
        this.collisions.up = (this.y <= 0) ? field : null;
        this.collisions.down = (this.y + this.height >= field.height) ? field : null;
    }
}


let input = new Input();
let field = new Field();
let player = new Player(field, input);

let timerId = setInterval(update, 1000/frameRate);

function update() {
    player.update();
}