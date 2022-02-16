import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene
{
    
    constructor(){
        super({key: "preloader"})
    }

    preload()
    {
        this.load.image('bg', './assets/bg1.png');
        
        this.load.image('arrow', './assets/arroww.png');
        this.load.image('bar', './assets/powerBar.png');
        this.load.image('golf-hole', './assets/hole2.png');
        this.load.image('golf-ball', './assets/ball.png');
        
        this.load.audio('ball-hit', './assets/golf-ball-hit.mp3')
        this.load.audio('ball-fall', './assets/ball-fall.mp3')

        this.load.image('back', './assets/back2.png');
        this.load.image('restart', './assets/restart.png');
        this.load.image('congrats', './assets/Congrats2.png');
        this.load.image('0score', './assets/0score.png');
        this.load.image('score', './assets/Score2.png');
        this.load.image('trail', './assets/trail.png')


        this.load.html('nameform', './form.html');
        this.load.html('highscoreForm', './highScoreForm.html');

    }

    create()
    {
        this.scene.launch('game')

        this.gameScene = this.scene.get('game')
    }

    updateCamera() 
    {
        const width = this.scale.gameSize.width
        const height = this.scale.gameSize.height

        const camera = this.cameras.main

        const offset  = 120 * zoom

        const zoom = this.gameScene.getZoom()

       camera.setZoom(zoom)
        camera.centerOn(1501/2 , 256 /2 + 120)

    }
}