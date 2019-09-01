import { Feather } from "../classes/Feather";
import { Lvl1Player } from "../classes/Lvl1Player";

export class Level1Scene extends Phaser.Scene {
    constructor() {
        super("level1");

        this.gScale = 1;
    }

    preload() {
        this.load.atlas("pidgeotto", "assets/spritesheets/Pidgeotto.png", "assets/spritesheets/Pidgeotto.json");
        this.load.atlas("gust", "assets/spritesheets/Gust.png", "assets/spritesheets/Gust.json");

        this.load.image("feather", "assets/pictures/Feather.png");
    }

    create() {
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

        this.keyboard = this.input.keyboard.addKeys("W, A, S, D, SPACE");

        this.pidgeotto = new Lvl1Player(this, 100, 400, "pidgeotto", "PidgeottoFly_01.png").setDepth(2);
        this.gust = this.add.sprite(100, 360, "gust", "Gust_01.png").setDepth(1);

        this.pidgeotto.play("pidgeotto_fly");
        this.gust.play("gust_spin");

        this.feathers = this.add.group();
    }

    update() {
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

        if (this.keyboard.SPACE.isDown === true && this.pidgeotto.feathersUp === true) {
            this.pidgeotto.anims.msPerFrame = 64;

            var f = new Feather(this, this.pidgeotto.x + ((Math.random() * 50) - 25), this.pidgeotto.y, "feather", "Feather.png");
            this.feathers.add(f);

            this.pidgeotto.setCooldown();
        } 
        
        else {
            this.pidgeotto.anims.msPerFrame = 128;
        }

        this.pidgeotto.update();

        for (var i = 0; i < this.feathers.getChildren().length; i++) {
            var feather = this.feathers.getChildren()[i];
            feather.update();
        }
    }
}