let formName = document.forms.formName;
let inputName = formName.elements.name;
let button = formName.elements.button;
let start = document.getElementById('start')
let game = document.getElementById('game')
let end = document.querySelector('.end')
let playerName = document.querySelector('.name')
let skill = document.querySelector('.skill')
let hp = document.querySelector('.hp')
let points = document.querySelector('.points')
let timer = document.querySelector('.timer')
let hoop = document.querySelector('.hoop')
const LS = localStorage;
let formData = {};  
let dropInterval;  
let fallInterval;
let onHoopMove;
let pressing = false;

// вывод имени из localStorage в форму
if (LS.getItem('formData')) {
    formData = JSON.parse(LS.getItem('formData'));
    for (let key in formData) {
        formName[key].value = formData[key]
    }
}

// при введении чего то в форму
const onInput = (e) => {
    
     
    // function printNumbers(from, to) {
    //     function go() {
    //         console.log(from);
    //         if (from < to) {
    //             from++;
    //             setTimeout(go, 1000)
    //         }
    //     }

    //     setTimeout(go, 1000)
        // let timer;
        // if (from < to) {
        //     timer = setTimeout(tick = () => {
        //         if (from <= to) {
        //             console.log(from)
        //             from++;
        //         }
        //         timer = setTimeout(tick, 1000)
        //     }, 1000)
        // } else {
        //     timer = setTimeout(tick = () => {
        //         if (from >= to) {
        //             console.log(from)
        //             from--;
        //         }
        //         timer = setTimeout(tick, 1000)
        //     }, 1000)
        // }
    // }
    
    // printNumbers(1, 4)
    // активный элемент
    let target = e.target;

    // записываем данные в localStorage
    formData[target.name] = target.value;
    LS.setItem('formData', JSON.stringify(formData))

    // отключение кнопки
    if (!inputName.value) {
        button.setAttribute('disabled', 'disabled')
    } else {
        button.removeAttribute('disabled')
        button.addEventListener('click', onGameStart);
    }     

    // if (hp.innerHTML === 0) {
    //     onGameStart = null;
    // }
}

// вешаем обработчик на форму
formName.addEventListener('input', onInput)



// hoop.focus()

// начало игры
const onGameStart = (e) => {

    end.style.top = -(end.offsetHeight) * 2 + 'px';
    
    // отмена действия браузера
    e.preventDefault()

    // имя игрока
    playerName.textContent = JSON.parse(LS.getItem('formData')).name;

    // жизни
    hp.textContent = '3';

    // таймер
    timer.textContent = '00:00';

    // запуск таймера
    stopwatch(timer, isTrue);

    // выход стартового окна за экран и удаление
    start.classList.add('close');
    setTimeout(() => start.remove(), 4000)

    // появление панели information
    setTimeout(() => {
        game.classList.add('show');
        
    }, 500)
    
    // размещение кольца посередине
    hoop.style.left =  (document.documentElement.clientWidth / 2) - (hoop.offsetWidth / 2) + 'px'

    // функция движения кольца
    onHoopMove = (e) => {
        // если нажата левая или правая стрелка
        if (e.code == 'ArrowLeft' || e.code == 'ArrowRight') {
            hoop.focus()
            switch (e.code) {
                // движение влево
                case 'ArrowLeft': hoop.style.left = parseInt(hoop.style.left) - 50 + 'px'; 
                break;
                // движение вправо
                case 'ArrowRight': hoop.style.left = parseInt(hoop.style.left) + 50 + 'px';
                break;
            }
        } else return;

        // чтобы кольцо не выходило за экран
        if (hoop.getBoundingClientRect().left < 0) hoop.style.left = 0;
        if (hoop.getBoundingClientRect().right >= document.documentElement.clientWidth) hoop.style.left = document.documentElement.clientWidth - hoop.offsetWidth + 'px';

        // alert(hoop.getBoundingClientRect.left)
        // if (!game.classList.contains('show')) {
        //     return; 
        // }
    }
    // обработчик движения кольца
    document.addEventListener('keydown', onHoopMove);
    document.addEventListener('keydown', onPause);
    if (!pressing) {
        document.addEventListener('keydown', useSkill);
    }
    // падение мяча каждые 1.5 секунды
    dropInterval = setInterval(dropBall, 1500);

    // проверка оставшихся жизней
    function isTrue() {
        if (hp.innerHTML <= 0) {
            return true;
        }
    }

    // if (+(hp.innerHTML) === 2) {
    //     clearInterval(dropInterval)
    // }
    end.style.left = (document.documentElement.clientWidth / 2) - (end.offsetWidth / 2) + 'px';

}


