'use strict';
import * as sound from "./sound.js";

export default class Field{

    constructor(pinkFlowerCount, purpleFlowerCount, redFlowerCount){
    this.pinkFlowerCount = pinkFlowerCount
    this.purpleFlowerCount = purpleFlowerCount
    this.redFlowerCount = redFlowerCount    
    this.field = document.querySelector('.flowergame_field')
    this.fieldSize = this.field.getBoundingClientRect();
    // this.onClick = this.onClick.bind(this)
    this.field.addEventListener('click', (event)=>this.onClick(event))
    }

    setClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }

    init(){
        this.field.innerHTML = ''; //reset
        this._addItem('pinkflower',10,'/img/pinkflower.png')
        this._addItem('purpleflower',10,'/img/purpleflower.png')
        this._addItem('redflower',10,'/img/redflower.png')
    }

    _addItem(className,Count,imgSrc){
                    //need to know field size for position
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldSize.width - 80; //flowersize width 80px
    const y2 = this.fieldSize.height - 80; //flowersize height 80px

    for (let i = 0; i < Count; i++){
        //each item need to be assigned on the position
        const item = document.createElement('img')
        item.setAttribute('class',className)
        item.setAttribute('src', imgSrc)
        item.style.position = 'absolute' //field must have relative on css
        item.style.top = `${this.randomNumber(y1,y2)}px`
        item.style.left = `${this.randomNumber(x1,x2)}px`

        this.field.appendChild(item)
    }
    }

    randomNumber(min,max){
        return Math.floor(Math.random() * (max - min)) + min; 
    }


    onClick(event){

        const target = event.target
    if(target.classList.contains('pinkflower')){
        target.remove();
        sound.playPinkFlower()
        if(this.onItemClick){
            this.onItemClick('pinkflower')
        }

    }else if(target.classList.contains('purpleflower')){
        if(this.onItemClick){
            this.onItemClick('purpleflower')
        }
    }else{
        if(this.onItemClick){
            this.onItemClick('redflower')
        }
    }
    }


}