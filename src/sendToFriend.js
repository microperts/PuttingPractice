import Phaser from "phaser"

let scene 
export default class SendToFriend extends Phaser.Scene{

    constructor()
    {
        super({key: 'sendToFriend'});
    }

    init()
    {

    }

    create()
    {
        var element = this.add.dom(400, 250, 'div','background-color:lime').createFromCache('nameform')
        // element.setPerspective(800);
        scene = this.scene

        element.addListener('click');

        element.on('click', function (event) {

        if (event.target.name === 'submit')
            {
                var inputUsername = this.getChildByName('userName');
                var email = this.getChildByName('email');
                let friendName = this.getChildByName('friendName')
                let friendEmail = this.getChildByName('friendEmail')

                //  Have they entered anything?
                if (inputUsername.value !== '' && email.value !== '' &&
                    friendName !== '' && friendEmail !== '')
                {
                    //  Turn off the click events
                    // this.removeListener('click');
                    alert('Game sent')

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