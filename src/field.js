'use strict';

import { ItemType } from "./game.js";

export default class Field{

    constructor(pinkFlowerCount, purpleFlowerCount, redFlowerCount){
    this.pinkFlowerCount = pinkFlowerCount
    this.purpleFlowerCount = purpleFlowerCount
    this.redFlowerCount = redFlowerCount    
    this.field = document.querySelector('.flowergame_field')
    this.fieldSize = this.field.getBoundingClientRect();
    // this.onClick = this.onClick.bind(this)
    this.field.addEventListener('click', (event)=> this.onClick(event))
    // this.field.addEventListener('click', this.onClick)
}

    setClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }

    onClick (event){
        this.onItemClick && this.onItemClick(event.target)
        console.log(this.onClick)
    }

    init(){
        this.field.innerHTML = ''; //reset
        this.addItem(ItemType.pinkflower,this.pinkFlowerCount,'/img/pinkflower.png')
        this.addItem(ItemType.purpleflower,this.purpleFlowerCount,'/img/purpleflower.png')
        this.addItem(ItemType.redflower,this.redFlowerCount,'/img/redflower.png')
    }

    addItem(className,Count,imgSrc){
    //need to know field size for position
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldSize.width - 80; //flowersize width 80px
    const y2 = this.fieldSize.height - 80; //flowersize height 80px

    for (let i = 0; i < Count; i++){
        //each item needs to be assigned on the position
        const item = document.createElement('img')
        item.setAttribute('class',className)
        item.setAttribute('src', imgSrc)
        item.style.position = 'absolute' //relative on css's field
        item.style.top = `${this.randomNumber(y1,y2)}px`
        item.style.left = `${this.randomNumber(x1,x2)}px`

        this.field.appendChild(item)
    }
    }

    randomNumber(min,max){
        return Math.floor(Math.random() * (max - min)) + min; 
    }
}
