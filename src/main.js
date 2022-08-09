import Popup from "./popup.js";
import Field from "./field.js";
import * as sound from "./sound.js";

//field variables

const pinkflowerCount = 10

//flower + popup variables
const flowerPlayBtn = document.querySelector('.playbtn')
const flowerTimer = document.querySelector('.timer')
const flowerScore = document.querySelector('.score')


//others
const gameDurationSec = 5


//게임의 상태를 알고있어야할 변수
let isstarted = false; //whether game started or not 게임은 시작하지 않은단계에서 시작 초기값
let score = 0; //점수 담을 공간
let timer = ''; //timer 담을 공간


const gameFinishPopup = new Popup();
gameFinishPopup.setClickListener(()=>{
    gameStarted(); 
})

const gameField = new Field(10, 10, 10);
gameField.setClickListener(onItemClick)

function onItemClick(Item){                      

    if(!isstarted){ //started가 false면 실행하지 말아라
        return
    }

    if(Item === 'pinkflower'){
        score++
        remainingScoreBoard();
        if(score === pinkflowerCount){
            finishgame(true)
        }

    }else if(Item === 'purpleflower'){
        finishgame(false);
    }else{
        finishgame(false)
    }

   
}




flowerPlayBtn.addEventListener('click',()=>{
    console.log('working!!')
    

    //total 2 functions needed to be called

    if (isstarted){
        gameStopped(); //게임도중에 눌렀으면?
    }else{ 
        gameStarted(); //첫게임시작전 초기화면은?
    }

    // isstarted = !isstarted

})

//when game started, when gamestopped make each function
//1)게임시작전 초기화면
function gameStarted(){ 
    isstarted = true; //게임이 시작하고있는상태에서 클릭을 누르면 멈춰야함 그래서 isstarted = true = gamestopped()
    initGame();
    changeStopBtn();
    showTimerandScoreBtn();
    autoTimerStart();
    sound.playBackground()
    
}

//2)게임도중에 눌렀으면?
function gameStopped(){
    isstarted = false; //게임이 멈춰진상태에서 클릭을 누르면 재생되어야함 그래서 isstarted = false = gamestarted()
    autoTimerStop();
    playBtnGone();
    gameFinishPopup.showReply('you want to replay?');
    sound.stopBackground()
    sound.playAlertSound()                                                                  
}

function finishgame(result){
    isstarted = false;
    autoTimerStop();
    playBtnGone();
    sound.stopBackground()
    if(result){
        sound.playGameWin()
    }else{
        sound.playPurpleFlower()
    }
    gameFinishPopup.showReply(result? 'YOU WON 😍' : 'YOU LOST 💩')
}



function remainingScoreBoard(){
    flowerScore.innerText = pinkflowerCount - score;
}


function autoTimerStart(){

    let currentSec = gameDurationSec
    updatetimertext(currentSec)
   //const myInterval = setInterval(myFunction,2000); clearInterval(myInterval)
   timer = setInterval(()=>{

        if(currentSec<=0){
            clearInterval(timer)
            finishgame(pinkflowerCount===score);
            return
        }

        updatetimertext(--currentSec)

   },1000) 

}

function autoTimerStop(){
    clearInterval(timer)
}

function updatetimertext(sec){
    const minutes = Math.floor(sec / 60) // 5s / 60 = 0
    const seconds = sec % 60 //5
    flowerTimer.innerText = `${minutes}:${seconds}`
}


function showTimerandScoreBtn(){
    flowerTimer.style.visibility = 'visible';
    flowerScore.style.visibility = 'visible';
    

}

function changeStopBtn(){
    const popupBtn = flowerPlayBtn.querySelector('.fa-solid')
    popupBtn.classList.remove('fa-play')
    popupBtn.classList.add('fa-stop')
    flowerPlayBtn.style.visibility = 'visible'
    
}

function playBtnGone(){
    flowerPlayBtn.style.visibility = 'hidden'
}

//game 초기화
function initGame(){
    score=0 //reset
    flowerScore.innerText = pinkflowerCount //reset
    //creat pink and purple flowers and appendchild to field
    gameField.init()
}