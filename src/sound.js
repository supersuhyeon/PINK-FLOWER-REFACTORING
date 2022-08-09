'use strict';


const pinkflowerSound = new Audio('/sound/pinkflower_pull.mp3')
const purpleflowerSound = new Audio('/sound/purpleflower_pull.mp3')
const bgSound = new Audio('/sound/bg2.mp3')
const gameWin = new Audio('/sound/win.mp3')
const alertSound = new Audio('/sound/alert.wav')


export function playPinkFlower(){
    playSound(pinkflowerSound)
}

export function playPurpleFlower(){
    playSound(purpleflowerSound)
}

export function playBackground(){
    playSound(bgSound)
}

export function stopBackground(){
    stopSound(bgSound)
}


export function playGameWin(){
    playSound(gameWin)
}

export function playAlertSound(){
    playSound(alertSound)
}

function stopSound(sound){
    sound.pause()
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}