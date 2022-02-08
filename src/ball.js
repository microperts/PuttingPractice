import Phaser from "phaser"

export default class Ball extends Phaser.Physics.Matter.Image {

    constructor(world, x, y, texture, frame)
    {
        super(world,x,y,texture,frame)
        world.scene.add.existing(this)

        this.isStatic = false,
        this.setScale(0.5)
        this.setCircle(8)
        this.setMass(20)
    }
    
}