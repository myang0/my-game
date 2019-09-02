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