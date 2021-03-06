import { Feather } from "../classes/Feather";
import { Lvl1Player } from "../classes/Lvl1Player";
import { Gust } from "../classes/Gust";
import { Hurricane } from "../classes/Hurricane";
import { Present } from "../classes/Present";
import { Delibird } from "../classes/Delibird";
import { PresentExplosion } from "../classes/PresentExplosion";

export class Level1Scene extends Phaser.Scene {
    constructor() {
        super("level1");

        this.gScale = 1;
    }

    preload() {
        this.load.atlas("pidgeotto", "assets/spritesheets/Pidgeotto.png", "assets/spritesheets/Pidgeotto.json");
        this.load.atlas("gust", "assets/spritesheets/Gust.png", "assets/spritesheets/Gust.json");
        this.load.atlas("hurricane", "assets/spritesheets/Hurricane.png", "assets/spritesheets/Hurricane.json");
        this.load.atlas("delibird", "assets/spritesheets/delibird.png", "assets/spritesheets/delibird_atlas.json");
        this.load.atlas("p_explosion", "assets/spritesheets/presentexplosion.png", "assets/spritesheets/presentexplosion_atlas.json");

        this.load.image("feather", "assets/pictures/Feather.png");
        this.load.image("present", "assets/pictures/Present.png");
        
        this.load.audio("atk_switch", "assets/soundeffects/switchAtk.mp3");
    }

    create() {
        this.switchSound = this.sound.add("atk_switch");

        this.anims.create({
            key: "pidgeotto_fly",
            frameRate: 10,
            frames: this.anims.generateFrameNames("pidgeotto", {
                prefix: "PidgeottoFly_0",
                suffix: ".png",
                start: 1,
                end: 4
            }),
            repeat: -1
        });

        this.anims.create({
            key: "pidgeotto_glide",
            frameRate: 10,
            frames: this.anims.generateFrameNames("pidgeotto", {
                prefix: "PidgeottoGlide_0",
                suffix: ".png",
                start: 1,
                end: 6
            }),
            repeat: -1
        });

        this.anims.create({
            key: "gust_spin",
            frameRate: 10,
            frames: this.anims.generateFrameNames("gust", {
                prefix: "Gust_0",
                suffix: ".png",
                start: 1,
                end: 4
            }),
            repeat: -1
        });

        this.anims.create({
            key: "hurricane_spin",
            frames: this.anims.generateFrameNames("hurricane", {
                prefix: "Hurricane_0",
                suffix: ".png",
                start: 1,
                end: 4
            }),
            repeat: -1
        });

        this.anims.create({
            key: "delibird_walk",
            frameRate: 4,
            frames: this.anims.generateFrameNames("delibird", {
                prefix: "delibirdwalk_0",
                start: 1,
                end: 4
            }),
            repeat: -1
        });

        this.anims.create({
            key: "delibird_atk",
            frames: this.anims.generateFrameNames("delibird", {
                prefix: "delibirdatk_0",
                start: 1,
                end: 8
            })
        });

        this.anims.create({
            key: "present_explosion",
            frameRate: 15,
            frames: this.anims.generateFrameNames("p_explosion", {
                prefix: "presentexplosion_0",
                start: 1,
                end: 4
            }),
        });

        this.keyboard = this.input.keyboard.addKeys("W, A, S, D, SPACE, Q");

        this.pidgeotto = new Lvl1Player(this, this.game.renderer.width / 2, 3 * this.game.renderer.height / 4, "pidgeotto", "PidgeottoFly_01.png").setDepth(2);
        this.pidgeotto.play("pidgeotto_fly");

        this.playerProjectiles = this.add.group();
        this.enemyProjectiles = this.add.group();
        this.enemies = this.add.group();

        this.spaceHeld = false;
        this.hurricane = null;

        var d = new Delibird(this, Math.random() * this.game.renderer.width, -25, "delibird", "delibirdwalk_01").setScale(0.7);
        this.enemies.add(d);

        this.physics.add.overlap(this.playerProjectiles, this.enemies, () => {

        })
    }

