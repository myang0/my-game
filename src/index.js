import 'phaser';

import {MenuScene} from '../scenes/MenuScene';
import {Level1Scene} from '../scenes/Level1Scene';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 400,
    height: 800,
    scene: [ MenuScene, Level1Scene ],
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    }
};

var game = new Phaser.Game(config);

// function preload ()
// {
//     this.load.image('logo', 'assets/logo.png');
// }

// function create ()
// {
//     var logo = this.add.image(400, 150, 'logo');

//     this.tweens.add({
//         targets: logo,
//         y: 450,
//         duration: 2000,
//         ease: 'Power2',
//         yoyo: true,
//         loop: -1
//     });

// }
