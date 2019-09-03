import { Feather } from "../classes/Feather";
import { Lvl1Player } from "../classes/Lvl1Player";
import { Gust } from "../classes/Gust";

export class Level1Scene extends Phaser.Scene {
    constructor() {
        super("level1");

        this.gScale = 1;
    }

    preload() {
        this.load.atlas("pidgeotto", "assets/spritesheets/Pidgeotto.png", "assets/spritesheets/Pidgeotto.json");
        this.load.atlas("gust", "assets/spritesheets/Gust.png", "assets/spritesheets/Gust.json");

        this.load.image("feather", "assets/pictures/Feather.png");
        
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

        this.keyboard = this.input.keyboard.addKeys("W, A, S, D, SPACE, Q");

        this.pidgeotto = new Lvl1Player(this, this.game.renderer.width / 2, 3 * this.game.renderer.height / 4, "pidgeotto", "PidgeottoFly_01.png").setDepth(2);
        this.pidgeotto.play("pidgeotto_fly");

        this.playerProjectiles = this.add.group();
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
            } else {

            }
        }

        // Attacks
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

        else if (this.pidgeotto.checkAtkMode("gust")) {
            if (this.keyboard.SPACE.isDown == true && this.pidgeotto.isActive("gust")) {
                var g = new Gust(this, this.pidgeotto.x, this.pidgeotto.y, "gust", "Gust_01.png");
                this.playerProjectiles.add(g);

                this.pidgeotto.setCooldown("gust");
            }
        }

        else if (this.pidgeotto.checkAtkMode("hurricane")) {
            
        }

        this.pidgeotto.update();

        for (var i = 0; i < this.playerProjectiles.getChildren().length; i++) {
            var pProj = this.playerProjectiles.getChildren()[i];
            pProj.update();
        }
    }
}