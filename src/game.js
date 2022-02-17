import Phaser from 'phaser' 
import Helper from './helper';
import Arrow from './arrow'
import Ball from './ball'


let score = 0, bestScore = 0
let mouse
let hit = false, win = false, 
arrowSet = false, powerSet = false,
swing = false, ballOnground = false, 
gameOver = false, gameReset = false, start = true

let ballHitSound, ballFall, graphics, curve, path

let golfHole,
golfBall,
arrow, tween, value = 0.02, circleValue

let winTimeout, hitTimeout, slopeTimeOut

let x, y

export default class Game extends Phaser.Scene{

    constructor ()
    {
        super({key: "game"});
    }

    init()
    {
        hit = false
        arrowSet = false
        powerSet = false
        swing = false
        arrowSet = false
        ballOnground = false
        gameReset = false
        gameOver = false
        win = false

        window.clearTimeout(winTimeout)
        window.clearTimeout(hitTimeout)
        window.clearTimeout(slopeTimeOut)

        circleValue =  Math.random() * (0.06 - 0.01) + 0.01
    }

    create()
    {
        this.helper = new Helper()
        ballHitSound = this.sound.add('ball-hit')
        ballFall = this.sound.add('ball-fall')

        this.bg = this.add.image(460, 275, 'bg')
        golfHole = this.add.image(500,140,'golf-hole')
        golfHole.setScale(0.45)
        golfBall = new Ball(this.matter.world, 475,470,'golf-ball', undefined)
        arrow = new Arrow(this,475,460,'arrow',undefined)
        this.circle =  this.add.circle(500, 140, 8, 0xFF0000).setVisible(false)
        this.degree = Phaser.Math.RadToDeg(circleValue)


        this.add.text(70,500,'Slope: ' +this.degree.toFixed(2) +'°', {fontFamily: 'Chunk'})
        this.add.text(700,450,'Score: ' +score, {fontFamily: 'Chunk'})
        this.add.text(700,500,'Best Score: ' +bestScore, {fontFamily: 'Chunk'})

        mouse = this.input.activePointer;

        tween =  this.tweens.addCounter({
            duraton: 5000,
            from: 0,
            to: 1,
            ease: 'Sine.linear',
            yoyo: true,
            onUpdate: function ()
            {
                arrow.rotation +=value
                var radius = 60;
                var angle  = arrow.angle
                x = radius * Math.sin(Math.PI * 2 * angle / 360) 
                y = radius * Math.cos(Math.PI * 2 * angle / 360) 
                // console.log('Points coors are  x='+ 
                //    Math.round(x * 100) / 100 +', y=' +
                //    Math.round(y * 100) / 100)
                x =  (Math.round(x * 100) / 100 ) * 0.085
                y = (Math.round(y * 100) / 100) * 0.085
            },
            onYoyo: function(){
                    value *= -1
                },
            onComplete: function(){
                arrow.rotation += value
                console.log("in complete" +arrow.rotation)
            }
        });

        this.input.on('pointerup', function () {
                if(arrowSet === true){
                    powerSet = true
                }
                else {
                    arrowSet = true
                }
            //console.log('arrowset: '+ arrowSet + " powerset: " + powerSet)        
        });

    }
    
    update()
    {    
        if(this.checkPoint(golfBall.x, golfBall.y,this.circle.x, this.circle.y, 10) === true){
            if(win === false)
            { 
                win = true
                this.goal()
                this.resetGame()
            }        
         }
         if(ballOnground === true){
            //  console.log('game over')
             if(this.checkPoint(golfBall.x, golfBall.y,this.circle.x, this.circle.y, 10) === false) {
                    ballOnground = false
                    gameOver = true
                    this.scene.pause('game');
                    this.scene.launch('gameover')
                    gameOver = false
                    score = 0
                }
         }
                      //restart game logic
        if( hit === true && gameOver === false){
            if( win === true){
                if(gameReset === false)
                { 
                    start = false
                    ballOnground = false
                   // ballFall.stop()
                    this.resetGame()
                }
            }
        }

        // if(mouse.isDown === true){
            if(arrowSet === false){
                tween.play()
            }

            if(powerSet === false && arrowSet === true){
         
                //setting arrow angle
                tween.stop()
                let y = arrow.rotation
                arrow.setRotation(y)
                swing = true
            }
            else {
                //console.log("Power"+power)
                if(hit === false && swing === true){
                        this.hitBall()
                        this.scaleBall()
                        this.slope()
                    }
                }
    }

    //when ball is hit
    hitBall ()
    {
        hitTimeout = setTimeout(() => {
            if(win === true){
                return
            }
            ballOnground = true
        }, 5000);
        ballHitSound.play()

        golfBall.setVelocity(x,-y)

        hit = true
    }

    slope()
    {
       slopeTimeOut =  setTimeout(()=>{
            
                let vec = new Phaser.Math.Vector2(circleValue , 0)
                this.vx = golfBall.body.velocity.x + vec.x
                this.vy = golfBall.body.velocity.y + vec.y

                console.log("velocity x "+this.vx)

                golfBall.setVelocity(this.vx,this.vy)
                this.slope()
        }, 50)
    }

    scaleBall(){

        setTimeout(()=>{ 
            this.tweens.add({
                targets: golfBall,
                scaleX: '-=.3',
                scaleY: '-=.3',
                duration: 900,
                ease: 'Linear',
             });
        },600)
    }

    //when ball is put in cup 
    goal()
    {
        ballFall.play()
        golfBall.setVelocity(0)
        golfBall.setVisible(false)

        score += 1
        if(bestScore < score){
            bestScore = score
        }
        // if(bestScore === score){
        //     console.log(bestscore)
        // }
        // else {
        //     bestScore += score
        // }
    }

    exitGame(){
    //    this.scene.destroy("game")
        this.scene.stop('game')
        window.parent.data.on_game_exit()
        // console.log('After parent data')
    }

    //reset game
    resetGame(){
        if(gameOver === false)
        {
            console.log("reset game called")
    
           winTimeout =  setTimeout(()=>{
              //  this.registry.destroy() // destroy registry
                this.scene.restart() // restart current scene
            },1000)
        }
    }
    map (value, x1, y1, x2, y2) 
    { 
        return (value - x1) * (y2 - x2) / (y1 - x1) + x2
    }
    checkPoint(a, b, x, y, r) {
        var dist_points = (a - x) * (a - x) + (b - y) * (b - y);
        r *= r;
        if (dist_points < r) {
            return true;
        }
        return false;
    }
}