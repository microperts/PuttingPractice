import Phaser from 'phaser'

let width, height
let GAME_WIDTH = 900, GAME_HEIGHT = 550 

export default class SizeHandler extends Phaser.Scene{
    constructor ()
    {
        super({key: 'sizeHandler'});
    }

    create() {
        this.launchScene('preloader')
    }
    
    launchScene(scene, data) {
        this.scene.launch(scene, data)
        this.gameScene = this.scene.get(scene)
    }

    updateResize(scene) {
        scene.scale.on('resize', this.resize, scene)

        width = scene.scale.gameSize.width
        height = scene.scale.gameSize.width

        scene.parent = new Phaser.Structs.Size(width, height)
        scene.sizer = new Phaser.Structs.Size(GAME_WIDTH, GAME_HEIGHT,
            Phaser.Structs.Size.FIT, scene.parent)

        scene.parent.setSize (width, height)
        scene.sizer.setSize(width, height)

        this.updateCamera(scene)
    }

    resize(gameSize) {
        const width = Math.round(gameSize.width)
        const height = Math.round(gameSize.height)

        this.parent.setSize(width, height)
        this.sizer.setSize(width, height)

        const camera = this.cameras.main
        const scaleX = this.sizer.width / GAME_WIDTH
        const scaleY = this.sizer.height / GAME_HEIGHT

        camera.setZoom(Math.max(scaleX, scaleY))
        camera.centerOn(GAME_WIDTH / 2, GAME_HEIGHT / 2)

        // this.scale.displaySize.setAspectRatio(this.scale.baseSize.aspectRatio)

        // this.updateCamera()
    }

    updateCamera(scene)
    {
        const camera = scene.cameras.main
        const x = Math.ceil((scene.parent.width - scene.sizer.width)* 0.5)
        const y = 0 
        const scaleX = scene.sizer.width/ GAME_WIDTH
        const scaleY = scene.sizer.height / GAME_HEIGHT

        camera.setViewport(x,y,scene.sizer.width, scene.sizer.height)
        camera.setZoom(Math.max(scaleX, scaleY))
        camera.centerOn(Math.round(GAME_WIDTH /2), Math.round(GAME_HEIGHT /2))

    }
}