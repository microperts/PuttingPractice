import Phaser from "phaser"

let label
export default class GameOver extends Phaser.Scene {

    constructor()
    {
        super({key: 'gameover'})
    }

    init()
    {

    }

    create()
    {
        this.textStyle = { fontSize: '16px', fontFamily: 'Chunk',  color: 'white' }

        // let back = this.add.image(470,75,'back')
        this.gameOverScreen = this.add.image(450,275, 'gameover', undefined).setScale(0.6)
        this.add.image(667,205, 'btnbg', undefined).setScale(0.6)
        this.add.image(667,290, 'btnbg', undefined).setScale(0.6)
        this.add.image(667,375, 'btnbg', undefined).setScale(0.6)

        let restart = this.add.text(630,195,'Play Again',this.textStyle).setInteractive({ useHandCursor: true  })

        let sendToFriend = this.add.text(620,280,'Send to Friend',this.textStyle).setInteractive({ useHandCursor: true  })
        let sendHighScore = this.add.text(620,365,'Send high score',this.textStyle).setInteractive({ useHandCursor: true  })
        // back.setScale(0.5)
        // if(points === 0){
        //     label = this.add.image(100,20, '0score')
        //     label.setScale(0.5)
        // }
        // else {
        //     label = this.add.image(120,5, 'congrats')
        // }

        // this.container = this.add.container(350, 35 ,[sendToFriend, sendHighScore])

        restart.on('pointerup', ()=>{
            this.registry.destroy()
            this.scene.stop('gameover')        
            this.scene.start('game')   
        })
        sendToFriend.on('pointerup', ()=>{
            this.registry.destroy()
            this.scene.stop('gameover')        
            this.scene.start('sendToFriend')   
        })
        sendHighScore.on('pointerup', ()=>{
            this.registry.destroy()
            this.scene.stop('gameover')        
            this.scene.start('sendHighScore')   
        })
    }

    update()
    {

    }
}