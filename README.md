## Mini Flower Garden Game - Refactoring version

![ezgif com-gif-maker (4)](https://user-images.githubusercontent.com/94214512/186960305-53721f91-b85b-4f99-8ec2-2446c965df9d.gif) <br>
This is a mini-game with a 5 second timer. To win, you must click on all 10 pink flowers before time is up. <br>
[Play flower garden](https://warm-granita-4598c8.netlify.app/)<br>
[Before refactoring github](https://github.com/supersuhyeon/PINK-FLOWER-PROJECT)

### Goals of the project

1. Practice making Javascript modules with Class
2. How to bind a function and class: direct binding and using arrow function
3. Understanding the concept of lexical scope and closure

### Languages

HTML, CSS, and Javascript

### Features

1. JS module <br>
   Before refactoring, all functions were configured and executed in one JavaScript file. However, I thought that maintenance and reusability weren't optimal, so I tried to make it modular. <br> Modules are used with special keywords (import/export) or functions, so you need to set properties like **script type="module"** in order for the browser to recognize that the script is a module.

- Before refactoring<br>
  ![logic](https://user-images.githubusercontent.com/94214512/193428105-2affa2eb-5a91-444d-bcd6-7e9d85f48db2.png)

- After refactoring<br>
  ![logic-factoring](https://user-images.githubusercontent.com/94214512/193428084-0fd8811a-aa6c-4c4f-8c08-d7eff00a0844.png)<br>
  The game's Javascript could be divided into five modules. In particular, the main, field and game modules are organically connected to each other. Therefore I made member variables with the argument received through the callback function which made it possible to use the data in the class.

**_main.js_**

```js
const game = new Game(3,3,3,3) //gameDuration, pinkFlowerCount, purpleFlowerCount, redFlowerCount
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
```

**_game.js_**

```js
export default class Game {
  constructor(
    gameDuration,
    pinkFlowerCount,
    purpleFlowerCount,
    redFlowerCount
  ) {
    this.gameDuration = gameDuration;
    this.pinkFlowerCount = pinkFlowerCount;
    this.purpleFlowerCount = purpleFlowerCount;
    this.redFlowerCount = redFlowerCount;

    this.gameField = new Field(
      pinkFlowerCount,
      purpleFlowerCount,
      redFlowerCount
    );
    this.gameField.setClickListener(this.onItemClick);
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop; //member variable
  }

  gameStopped(result) {
    this.isstarted = false;
    this.autoTimerStop();
    this.playBtnGone();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(result);
  }
}
```

2. Binding <br>
   When a function in a class is passed to another callback function, the information of the class that contains the function is lost.
   In order to remember the function, one can use `this` binding that can bind a class and `this` function. You can bind it directly or use an arrow function.

- Direct binding : `bind()` <br>

```js
export default class Field {
  constructor(pinkFlowerCount, purpleFlowerCount, redFlowerCount) {
    this.field.addEventListener("click", this.onClick); //this.onClick is undefined
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  onClick(event) {
    this.onItemClick && this.onItemClick(event.target); //this.onItemClick is also undefined
  }
}
```

As you can see above, if you do not bind an object to the calling function, JavaScript tries to get a value from the global object, so the resulting value might be different than expected.

```js
export default class Field {
  constructor(pinkFlowerCount, purpleFlowerCount, redFlowerCount) {
    this.onClick = this.onClick.bind(this); //directly binded this Field class with the onclick regular function
    this.field.addEventListener("click", this.onClick);
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  onClick(event) {
    this.onItemClick && this.onItemClick(event.target);
  }
}
```

- use arrow function (closure)

```js
export default class Field{

    constructor(pinkFlowerCount, purpleFlowerCount, redFlowerCount){
    this.field.addEventListener('click', (event)=> this.onClick(event)) //arrow function
}

    setClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }

    onClick (event){
        this.onItemClick && this.onItemClick(event.target)
    }
```

```js
export default class Field{

    constructor(pinkFlowerCount, purpleFlowerCount, redFlowerCount){
    this.field.addEventListener('click', this.onClick)
}

    setClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }

    onClick = (event) => { //arrow function
        this.onItemClick && this.onItemClick(event.target)
    }
```

When a function is called, a lexical environment is created, and information necessary for calling the function is included. However, if you pass a function's reference address somewhere without binding a function in a class, `this.something` is an undefined value. It is the same as trying to get a specific key from an undefined object.

As a result, if you pass a regular function to a callback, the information of `this` is lost and the class member variable can no longer be accessed.
So, by using the arrow function (arrow function captures and stores the information of `this`), the function is delivered including the information of `this`. This concept is called closure.

```js
function makeFunc() {
  var name = "Mozilla";
  function displayName() {
    alert(name);
  }
  return displayName;
}

var myFunc = makeFunc();
//Returns displayName in myFunc variable
//Maintain a lexical environment of scope
myFunc();
//Execute the returned displayName function (access the name variable)
//A closure is the combination of a function and the lexical environment within which that function was declared.
//Therefore, in the case of internal functions declared inside, variables in the lexical scope to which they belong can be referenced. This means that the inner function can access the variables of the outer function.
//however closures have to remember the environment in which they were created, which can cause memory loss.
```

3. Difference of `this` Between Arrow Functions and Regular Functions

- **Regular function** <br>
  In JavaScript, every time a function is executed, an object called `this` is added inside the function. Below is the situation where `this` is bound in a regular function.<br>

  1. When executing a function, it points to the global (window) object.<br>
  2. When a method is executed, it points to the object that owns the method.<br>

  ```js
  var obj1 = {
    name: "kim",
    print: function () {
      console.log(this.name); // this가 참조되는 위치
    },
  };
  var obj2 = { name: "su", print: obj1.print };
  var name = "hyeon";
  var print = obj1.print;

  print(); // hyeon, number1 case above
  var connectObj1 = print.bind(obj1); // if I want to get kim not hyeon then bind()
  connectObj1(); //kim
  obj1.print(); // kim, number2 case above
  obj2.print(); // su, number2 case above
  ```

  ```js
  var obj = {
    print: function () {
      console.log(this == obj);
    },
  };
  var print = obj.print;

  obj.print(); // true
  print(); // false, 전역객체를 가리킴
  ```

  3. When the constructor is executed, it points to the newly created object.<br>
     In a regular function, When a function is called, the object to bind to this dynamically depends on how the function was called.<br>

  ```js
  function printName() {
    var lastName = "kim";
    this.firstName = "suhyeon";
    console.log(`${this.lastName} ${this.firstName}`);
  }
  var lastName = "kim";
  printName(); // kim suhyeon
  var result = new printName(); // undefined suhyeon
  //if declared as new, this will point to the created object itself, not the global object. Therefore, firstName accessed as this gets a value, but lastName is undefined because it is no longer a global object.
  ```

- **Arrow function** <br>
  For arrow functions, the object to bind to `this` is statically determined when the function is declared.
  Arrow function `this` always points to parent scope `this` (Lexical scoping).

```js
var obj = {
  names: ["kim"],
  text: "hello",
  print: function () {
    console.log(this.text); //hello
    this.names.forEach(function (name) {
      //The forEach method inside the print method binds this to the global object.
      console.log(name + this.text); // kimundefined
    });
  },
};
obj.print();
```

```js
var obj = {
  names: ["kim"],
  text: "hello",
  print: function () {
    console.log(this.text);
    this.names.forEach((name) => {
      console.log(name + this.text); // kim hello, this points parent object's obj, not global object
    });
  },
};
obj.print();
```

A regular function points to the object it depends on as `this`, and an arrow function points to an instance it depends on.

### Reference Links

[dream-coding-browser101-class](https://academy.dream-coding.com/)<br>
[MDN Lexical scoping/closure](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures#%EC%96%B4%ED%9C%98%EC%A0%81_%EB%B2%94%EC%9C%84_%EC%A7%80%EC%A0%95lexical_scoping)<br>
[Lexical Environment in Korean](https://developer-alle.tistory.com/407)<br>
[how to make class in a function way in Korean](https://hjban-dev.github.io/2019-12-17-class_function)<br>
[MDN function.prototype.bind()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

### Self-reflection

The mini flower garden game was a small sized project so not that many things were divided. But it was definitely good to learn about how and why we need to make small components in a big project. I had two major issues while refactoring, binding and callback functions. I expected that when calling a function after getting a method from an object, the original object would be used as the function's `this`. However that was incorrect and so I needed to study how `this` and `bind()` work. Initially, I was confused, so I made a test.js and checked every single object and function through the console.
This was a good chance to review regular and arrow functions. I knew about closure before but I couldn't fathom how this concept works in practice. At that time, it was more like an abstract theory until I practiced it. The review and implementation of these concepts gave me a deeper understanding of how to use arrow functions to use callback functions. I'm glad that I didn't give up on understanding this whole concept when it was confusing. This learning process also showed me how interconnected these concepts are to each other.
My next step is to refactor variable names using builder patterns and ensure the type in JavaScript using `object.freeze`. I wonder what kind of errors I will discover next.
