export class Present extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, xPos, yPos, targetXPos, targetYPos, texture) {
        super(scene, xPos, yPos, texture);

        scene.add.existing(this);

        scene.physics.world.enableBody(this);
        this.setImmovable(true);

        this.angle = 0;

        this.maxTime = 60;
        this.time = 0;

        var distanceX = targetXPos - xPos;
        var distanceY = targetYPos - yPos;

        this.setVelocityX(distanceX);
        this.setVelocityY(distanceY);
    }

    scaleArc(x) {
        var squared = (- 1 / 720) * (x * x);
        var linear = (11 / 120) * x;
        var constant = 1;

        return squared + linear + constant;
    }

    update() {
        this.angle += 2;
        this.setAngle(this.angle);

        var scaling = this.scaleArc(this.time);
        this.setScale(scaling);

        this.time++;
        if (this.time >= this.maxTime) {
            this.destroy();
        }
    }
}