    update() {
        // Movement
        if (this.keyboard.W.isDown === true) {
            this.pidgeotto.setVelocityY(-256);
        } if (this.keyboard.S.isDown === true) {
            this.pidgeotto.setVelocityY(256);
        } if (this.keyboard.W.isUp === true && this.keyboard.S.isUp === true) {
            this.pidgeotto.setVelocityY(0);
        } if (this.keyboard.A.isDown === true) {
            this.pidgeotto.setVelocityX(-256);
        } if (this.keyboard.D.isDown === true) { 
            this.pidgeotto.setVelocityX(256);
        } if (this.keyboard.A.isUp === true && this.keyboard.D.isUp === true) {
            this.pidgeotto.setVelocityX(0);
        }

        // Switch attack mode
        if (this.keyboard.Q.isDown) {
            if (this.pidgeotto.isActive("switch")) {
                this.pidgeotto.switchAtkMode();
                this.pidgeotto.setCooldown("switch");
    
                this.switchSound.play();
            } 

            if (this.spaceHeld) {
                this.spaceHeld = false;
                
                this.hurricane.destroy();
                this.hurricane = null;

                this.pidgeotto.play("pidgeotto_fly");
            }
        }

        // Using feather dance
        if (this.pidgeotto.checkAtkMode("featherDance")) {
            if (this.keyboard.SPACE.isDown == true && this.pidgeotto.isActive("feather")) {
                this.pidgeotto.anims.msPerFrame = 64;

                var f = new Feather(this, this.pidgeotto.x + ((Math.random() * 50) - 25), this.pidgeotto.y, "feather", "Feather.png");
                this.playerProjectiles.add(f);

                this.pidgeotto.setCooldown("feather");
            } else {
                this.pidgeotto.anims.msPerFrame = 128;
            }
        }

        // Using gust
        else if (this.pidgeotto.checkAtkMode("gust")) {
            if (this.keyboard.SPACE.isDown == true && this.pidgeotto.isActive("gust")) {
                var g = new Gust(this, this.pidgeotto.x, this.pidgeotto.y, "gust", "Gust_01.png");
                this.playerProjectiles.add(g);

                this.pidgeotto.setCooldown("gust");
            }
        }

        // Using hurricane
        else if (this.pidgeotto.checkAtkMode("hurricane")) {
            if (this.keyboard.SPACE.isDown == true && this.spaceHeld == false && this.pidgeotto.isActive("hurricane")) {
                this.spaceHeld = true;
                this.hurricane = new Hurricane(this, this.pidgeotto.x, this.pidgeotto.y - 50, "hurricane", "Hurricane_01.png");

                this.pidgeotto.play("pidgeotto_glide");
            } 
            
            else if (this.keyboard.SPACE.isDown == true && this.spaceHeld == true) {
                this.hurricane.charge();

                this.hurricane.x = this.pidgeotto.x;
                this.hurricane.y = this.pidgeotto.y - 50;
            }
            
            else if (this.keyboard.SPACE.isUp == true && this.spaceHeld == true) {
                this.spaceHeld = false;

                this.hurricane.release();
                this.playerProjectiles.add(this.hurricane);

                this.pidgeotto.setCooldown("hurricane");

                this.hurricane = null;
                this.pidgeotto.play("pidgeotto_fly");
            }
        }

        this.pidgeotto.update();

        for (var i = 0; i < this.playerProjectiles.getChildren().length; i++) {
            var pProj = this.playerProjectiles.getChildren()[i];
            pProj.update();
        }

        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            var enemy = this.enemies.getChildren()[i];
            enemy.update();
        }

        for (var i = 0; i < this.enemyProjectiles.getChildren().length; i++) {
            var eProj = this.enemyProjectiles.getChildren()[i];
            eProj.update();
        }
    }
}