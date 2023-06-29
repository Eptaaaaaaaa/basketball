// Function.prototype.defer = function(ms) {
//     setTimeout(this, ms, a, b)
// }

// function printNumbers(from, to) {
//     let result = from;
//     if (from < to) {
//         setInterval(() => {
//             if (result <= to) {
//                 console.log(result)
//                 result++;
//             }
//         }, 1000)
//     } else {
//         setInterval(() => {
//             if (result <= to) {
//                 console.log(result)
//                 result--;
//             }
//         }, 1000)
//     }
// }





// class Animal {
//     static type = 'ANIMAL';

//     constructor(options) {
//         this.name = options.name;
//         this.age = options.age;
//         this.hasTail = options.hasTail;
//     }

//     sayHy() {
//         console.log('hello, i`m animal!')
//     }
// }

// let animal = new Animal({
//     name: 'LKRN',
//     age: 2,
//     hasTail: false,
// });

// class Cat extends Animal {
//     static type = 'CAT';

//     constructor(options) {
//         super(options)
//         this.color = options.color;
//     }

//     sayHy() {
//         super.sayHy();
//         console.log('And I`m cat!')
//     }

//     get ageInfo() {
//         return this.age * 7;
//     }

//     set ageInfo(newAge) {
//         this.age = newAge;
//     }

// };

// const cat = new Cat({
//     name: 'cat',
//     age: 8,
//     hasTail: true,
//     color: 'black',
// })


// class Component {
//     constructor(selector) {
//         this.$el = document.querySelector(selector);
//     }

//     hide() {
//         this.$el.style.display = 'none';
//     }

//     show() {
//         this.$el.style.display = 'block';
//     }
// }

// class Box extends Component {
//     constructor(options) {
//         super(options.selector);
//         this.$el.style.width = this.$el.style.height = options.size + 'px';
//         this.$el.style.background = options.background;
//     }

// }

// const box1 = new Box({
//     selector: '.box1',
//     size: 100,
//     background: 'blue',
// })

function loadScript(src) {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.src = src;

        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Скрипт ${src} не может быть загружен`))

        document.head.append(script)
      })



    // let script = document.createElement('script');
    // script.src = src;
  
    // script.onload = () => callback(null, script);
    // script.onerror = () => callback(new Error(`Ошибка загрузки скрипта ${src}`));
  
    // document.head.append(script);
  }

// let promise = loadScript('/js/promise.js')

// promise.then(
//     script => alert(`Скрипт ${script.src} загружен`),
//     error => alert(`Ошибка: ${error.message}`)
// )


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  delay(3000).then(() => alert('выполнилось через 3 секунды'));