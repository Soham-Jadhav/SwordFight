class Sprite {
    constructor({
        position,
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
    }) {
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.frames = 0;
        this.framesElapsed = 0;
        this.framesHold = 7;
        this.offset = offset;
    }

    draw() {
        context.drawImage(
            this.image,
            (this.image.width / this.framesMax) * this.frames,
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            this.image.width / this.framesMax * this.scale,
            this.image.height * this.scale
        );
    }

    animateFrame() {
        this.framesElapsed++;

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.frames + 1 < this.framesMax) {
                this.frames++;
            }
            else {
                this.frames = 0;
            }
        }
    }

    update() {
        this.draw();
        this.animateFrame();
    }
};

class Fighter extends Sprite {
    constructor({
        position,
        velocity,
        color = 'red',
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
        sprites,
        attackBox = { offset: {}, width: undefined, height: undefined }
    }) {
        super({ position, imageSrc, scale, framesMax, offset });
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKey;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: attackBox.width,
            height: attackBox.height,
            offset: attackBox.offset
        };
        this.color = color;
        this.isAttacking = false;
        this.health = 100;
        this.frames = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.sprites = sprites;
        this.dead = false;

        for (const sprite in this.sprites) {
            this.sprites[sprite].image = new Image();
            this.sprites[sprite].image.src = this.sprites[sprite].imageSrc;
        }
    }

    // draw() {
    //     // Attack box
    //     if (this.isAttacking) {
    //         context.fillStyle = 'green';
    //         context.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
    //     }

    //     // Player/Enemy
    //     context.fillStyle = this.color;
    //     context.fillRect(this.position.x, this.position.y, this.width, this.height);
    // }

    attack() {
        this.switchSprite('attack1');
        this.isAttacking = true;

        // setTimeout(() => {
        //     this.isAttacking = false;
        // }, 100);
    }

    takeHit() {
        if (this.health <= 100) this.health -= 20;

        if (this.health <= 0) {
            this.switchSprite('death');
        }
        else {
            this.switchSprite('takeHit');
        }
    }

    update() {
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        this.draw();
        // if (this.dead) {
        //     return;
        // }
        // this.animateFrame();

        if (!this.dead) {
            this.animateFrame();
        }
        else {
            this.position.y += this.velocity.y;

            // Incorporate gravity effect
            if (Math.floor(this.position.y + this.height + this.velocity.y) > Math.floor(canvas.height) - 96) {
                this.velocity.y = 0;
                this.position.y = 331;
            }
            else {
                this.velocity.y += gravity;
            }

            return;
        }

        if (
            this.position.x + this.velocity.x <= 0
            || this.position.x + this.width + this.velocity.x >= canvas.width
        ) {
            this.velocity.x = 0;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Incorporate gravity effect
        if (Math.floor(this.position.y + this.height + this.velocity.y) > Math.floor(canvas.height) - 96) {
            this.velocity.y = 0;
            this.position.y = 331;
        }
        else {
            this.velocity.y += gravity;
        }

        // // Attack box
        // if (this.isAttacking) {
        //     context.fillStyle = 'green';
        //     context.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        // }
    }

    switchSprite(sprite) {
        if (this.dead) {
            return;
        }

        // Overide to death in case player dies between frames
        if (sprite === 'death' && this.image !== this.sprites.death.image) {
            this.image = this.sprites.death.image;
            this.framesMax = this.sprites.death.framesMax;
            this.frames = 0;
        }

        // Overide to death animation
        if (this.image === this.sprites.death.image) {
            if (this.frames + 1 === this.framesMax) {
                this.dead = true;
            }

            return;
        }

        // Overide to attack from hit animation
        if (sprite === 'attack1' && this.image !== this.sprites.attack1.image) {
            this.image = this.sprites.attack1.image;
            this.framesMax = this.sprites.attack1.framesMax;
            this.frames = 0;
        }

        // Overide to attack animation
        if (this.image === this.sprites.attack1.image && this.frames + 1 < this.framesMax) {
            if (this.position.y + this.height >= canvas.height - 95) {
                this.velocity.x = 0;
            }

            return;
        }

        // Overide to take hit animation
        if (this.image === this.sprites.takeHit.image && this.frames + 1 < this.framesMax) {
            return;
        }

        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image;
                    this.framesMax = this.sprites.idle.framesMax;
                    this.frames = 0;
                }

                break;

            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image;
                    this.framesMax = this.sprites.run.framesMax;
                    this.frames = 0;
                }

                break;

            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image;
                    this.framesMax = this.sprites.jump.framesMax;
                    this.frames = 0;
                }

                break;

            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image;
                    this.framesMax = this.sprites.fall.framesMax;
                    this.frames = 0;
                }

                break;

            case 'attack1':
                if (this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image;
                    this.framesMax = this.sprites.attack1.framesMax;
                    this.frames = 0;
                }

                break;

            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image;
                    this.framesMax = this.sprites.takeHit.framesMax;
                    this.frames = 0;
                }

                break;

            case 'death':
                if (this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image;
                    this.framesMax = this.sprites.death.framesMax;
                    this.frames = 0;
                }

                break;

            default:
                break;
        }
    }
};
