import Phaser from 'phaser'

let handlerScene = null

export default class Preloader extends Phaser.Scene
{
    
    constructor(){
        super({key: "preloader"})
    }

    preload()
    {
        this.load.image('bg', './assets/bg1.png');
        this.load.image('prize', './assets/prize.png');
        this.load.image('continue', './assets/continue2.png');
        this.load.image('btnbg', './assets/Continue.png');
        this.load.image('intro', './assets/introScreen.png');
        this.load.image('gameover', './assets/gameover.png');
        
        this.load.image('arrow', './assets/arroww.png');
        this.load.image('bar', './assets/powerBar.png');
        this.load.image('golf-hole', './assets/hole2.png');
        this.load.image('golf-ball', './assets/ball.png');
        
        this.load.audio('ball-hit', './assets/golf-ball-hit.mp3')
        this.load.audio('ball-fall', './assets/ball-fall.mp3')

        this.load.image('back', './assets/back2.png');
        this.load.image('restart', './assets/restart.png');
        this.load.image('congrats', './assets/Congrats2.png');
        this.load.image('dir', './assets/dir2.png');
        this.load.image('0score', './assets/0score.png');
        this.load.image('score', './assets/Score2.png');
        this.load.image('trail', './assets/trail.png')


        this.load.html('nameform', './form.html');
        this.load.html('highscoreForm', './highScoreForm.html');

        handlerScene = this.scene.get('sizeHandler')

    }

    create()
    {
        this.scene.launch('game')
        this.scene.launch('prizeScreen')

        handlerScene.updateResize(this)    
    }

    updateCamera() 
    {
        const width = this.scale.gameSize.width
        const height = this.scale.gameSize.height

        const camera = this.cameras.main

        const offset  = 120 * zoom

    //     const zoom = this.gameScene.getZoom()

    //    camera.setZoom(zoom)
    //     camera.centerOn(1501/2 , 256 /2 + 120)

    }
}