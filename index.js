const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const enemyHealthElem = document.getElementById('enemyHealth');
const playerHealthElem = document.getElementById('playerHealth');
const timerElem = document.getElementById('timer');
const healthBarElem = document.getElementById('healthBar');
const displayTextElem = document.getElementById('displayText');
const finalWinnerElem = document.getElementById('finalWinner');
const startGameButton = document.getElementById('startGameButton');

canvas.height = 576;
canvas.width = 1024;

context.fillStyle = 'black';
context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.4;

let background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './assets/background.png'
});

let shop = new Sprite({
    position: {
        x: 628,
        y: 128
    },
    imageSrc: './assets/shop.png',
    scale: 2.75,
    framesMax: 6
});

let player = new Fighter({
    position: { x: 100, y: 150 },
    velocity: { x: 0, y: 5 },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './assets/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 157
    },
    sprites: {
        idle: {
            imageSrc: './assets/samuraiMack/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './assets/samuraiMack/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './assets/samuraiMack/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './assets/samuraiMack/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './assets/samuraiMack/Attack1.png',
            framesMax: 6
        },
        death: {
            imageSrc: './assets/samuraiMack/Death.png',
            framesMax: 6
        },
        takeHit: {
            // imageSrc: './assets/samuraiMack/Take Hit - white silhouette.png',
            imageSrc: './assets/samuraiMack/Take Hit.png',
            framesMax: 4
        }
    },
    attackBox: {
        offset: {
            x: 20,
            y: -10
        },
        width: 225,
        height: 125
    }
});

let enemy = new Fighter({
    position: { x: (canvas.width - 200), y: 150 },
    velocity: { x: 0, y: 5 },
    color: 'blue',
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: './assets/kenji/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 168
    },
    sprites: {
        idle: {
            imageSrc: './assets/kenji/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: './assets/kenji/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './assets/kenji/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './assets/kenji/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './assets/kenji/Attack1.png',
            framesMax: 4
        },
        death: {
            imageSrc: './assets/kenji/Death.png',
            framesMax: 7
        },
        takeHit: {
            imageSrc: './assets/kenji/Take hit.png',
            framesMax: 3
        }
    },
    attackBox: {
        offset: {
            x: -160,
            y: 20
        },
        width: 200,
        height: 110
    }
});

enemy.framesHold = 8;

let keys = {
    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false },
    space: { pressed: false },
    ArrowRight: { pressed: false },
    ArrowLeft: { pressed: false },
    ArrowUp: { pressed: false },
};

function init() {
    background = new Sprite({
        position: {
            x: 0,
            y: 0
        },
        imageSrc: './assets/background.png'
    });

    shop = new Sprite({
        position: {
            x: 628,
            y: 128
        },
        imageSrc: './assets/shop.png',
        scale: 2.75,
        framesMax: 6
    });

    player = new Fighter({
        position: { x: 100, y: 150 },
        velocity: { x: 0, y: 5 },
        offset: {
            x: 0,
            y: 0
        },
        imageSrc: './assets/samuraiMack/Idle.png',
        framesMax: 8,
        scale: 2.5,
        offset: {
            x: 215,
            y: 157
        },
        sprites: {
            idle: {
                imageSrc: './assets/samuraiMack/Idle.png',
                framesMax: 8
            },
            run: {
                imageSrc: './assets/samuraiMack/Run.png',
                framesMax: 8
            },
            jump: {
                imageSrc: './assets/samuraiMack/Jump.png',
                framesMax: 2
            },
            fall: {
                imageSrc: './assets/samuraiMack/Fall.png',
                framesMax: 2
            },
            attack1: {
                imageSrc: './assets/samuraiMack/Attack1.png',
                framesMax: 6
            },
            death: {
                imageSrc: './assets/samuraiMack/Death.png',
                framesMax: 6
            },
            takeHit: {
                // imageSrc: './assets/samuraiMack/Take Hit - white silhouette.png',
                imageSrc: './assets/samuraiMack/Take Hit.png',
                framesMax: 4
            }
        },
        attackBox: {
            offset: {
                x: 20,
                y: -10
            },
            width: 225,
            height: 125
        }
    });

    enemy = new Fighter({
        position: { x: (canvas.width - 200), y: 150 },
        velocity: { x: 0, y: 5 },
        color: 'blue',
        offset: {
            x: -50,
            y: 0
        },
        imageSrc: './assets/kenji/Idle.png',
        framesMax: 8,
        scale: 2.5,
        offset: {
            x: 215,
            y: 168
        },
        sprites: {
            idle: {
                imageSrc: './assets/kenji/Idle.png',
                framesMax: 4
            },
            run: {
                imageSrc: './assets/kenji/Run.png',
                framesMax: 8
            },
            jump: {
                imageSrc: './assets/kenji/Jump.png',
                framesMax: 2
            },
            fall: {
                imageSrc: './assets/kenji/Fall.png',
                framesMax: 2
            },
            attack1: {
                imageSrc: './assets/kenji/Attack1.png',
                framesMax: 4
            },
            death: {
                imageSrc: './assets/kenji/Death.png',
                framesMax: 7
            },
            takeHit: {
                imageSrc: './assets/kenji/Take hit.png',
                framesMax: 3
            }
        },
        attackBox: {
            offset: {
                x: -160,
                y: 20
            },
            width: 200,
            height: 110
        }
    });

    enemy.framesHold = 8;

    keys = {
        a: { pressed: false },
        d: { pressed: false },
        w: { pressed: false },
        space: { pressed: false },
        ArrowRight: { pressed: false },
        ArrowLeft: { pressed: false },
        ArrowUp: { pressed: false },
    };

    timerElem.innerHTML = 90;
    timer = 90;

    playerHealthElem.style.width = (player.health + '%');
    enemyHealthElem.style.width = (enemy.health + '%');

    decreaseTimer();
}

