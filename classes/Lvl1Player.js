export class Lvl1Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, xPos, yPos, texture, frame) {
        super(scene, xPos, yPos, texture, frame);

        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);

        scene.physics.world.enableBody(this);
        this.setImmovable(true);

        this.featherTimer = 0;
        this.featherCooldown = 5;
        this.feathersUp = true;
    }

    setCooldown() {
        this.featherTimer = this.featherCooldown;
        this.feathersUp = false;
    }

    update() {
        if (this.featherTimer > 0) {
            this.featherTimer--;
            if (this.featherTimer <= 0) {
                this.feathersUp = true;
            }
        }
    }
}