// функция падения мяча
const dropBall = () => {
    let ball;

    // рандомное целое число от min (не включая), до max (включая)
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + 1) + min;
    }

    // появление мяча в документе
    function spawnBall() {
        // let speed = getRandomNumber(0, 2);
        let speed = Math.random() * 2 + Math.random();
        let arr = ['apple', 'orange', 'banana'];

        // создание мяча с рандомным классом
        ball = document.createElement('div');
        ball.classList.add(arr[getRandomNumber(-1, arr.length - 1)], 'ball');

        // помещение мяча в документ на рандомные координаты x в пределах экрана
        game.append(ball);
        ball.style.left = getRandomPosition(ball)[0] + 'px';
        ball.style.top = getRandomPosition(ball)[1] + 'px';
        // console.log(getRandomPosition(ball))

        // падение мяча
        fallInterval = setInterval(() => {
            ball.style.top = parseInt(ball.style.top) + 10 + 'px';
            catchingBall(ball);
            // если мяч вышел за экран - он удаляется
            if (ball.getBoundingClientRect().top >= document.documentElement.clientHeight - ball.offsetHeight / 2) {
                ball.remove();
                // если за экран вышло столько мячей, что жизней не осталось, игра заканчивается
                if (hp.innerHTML > 1) {
                    hp.innerHTML -= 1;
                } else {
                    hp.innerHTML = 0;
                    
            }    
                
                // alert(hp.innerHTML)
                
            }
            // alert(ball.getBoundingClientRect().top)
        }, (25 * speed) + 15)

        
        // if (ball.getBoundingClientRect().top >= document.documentElement.clientHeight) {
        //     ball.remove();
        // }
        if (hp.innerHTML === '0') {
            onGameEnd()
        }
        // console.log(hp.innerHTML === '0')
    }

    // функция рандомной координаты x мяча в пределах экрана
    function getRandomPosition(ball) {
        let y = 0 - ball.offsetHeight;
        let x = getRandomNumber(hoop.offsetWidth / 2, document.documentElement.clientWidth - ball.offsetWidth - hoop.offsetWidth / 2, ball);
        let position = [x, y];
        return position;
    }

    // создание мяча
    spawnBall();

    // если жизней не осталось - падение мячей останавливается
    if (hp.innerHTML === '0') {
        clearInterval(dropInterval);
        for (let ball of document.querySelectorAll('.ball')) {
            ball.remove()
        }
    }
    // alert(hp.innerHTML === '0')
    
    // alert(dropInterval)
}

function onGameEnd() {
    let userName = JSON.parse(LS.getItem('formData')).name;
    let playerName = document.querySelector('.playerName');
    let endTime = document.querySelector('.endTime');
    let collectedBalls = document.querySelector('.collectedFruits');
    let congratulation = document.querySelector('.congratulation');
    let restartButton = document.querySelector('.restart')

    // let timeTitle = 
    game.classList.remove('show');
    
    // появление окна окончания
    let endTimeout = setTimeout(() => {
        end.style.top = (document.documentElement.clientHeight / 2) - (end.offsetHeight / 2) + 'px';
    }, 100)

    // победа / поражение
    let timeArr = timer.innerHTML.split(':');
    if (+(timeArr[1]) > 10) {
        playerName.textContent = `Поздравляем, ${userName}`;
        congratulation.textContent = 'Вы выиграли!';        
    } else {
        playerName.textContent = `Жаль, ${userName}`;
        congratulation.textContent = 'Вы проиграли!';
    }

    // время 
    endTime.textContent = `Ваше время: ${timer.innerHTML}`;

    // поймано мячей
    collectedBalls.innerHTML = `Вы собрали ${points.innerHTML} мячей`
    
    document.removeEventListener('keydown', onHoopMove);
    
    restartButton.addEventListener('click', onGameStart)
    
    
    }

const catchingBall = (ball) => {
    let ballTop = ball.getBoundingClientRect().top;
    let ballLeft = ball.getBoundingClientRect().left;
    let hoopLeft = hoop.getBoundingClientRect().left;
    let windowHeight = document.documentElement.clientHeight;
    if (ballTop > windowHeight - hoop.offsetHeight - ball.offsetHeight / 2 && ballTop < windowHeight - ball.offsetHeight / 2 && ballLeft > hoopLeft - ball.offsetWidth / 2 && ballLeft < hoopLeft + hoop.offsetWidth - ball.offsetWidth / 2) {
        ball.remove();
        points.innerHTML = ++points.innerHTML;
    }
}

const useSkill = (e) => {
    let spacePressing = new Set();
    let sec = 3;
    if (e.code === 'Space') {
        skill.innerHTML = sec;       
        // console.log(true)
        spacePressing.add('code', e.code)
        if (!spacePressing.has('press')) {
            let timerSkill = setTimeout(function tick(){
                sec--;
                skill.innerHTML = sec;
                if (spacePressing.has('code')) {
                timerSkill = setTimeout(tick, 1000);
                }
                spacePressing.add('press', true)
            }, 1000)
        }
            // for (let ball of document.querySelectorAll('.ball')) {
            //     // skill.innerHTML = sec;
            //     ball.classList.add('skill-ball')
            //     ball.style.left = hoop.getBoundingClientRect().left + hoop.offsetWidth / 2 - ball.offsetWidth / 2 + 'px';
            //     ball.style.top = hoop.getBoundingClientRect().top + hoop.offsetHeight / 2 - ball.offsetHeight / 2 + 'px';
            //     console.log(pressing)
                
                // ball.style.transition = 'all 0.1s linear'
            // }

            document.addEventListener('keyup', () => {
                spacePressing.delete('code');
                spacePressing.delete();
                // console.log(pressing)
            })
        // }
            
    }
    

}

const onPause = (e) => {
    if (e.code === 'Escape') { 
        // debugger;
        // for (let ball of document.querySelectorAll('.ball')) {
        //    clearInterval(fallInterval)
        // }
        // removeEventListener('keydown', onHoopMove)
        // // clearInterval(fallInterval);
        // clearInterval(dropInterval)
    }
    
}
// таймер
const stopwatch = (container, isTrue) => {
    let sec = 0;
    let min = 0;
    let t;
    // изменение времени
    function tick() {
        sec++;
        if (sec >= 60) {
            sec = 0;
            min++;
        }
    }

    // появление времени в контейнере
    function add() {
        tick()
        container.textContent = (min > 9 ? min : '0' + min) +
                          ':' + (sec > 9 ? sec : '0' + sec);
        timer();
        
        // остановка таймера, когда жизней нет
        if (isTrue()) {
        clearInterval(t);
    }
    }

    // каждую секунду выполняется add, а значит каждую секунду выполняется tick и timer
    function timer() {
        t = setTimeout(add, 1000);
    }



    timer();

}