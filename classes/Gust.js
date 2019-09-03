export class Gust extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, xPos, yPos, texture, frame) {
        super(scene, xPos, yPos, texture, frame);

        scene.add.existing(this);

        scene.physics.world.enableBody(this);
        this.setImmovable(true);

        this.play("gust_spin");

        this.maxVelX = (Math.random() * 100) - 50;
        this.maxVelY = (Math.random() * 100) - 1250;

        this.maxSlowdownTime = 50;
        this.slowdownTimer = 0;

        this.maxTime = 100;
        this.decayTimer = this.maxTime;

        this.setVelocityX(this.maxVelX);
        this.setVelocityY(this.maxVelY);
    }

    update() {
        if (this.slowdownTimer < 50) {
            var percentage = this.slowdownTimer / this.maxSlowdownTime;

            this.setVelocityX(this.maxVelX - (this.maxVelX * percentage));
            this.setVelocityY(this.maxVelY - (this.maxVelY * percentage));

            this.slowdownTimer++;
        }

        this.decayTimer--;
        if (this.decayTimer <= 0) {
            this.destroy();
        }
    }
}