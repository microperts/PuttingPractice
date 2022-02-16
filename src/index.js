import Phaser from 'phaser'

import Preloader from './Preloader'
import Game  from './Game'
import SendHighScore from './sendHighScore';
import SendToFriend from './sendToFriend';
import GameOver from './gameOver';


const config = {
    type: Phaser.CANVAS,
    resolution: 10,
    width: 920 , 
    height: 550,
    scale: {
        mode: Phaser.Scale.FIT,  
        parent: 'gameFrame',
    },
    physics: {
        default: 'matter',
        matter: {
			gravity: { y: 0 },
            debug:true
		},
    },
    dom: {
        createContainer: true
    },
    scene:[Preloader, Game, GameOver, SendToFriend, SendHighScore] 
};

let  game = new Phaser.Game(config);

export default module = game