let animationId;

function animate() {
    animationId = requestAnimationFrame(animate);

    background.update();
    // context.fillStyle = 'black';
    // context.fillRect(0, 0, canvas.width, canvas.height);

    shop.update();

    // Contrast between players & background
    context.fillStyle = 'rgba(255, 255, 255, 0.13)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    enemy.update();
    player.update();

    // Player movement
    player.velocity.x = 0;
    // player.switchSprite('idle');
    if (keys.a.pressed && player.lastKey !== 'd') {
        player.velocity.x = -5;
        player.switchSprite('run');
    }
    else if (keys.d.pressed && player.lastKey !== 'a') {
        player.velocity.x = 5;
        player.switchSprite('run');
    }
    else {
        player.switchSprite('idle');
    }

    // Jump animation (Player1)
    if (player.velocity.y < 0) {
        player.switchSprite('jump');
    }
    else if (player.velocity.y > 0) {
        player.switchSprite('fall');
    }

    // Enemy movement
    enemy.velocity.x = 0;
    if (keys.ArrowLeft.pressed && enemy.lastKey !== 'ArrowRight') {
        enemy.velocity.x = -5;
        enemy.switchSprite('run');
    }
    else if (keys.ArrowRight.pressed && enemy.lastKey !== 'ArrowLeft') {
        enemy.velocity.x = 5;
        enemy.switchSprite('run');
    }
    else {
        enemy.switchSprite('idle');
    }

    // Jump animation (Player2)
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump');
    }
    else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall');
    }

    // Player Attack & enemy hit
    if (
        rectangularCollusionDetection(player, enemy) &&
        player.isAttacking &&
        player.frames === 4
    ) {
        console.log('Collision detected: Player attacked');
        player.isAttacking = false;
        enemy.takeHit();

        if (enemy.health <= 100) {
            // enemyHealthElem.style.width = (enemy.health + '%');
            gsap.to('#enemyHealth', {
                width: enemy.health + '%'
            });
        }
    }

    // Bug fix
    if (player.isAttacking && player.frames === 4) {
        player.isAttacking = false;
    }

    // Enemy Attack & player hit
    if (
        rectangularCollusionDetection(enemy, player) &&
        enemy.isAttacking &&
        enemy.frames === 2
    ) {
        console.log('Collision detected: Enemy attacked');
        enemy.isAttacking = false;
        player.takeHit();

        if (player.health <= 100) {
            // playerHealthElem.style.width = (player.health + '%');
            gsap.to('#playerHealth', {
                width: player.health + '%'
            });
        }
    }

    // Bug fix
    if (enemy.isAttacking && enemy.frames === 2) {
        enemy.isAttacking = false;
    }

    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner(player, enemy, timerId);
        player.health = 1000;
        enemy.health = 1000;
    }

}

// animate();

addEventListener('keydown', ({ key }) => {
    if (!player.dead) {
        switch (key) {
            case ' ':
                console.log('player attack');
                keys.space.pressed = true;
                player.attack();

                break;

            case 'd':
                console.log('right');
                keys.d.pressed = true;
                player.lastKey = 'd';

                break;

            case 'w':
                console.log('jump');
                if (player.position.y + player.height >= canvas.height - 95) {
                    player.velocity.y = -17;
                }

                break;

            case 'a':
                console.log('left');
                keys.a.pressed = true;
                player.lastKey = 'a'

                break;
        }
    }

    if (!enemy.dead) {
        switch (key) {
            case 'ArrowRight':
                console.log('ArrowRight');
                keys.ArrowRight.pressed = true;
                enemy.lastKey = 'ArrowRight';

                break;

            case 'ArrowUp':
                console.log('ArrowUp');
                if (enemy.position.y + enemy.height >= canvas.height - 95) {
                    enemy.velocity.y = -17;
                }

                break;

            case 'ArrowLeft':
                console.log('ArrowLeft');
                keys.ArrowLeft.pressed = true;
                enemy.lastKey = 'ArrowLeft';

                break;


            case 'ArrowDown':
                console.log('enemy attack');
                keys.space.pressed = true;
                enemy.attack();

                break;

            default:
                break;
        }
    }
});

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'd':
            console.log('right');
            keys.d.pressed = false;

            break;

        case 'w':
            console.log('jump');

            break;

        case 'a':
            console.log('left');
            keys.a.pressed = false;

            break;

        case 'ArrowRight':
            console.log('ArrowRight');
            keys.ArrowRight.pressed = false;

            break;

        case 'ArrowUp':
            console.log('ArrowUp');

            break;

        case 'ArrowLeft':
            console.log('ArrowLeft');
            keys.ArrowLeft.pressed = false;

            break;

        case ' ':
            console.log('attack');
            keys.space.pressed = false;

            break;

        default:
            break;
    }
});

startGameButton.addEventListener('click', (event) => {
    init();
    animate();
    healthBarElem.style.display = 'flex';
    startGameButton.innerHTML = "Restart";
    displayTextElem.style.display = 'none';
});