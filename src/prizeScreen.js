import Phaser from 'phaser'

export default class PrizeScreen extends Phaser.Scene {
    constructor()
    {
        super({key: 'prizeScreen'})
    }

    create()
    {
        this.prizeScreen = this.add.image(450,275, 'prize', undefined).setScale(0.6)
        this.continue = this.add.image(675,455, 'continue', undefined).setScale(0.6).setInteractive({ useHandCursor: true})

        this.continue.on('pointerup', ()=>{
            this.registry.destroy()
            this.scene.stop('prizeScreen')
            this.scene.launch('introScreen')
        })

    }
}