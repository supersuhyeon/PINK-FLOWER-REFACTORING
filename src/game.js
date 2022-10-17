'use strict'

import * as sound from "./sound.js";
import Field from "./field.js";

//Builder Pattern
export default class GameBuilder {
    gameDuration(duration){
        this.gameDuration = duration
        return this;
    }

    pinkFlowerCount(num){
        this.pinkFlowerCount = num
        return this
    }
    purpleFlowerCount(num){
        this.purpleFlowerCount = num
        return this
    }
    redFlowerCount(num){
        this.redFlowerCount = num
        return this
    }

    build(){
        return new Game(
            this.gameDuration,
            this.pinkFlowerCount,
            this.purpleFlowerCount,
            this.redFlowerCount
        )
    }
}

class Game{

    constructor(gameDuration, pinkFlowerCount, purpleFlowerCount, redFlowerCount){  
    this.gameDuration = gameDuration
    this.pinkFlowerCount = pinkFlowerCount 
    this.purpleFlowerCount = purpleFlowerCount
    this.redFlowerCount = redFlowerCount

    this.flowerPlayBtn = document.querySelector('.playbtn')
    this.flowerTimer = document.querySelector('.timer')
    this.flowerScore = document.querySelector('.score')
    this.pinkflowerCount = this.pinkFlowerCount //caution ** capital F/f 
    this.gameDurationSec = this.gameDuration

    this.isstarted = false; //whether game started or not 게임은 시작하지 않은단계에서 시작 초기값
    this.score = 0; //점수 담을 공간
    this.timer = ''; //timer 담을 공간

    const title = document.querySelector('.title')
    title.innerText = `PICK THE ${this.pinkFlowerCount} PINK FLOWERS 🌸`

    this.flowerPlayBtn.addEventListener('click',()=>{
        if (this.isstarted){
            this.gameStopped('cancel'); 
        }else{ 
            this.gameStarted(); 
            }
        })
        
    this.gameField = new Field(pinkFlowerCount, purpleFlowerCount, redFlowerCount);
    this.gameField.setClickListener(this.onItemClick)
    }

    setGameStopListener(onGameStop){ //reason
    this.onGameStop = onGameStop
    }

    gameStarted(){ 
    this.isstarted = true; //게임이 시작하고있는상태에서 클릭을 누르면 멈춰야함 그래서 isstarted = true = gamestopped()
    this.initGame();
    this.changeStopBtn();
    this.showTimerandScoreBtn();
    this.autoTimerStart();
    sound.playBackground()
    }

    gameStopped(result){
    this.isstarted = false; //게임이 멈춰진상태에서 클릭을 누르면 재생되어야함 그래서 isstarted = false = gamestarted()
    this.autoTimerStop();
    this.playBtnGone();
    sound.stopBackground()
    this.onGameStop && this.onGameStop(result)                                     
    }


    onItemClick = (Item)=>{           
        if(!this.isstarted){ //started가 false면 실행하지 말아라  
            return
        }

        if(Item.classList.contains('pinkflower')){
            sound.playPinkFlower()
            Item.remove()
            this.score++
            this.remainingScoreBoard();
            if(this.score === this.pinkflowerCount){
                this.gameStopped('win')
            }
        }else if(Item.classList.contains('purpleflower')){
                // this.finishgame(false);
                this.gameStopped('lose')
            }else{
                // this.finishgame(false)
                this.gameStopped('lose')
            }
        }

    remainingScoreBoard(){
        this.flowerScore.innerText = this.pinkflowerCount - this.score;
    }
    
    autoTimerStart(){
        let currentSec = this.gameDurationSec
        this.updatetimertext(currentSec)
       //const myInterval = setInterval(myFunction,2000); clearInterval(myInterval)
       this.timer = setInterval(()=>{
    
            if(currentSec<=0){
                clearInterval(this.timer)
                this.gameStopped(this.pinkflowerCount===this.score ? 'win' : 'lose'); //boolean
                return
            }
            this.updatetimertext(--currentSec)
       },1000) 
    
    }
    
    autoTimerStop(){
        clearInterval(this.timer)
    }
    
    updatetimertext(sec){
        const minutes = Math.floor(sec / 60) // 5s / 60 = 0
        const seconds = sec % 60 //5
        this.flowerTimer.innerText = `${minutes}:${seconds}`
    }
    
    
    showTimerandScoreBtn(){
        this.flowerTimer.style.visibility = 'visible';
        this.flowerScore.style.visibility = 'visible';
    }
    
    changeStopBtn(){
        const popupBtn = this.flowerPlayBtn.querySelector('.fa-solid')
        popupBtn.classList.remove('fa-play')
        popupBtn.classList.add('fa-stop')
        this.flowerPlayBtn.style.visibility = 'visible'
    }
    
    playBtnGone(){
        this.flowerPlayBtn.style.visibility = 'hidden'
    }
    
    //game 초기화
    initGame(){
        this.score=0 //reset
        this.flowerScore.innerText = this.pinkflowerCount //reset
        //creat pink and purple flowers and appendchild to field
        this.gameField.init()
    }
}