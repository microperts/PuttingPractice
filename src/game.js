import Phaser from 'phaser' 
import Helper from './helper';
import Arrow from './arrow'
import Ball from './ball'


let score = 0
let mouse
let hit = false, win = false, 
arrowSet = false, powerSet = false,
swing = false, ballOnground = false, 
gameOver = false, gameReset = false, start = true,
touching = false

let ballHitSound, ballFall

let golfHole,
golfBall, skew,
arrow, tween, value = 0.02

let winTimeout, hitTimeout

let scaleValue

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
        touching = false
        gameOver = false

        window.clearTimeout(winTimeout)
        window.clearTimeout(hitTimeout)
    }

    create()
    {
        this.helper = new Helper()
        ballHitSound = this.sound.add('ball-hit')
        ballFall = this.sound.add('ball-fall')

        this.bg = this.add.image(460, 275, 'bg')
        let logo = this.add.image(80,50,'logo')
        golfHole = this.add.image(500,55,'golf-hole')
        golfHole
        golfBall = new Ball(this.matter.world, 475,470,'golf-ball', undefined)
        arrow = new Arrow(this,475,480,'arrow',undefined)
        this.circle =  this.add.circle(500, 55, 12, 0xFF0000).setVisible(false)

        mouse = this.input.activePointer;

        tween =  this.tweens.addCounter({
            duraton: 5000,
            from: 0,
            to: 1,
            ease: 'Sine.linear',
            yoyo: true,
            onUpdate: function (tween)
            {
               arrow.rotation +=value
               console.log("in tween"+arrow.rotation)

            },
            onYoyo: function(tween){
                    value *= -1
                },
            onComplete: function(){
                arrow.rotation += value
            }
        });

        // skew =   this.tweens.add({
        //     targets: golfBall,
        //     duration: 1000,
        //     ease: 'Sine.easeInOut',
        //     yoyo: true,
        //     onUpdate: function(){
        //         // golfBall.inertia = 0.1
        //         // golfBall.thrustLeft(0.01)
                    
        //         vx = -Math.cos(arrow.rotation) * 0.2
        //         vy = Math.sin(arrow.rotation) * 0.2
        //         golfBall.applyForceFromPositon(golfBall.x, 0.02, {x: 0.05, y: 0.05})
        //         console.log("in update")
        //     }
        // });
        // skew.stop();

        this.input.on('pointerup', function () {
            if(touching === true){
                if(arrowSet === true){
                    powerSet = true
                }
                else {
                    arrowSet = true
                }
            }
            //console.log('arrowset: '+ arrowSet + " powerset: " + powerSet)        
        });
    }
    
    update()
    {
        console.log('mouse:' +mouse.isDown)
    
           if(this.checkPoint(golfBall.x.toFixed(), golfBall.y.toFixed(),this.circle.x, this.circle.y, 12) === true){
            if(win === false)
            { 
                win = true
                this.goal()
                this.resetGame()
             }        
         }
         if(ballOnground === true){
             console.log('game over')
             if(this.checkPoint(golfBall.x.toFixed(), golfBall.y.toFixed(),this.circle.x, this.circle.y, 12) === false) {
                 ballOnground = false
                //  gameOver = true
                //  this.scene.pause('game');
                //  this.scene.launch('gameover', {score: score})
                //  score = 0
                //  gameOver = false
                //  value = 1.5
                //  touching = false
                //  tween.restart()
                    this.resetGame()
                }
                   //restart game logic
        if( hit === true && gameOver === false){
            if( win === true){
                // if(gameReset === false)
                // { 
                    gameReset = true
                    start = false
                   // ballFall.stop()
                    this.resetGame()
                // }
            }
        }
         }

        // if(mouse.isDown === true){
            if(arrowSet === false){
                tween.play()
                // arrow.rotation = Phaser.Math.Angle.Wrap(-Math.PI/2)
                touching = true 
            }

            if(powerSet === false && arrowSet === true){
         
                //setting arrow angle
                tween.stop()
                let y = arrow.rotation
                arrow.setRotation(y)
                console.log('in update:'+arrow.rotation)
                swing = true
            }
            else {
                //console.log("Power"+power)
                if(hit === false && swing === true){
                        this.hitBall()
                        // golfBall.scale = scaleValue
                        // scaleValue -= 0.01
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
        }, 4000);
        ballHitSound.play()

        this.vx = -Math.cos(arrow.rotation) * 0.5
        this.vy = Math.sin(arrow.rotation) * 0.5

        // console.log("Vx: "+vx)
        // console.log("Vy:"+vy)

        // golfBall.setFrictionAir(0.01)

        golfBall.applyForce({x: this.vy, y: this.vx})
        golfBall.setFixedRotation()

        hit = true
    }

    //when ball is put in cup 
    goal()
    {
        ballFall.play()
        golfBall.setVelocity(0)
        golfBall.setVisible(false)

        score += 1
    }

    exitGame(){
    //    this.scene.destroy("game")
        this.scene.stop('game')
        window.parent.data.on_game_exit()
        console.log('After parent data')
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