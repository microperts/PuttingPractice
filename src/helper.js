import Phaser from 'phaser' 

let width, height
let GAME_WIDTH = 920
let GAME_HEIGHT = 550 

export default class Helper extends Phaser.Scene{

    constructor ()
    {
        super({key: "helper"});
    }
    create()
    {
        width = this.scale.gameSize.width
        height = this.scale.gameSize.width

        this.matter.world.setBounds(0,0, this.GAME_WIDTH, this.GAME_HEIGHT, 64, false, false, true, true)

        this.parent = new Phaser.Structs.Size(width, height)
        this.sizer = new Phaser.Structs.Size(this.GAME_WIDTH, this.GAME_HEIGHT,
            Phaser.Structs.Size.FIT, this.parent)

        this.parent.setSize (width, height)
        this.sizer.setSize(width, height)
        // console.log(this.sizer.setAspectRatio(parent.innerWidth / parent.innerHeight))

        this.updateCamera()
        this.scale.on('resize', this.resize, this)
    }

    resize(gameSize) {
        const width = Math.round(gameSize.width )
        const height = Math.round(gameSize.height)

        this.parent.setSize(width, height)
        this.sizer.setSize(width, height)

        this.scale.displaySize.setAspectRatio(this.scale.baseSize.aspectRatio)

        this.updateCamera()
    }

    updateCamera()
    {
        const camera = this.cameras.main
        const x = Math.ceil((this.parent.width - this.sizer.width)* 0.5)
        const y = 0 
        const scaleX = this.sizer.width/ this.GAME_WIDTH
        const scaleY = this.sizer.height / this.GAME_HEIGHT

        camera.setViewport(x,y,this.sizer.width, this.sizer.height)
        camera.setZoom(Math.max(scaleX, scaleY))
        camera.centerOn(Math.round(this.GAME_WIDTH /2), Math.round(this.GAME_HEIGHT /2))

    }

}