import { Present } from "./Present";

export class Delibird extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, xPos, yPos, texture, frame) {
        super(scene, xPos, yPos, texture, frame);

        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);

        scene.physics.world.enableBody(this);
        this.setImmovable(true);

        this.play("delibird_walk");
        this.setVelocityY(96);

        this.atkTimer = Math.random() * 60 + 120;
        this.throwMax = 16;
        this.throwTimer = -1; 
    }

    update() {
        this.atkTimer--;
        if (this.atkTimer <= 0) {
            this.play("delibird_atk");
            this.anims.chain("delibird_walk");

            this.atkTimer = Math.random() * 60 + 120;
            this.throwTimer = 16;
        }

        if (this.throwTimer >= -1) {
            this.throwTimer--;
            if (this.throwTimer == 0) {
                var p = new Present(this.scene, this.x, this.y, this.scene.pidgeotto.x, this.scene.pidgeotto.y, "present");
                this.scene.enemyProjectiles.add(p);
            }
        }

        if (this.y >= this.scene.game.renderer.height + 20) {
            this.destroy();
        }
    }
}