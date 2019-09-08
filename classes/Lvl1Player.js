export class Lvl1Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, xPos, yPos, texture, frame) {
        super(scene, xPos, yPos, texture, frame);

        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);

        scene.physics.world.enableBody(this);
        this.setImmovable(true);

        this.timers = {feather: 0, gust: 0, switch: 0, hurricane: 0};
        this.cooldowns = {feather: 5, gust: 15, switch: 20, hurricane: 60};
        this.actives = {feather: true, gust: true, switch: true, hurricane: true};

        this.atkModes = {featherDance: true, gust: false, hurricane: false};
        this.atkMode = this.atkModes.featherDance;
    }

    // Checks if given attack mode is active
    checkAtkMode(key) {
        if (this.atkModes[key] == true) {
            return true;
        } else {
            return false;
        }
    }

    // Checks if an action is off cooldown
    isActive(key) {
        if (this.actives[key] == true) {
            return true;
        } else {
            return false;
        }
    }         

    switchAtkMode() {
        if (this.atkModes.featherDance == true) {
            this.atkModes.featherDance = false;
            this.atkModes.gust = true;
        } else if (this.atkModes.gust == true) {
            this.atkModes.gust = false;
            this.atkModes.hurricane = true;
        } else {
            this.atkModes.hurricane = false;
            this.atkModes.featherDance = true;
        }
    }

    setCooldown(key) {
        this.timers[key] = this.cooldowns[key];
        this.actives[key] = false;
    }

    update() {
        // Decrement all cooldown timers
        for (var key of Object.keys(this.timers)) {
            if (this.timers[key] > 0) {
                this.timers[key]--;

                // Set active to true if a cooldown timer reaches zero
                if (this.timers[key] <= 0) {
                    this.actives[key] = true;
                }
            }
        }
    }
}