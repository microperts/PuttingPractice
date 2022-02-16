import Phaser from "phaser"

let scene 
export default class SendToFriend extends Phaser.Scene{

    constructor()
    {
        super({key: 'sendHighScore'});
    }

    init()
    {

    }

    create()
    {
        var element = this.add.dom(400, 250, 'div','background-color:lime').createFromCache('highscoreForm')
        // element.setPerspective(800);
        scene = this.scene

        element.addListener('click');

        element.on('click', function (event) {

        if (event.target.name === 'submit')
            {
                var firstName = this.getChildByName('firstName');
                var lastName = this.getChildByName('lastName');
                let email = this.getChildByName('email')
                let golf = this.getChildByName('golf')

                //  Have they entered anything?
                if (firstName.value !== '' && lastName.value !== '' &&
                    email !== '' && golf !== '')
                {
                    //  Turn off the click events
                    // this.removeListener('click');
                    alert('High score sent')

                }
            }

            if(event.target.name === 'playAgain')
            {
                scene.start('game')
            }

        })
    }
    update()
    {

    }
}