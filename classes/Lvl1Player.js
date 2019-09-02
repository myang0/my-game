export class Lvl1Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, xPos, yPos, texture, frame) {
        super(scene, xPos, yPos, texture, frame);

        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);

        scene.physics.world.enableBody(this);
        this.setImmovable(true);

        this.timers = {feather: 0, gust: 0, switch: 0};
        this.cooldowns = {feather: 5, gust: 15, switch: 10};
        this.actives = {feather: true, gust: true, switch: true};

        this.atkModes = {featherDance: 1, gust: 2, hurricane: 3}
        this.atkMode = this.atkModes.featherDance;
    }

    switchAtkMode() {
        if (this.atkMode == this.atkModes.featherDance) {
            this.atkMode = this.atkMode.gust;
        } else if (this.atkMode == this.atkModes.gust) {
            this.atkMode = this.atkMode.hurricane;
        } else {
            this.atkMode = this.atkMode.featherDance;
        }
    }

    shootFeather() {
        this.timers.feather = this.cooldowns.feather;
        this.actives.feather = false;
    }

    update() {
        for (var key of Object.keys(this.timers)) {
            if (this.timers[key] > 0) {
                this.timers[key]--;
                if (this.timers[key] <= 0) {
                    this.actives[key] = true;
                }
            }
        }
    }
}