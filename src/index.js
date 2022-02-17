import Phaser from 'phaser'

import Preloader from './Preloader'
import Game  from './Game'
import SendHighScore from './sendHighScore';
import SendToFriend from './sendToFriend';
import GameOver from './gameOver';
import PrizeScreen from './prizeScreen';
import IntroScreen from './introScreen';


const config = {
    type: Phaser.AUTO,
    resolution: 10,
    width: 1500 , 
    height: 550,
    scale: {
        mode: Phaser.Scale.FIT,  
        // parent: 'gameFrame',
    },
    physics: {
        default: 'matter',
        matter: {
			gravity: { y: 0 },
            debug:false
		},
    },
    dom: {
        createContainer: true
    },
    scene:[Preloader,Game, PrizeScreen ,IntroScreen, GameOver, SendToFriend, SendHighScore] 
};

let  game = new Phaser.Game(config);

export default module = game