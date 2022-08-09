'use strict';


export default class Popup{

    constructor(){
        this.popup = document.querySelector('.popup')
        this.replayBtn = document.querySelector('.popup_replybtn')
        this.popUpMessage = document.querySelector('.popup_message')
        this.replayBtn.addEventListener('click',()=>{
            if(this.onClick){
                this.onClick()
            }
            this.hide();
        })

    }

        setClickListener(onClick){
            this.onClick = onClick
        }

        showReply(text){
            this.popup.style.display = 'block'
            this.popUpMessage.innerText = text;
        }

        hide(){
            this.popup.style.display = 'none'
        }

}