export class PresentExplosion extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, xPos, yPos, texture, frame) {
        super(scene, xPos, yPos, texture, frame);

        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);

        scene.physics.world.enableBody(this);
        this.setImmovable(true);

        this.play("present_explosion");
        this.once("animationcomplete", () => {
            this.destroy();
        })
    }

    update() {

    }
}