'use strict'; 


import * as sound from "./sound.js";
import Popup from "./popup.js";
import GameBuilder from "./game.js";

//gameFinishPopup = new Popup()
//game = new Game()
//Field = new Field()

const gameFinishPopup = new Popup();


const game = new GameBuilder() //gameDuration, pinkFlowerCount, purpleFlowerCount, redFlowerCount
.withGameDuration(3)
.withPinkFlowerCount(3)
.withPurpleFlowerCount(3)
.withRedFlowerCount(3)
.build()

console.log(game)

game.setGameStopListener((reason)=>{

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

// gameFinishPopup.setClickListener(()=>{
//     game.gameStarted(); 
// })

gameFinishPopup.setClickListener(()=>{game.gameStarted()})
