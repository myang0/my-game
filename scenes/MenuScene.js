export class MenuScene extends Phaser.Scene {
    constructor() {
        super("menu"); 
    }

    preload() {
        this.load.image("background", "assets/backgrounds/MenuBG.png");
        this.load.image("start", "assets/pictures/Start.png");

        this.load.audio("hover", "assets/soundeffects/hover.mp3");
    }

    create() {
        var hoverSound = this.sound.add("hover");

        // Background
        this.bg = this.add.image(0, 0, "background").setDepth(1);
        this.bg.setOrigin(0, 0);
        this.bg.scaleX = 0.55;
        this.bg.scaleY = 0.6;

        var startButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "start").setDepth(2);
        startButton.scaleX = 1.5;
        startButton.scaleY = 1.5;

        startButton.setInteractive();

        var StartTween = this.tweens.add({
            targets: startButton,
            paused: true,
            alpha: 0.5,
            duration: 100,
            yoyo: true,
            repeat: -1
        });

        startButton.on("pointerover", () => {
            hoverSound.play();

            StartTween.play();
        });

        startButton.on("pointerout", () => {
            startButton.y = this.game.renderer.height / 2;

            StartTween.restart();
            StartTween.stop();
        });

        startButton.on("pointerdown", () => {

        })

        console.log(this.game.renderer.width);

        //console.log(this.config.height)
    }
}