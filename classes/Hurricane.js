export class Hurricane extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, xPos, yPos, texture, frame) {
        super(scene, xPos, yPos, texture, frame);

        scene.add.existing(this);

        scene.physics.world.enableBody(this);
        this.setImmovable(true);

        this.play("hurricane_spin");

        this.scaling = 1;
        this.scaleBoost = 0.01;
        this.maxScale = 2.5;

        this.decayTimer = 120;
    }

    charge() {
        if (this.scaling <= this.maxScale) {
            this.setScale(this.scaling);
            this.scaling += this.scaleBoost;
        }
    }

    release() {
        this.setVelocityX(0);
        this.setVelocityY(-256);
    }

    update() {
        this.decayTimer--;
        if (this.decayTimer <= 0) {
            this.destroy();
        }
    }
}