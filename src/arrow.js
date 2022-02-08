import Phaser from "phaser"

export default class Arrow extends Phaser.GameObjects.Image {

    constructor(scene, x, y, texture, frame)
    {
        super(scene,x,y,texture,frame)
        scene.add.existing(this)

        this.isStatic = true
        this.setOrigin(0.5, 1)
    }
    
}