export class Feather extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, xPos, yPos, texture, frame) {
        super(scene, xPos, yPos, texture, frame);

        scene.add.existing(this);

        scene.physics.world.enableBody(this);
        this.setImmovable(true);

        this.maxVelX = (Math.random() * 500) - 250;
        this.maxVelY = (Math.random() * 250) - 750;

        this.setVelocityX(this.maxVelX);
        this.setVelocityY(this.maxVelY);

        this.maxTime = 75;
        this.decayTimer = this.maxTime;

        var rad =  Math.atan(this.maxVelX / this.maxVelY);
        this.angle = -Phaser.Math.RadToDeg(rad) - 45;
    }

    update() {
        this.decayTimer--;

        var percentage = (this.maxTime - this.decayTimer) * 0.01;
        this.setVelocityX(this.maxVelX - (percentage * this.maxVelX));
        this.setVelocityY(this.maxVelY - (percentage * this.maxVelY));

        if (this.decayTimer <= 0 || this.y < -25 || this.x < -25 || this.x > this.scene.game.renderer.width + 25) {
            this.destroy();
        }
    }
}