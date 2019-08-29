export class MenuScene extends Phaser.Scene {
    constructor() {
        super("menu"); 
    }

    preload() {
        this.load.image("background", "assets/backgrounds/MenuBG.png");
        this.load.image("start", "assets/pictures/Start.png");
        this.load.image("controls", "assets/pictures/Controls.png");
        this.load.image("logo", "assets/pictures/Logo.png");

        this.load.audio("hover", "assets/soundeffects/hover.mp3");
        this.load.audio("select", "assets/soundeffects/select.mp3");
        this.load.audio("menu_bgm", "assets/music/MenuTheme.mp3");
    }

    create() {
        var hoverSound = this.sound.add("hover");
        var selectSound = this.sound.add("select");

        var menuBgm = this.sound.add("menu_bgm", {loop: true, volume: 0.5});
        menuBgm.play();

        // Background
        this.bg = this.add.image(0, 0, "background").setDepth(1);
        this.bg.setOrigin(0, 0);
        this.bg.scaleX = 0.55;
        this.bg.scaleY = 0.6;

        // Logo
        var logo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 - 150, "logo").setDepth(2);
        logo.scaleX = 1.5;
        logo.scaleY = 1.5;

        var logoTween = this.tweens.add({
            targets: logo,
            y: 235,
            duration: 1000,
            ease: 'Power1',
            yoyo: true,
            repeat: -1
        })

        // Start
        var startButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "start").setDepth(2);
        startButton.setInteractive();

        // Controls
        var controlsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 50, "controls").setDepth(2);
        controlsButton.setInteractive();

        var hoverTweenS = this.tweens.add({
            targets: startButton,
            paused: true,
            alpha: 0.5,
            duration: 100,
            yoyo: true,
            repeat: -1
        });

        var hoverTweenC = this.tweens.add({
            targets: controlsButton,
            paused: true,
            alpha: 0.5,
            duration: 100,
            yoyo: true,
            repeat: -1
        });

        var clickTween = this.tweens.add({
            targets: startButton,
            paused: true,
            alpha: 0.01,
            duration: 50,
            yoyo: true,
            repeat: 10
        })

        startButton.on("pointerover", () => {
            hoverSound.play();

            hoverTweenS.play();
        });

        startButton.on("pointerout", () => {
            hoverTweenS.restart();
            hoverTweenS.stop();
        });

        startButton.on("pointerdown", () => {
            hoverTweenS.restart();
            hoverTweenS.stop();

            menuBgm.stop();

            clickTween.play();
            selectSound.play();

            startButton.removeInteractive();
            controlsButton.removeInteractive();
        });

        controlsButton.on("pointerover", () => {
            hoverSound.play();
            hoverTweenC.play();
        });

        controlsButton.on("pointerout", () => {
            hoverTweenC.restart();
            hoverTweenC.stop();
        })
    }
}