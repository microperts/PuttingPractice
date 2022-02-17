import Phaser from 'phaser'

export default class IntroScreen extends Phaser.Scene {
    constructor()
    {
        super({key: 'introScreen'})
    }

    create()
    {
        this.introScreen = this.add.image(450,275, 'intro', undefined).setScale(0.6)
        this.continue = this.add.image(675,455, 'continue', undefined).setScale(0.6).setInteractive({ useHandCursor: true})

        this.continue.on('pointerup', ()=>{
            this.registry.destroy()
            this.scene.stop('introScreen')
            this.scene.start('game')
        })

    }
}