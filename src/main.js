'use strict'; 


import * as sound from "./sound.js";
import Popup from "./popup.js";
import Game from "./game.js";

//gameFinishPopup = new Popup()
//game = new Game()
//Field = new Field()

const gameFinishPopup = new Popup();


const game = new Game(3,3,3,3) //gameDuration, pinkFlowerCount, purpleFlowerCount, redFlowerCount
game.setGameStopListener((reason)=>{
console.log(reason)

let message;
switch (reason) {
    case 'cancel' :
    message = 'you want to replay? 👀'
    sound.playAlertSound()
    break;

    case 'win':
    message = 'you won! 👍'
    sound.playGameWin()
    
    break;

    case 'lose':
    message = 'you lost! 💩'
    sound.playPurpleFlower()
    break;

    default :
    throw new Error('not vaild reason')

}

gameFinishPopup.showReply(message)

})

gameFinishPopup.setClickListener(()=>{
    game.gameStarted(); 
})
