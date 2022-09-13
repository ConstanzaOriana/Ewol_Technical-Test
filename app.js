const html = document.getElementById("html");
const modeCounter = document.getElementById("counter-mode");
const modeTime = document.getElementById("time-mode");
const containerDiv = document.getElementById("container");
const mainContent = document.getElementById("main-content");
const outputMinutes = document.getElementById("minutes");
const outputSeconds = document.getElementById("seconds");
const outputTens = document.getElementById("tens");
const simbols = document.querySelectorAll(".simbol");
const buttonIncrease = document.getElementById("btn-increase");
const buttonDecrease = document.getElementById("btn-decrease");
const buttonsTimer = document.getElementById("buttons-timer");
const buttonStopWatch = document.getElementById("btn-stopwatch");
const buttonTimer = document.getElementById("btn-timer");
const buttonReset = document.getElementById("btn-reset");
let minutes = 0;
let seconds = 0;
let tens = 0;
let Interval;

html.style.background = "linear-gradient(to bottom, rgb(217, 18, 217), rgb(214, 52, 214), purple)";

modeCounter.checked = true;
buttonTimer.disabled = true;

const toPositive = (timeUnit) => {
    if(timeUnit < 0){
        aux = timeUnit;
        aux -= aux * 2;
    }
    else{
        aux = timeUnit;
    }
    return aux;
};

const resetValues = () => {
    tens = 0;
    outputTens.innerHTML = "0" + 0;
    seconds = 0;
    outputSeconds.innerHTML = "0" + 0;
    minutes = 0;
    outputMinutes.innerHTML = "0" + 0;
};

modeCounter.addEventListener("click", () => {
    resetValues();
    clearInterval(Interval);
    buttonStopWatch.style.display = "none";
    buttonTimer.style.display = "none";
    outputMinutes.style.display = "none";
    outputSeconds.style.display = "none";
    simbols.forEach(element => {
        element.style.display = "none";
    });
});

modeTime.addEventListener("click", () => {
    resetValues();
    buttonStopWatch.style.display = "block";
    buttonTimer.style.display = "block";
    outputMinutes.style.display = "block";
    outputSeconds.style.display = "block";
    simbols.forEach(element => {
        element.style.display = "block";
    });
});
    
const mainEvaluator = (signal, mode) => {

    if(signal === "increase"){
        tens++;
    }
    else if(signal === "decrease"){
        tens--;
    }

    let prefix = "";
    let prefix2 = "";
    let tensValue = "";
    let secondsValue = "";
    let minutesValue = "";
    let increase = true;

    if(mode === "counter"){
        if(tens > 0){
            increase = true;
        }
    }
    if(mode === "chronometer"){
        if(tens > 0){
            increase = true;
        }
    }
    if(mode === "timer"){
        if(tens > 0){
            increase = false;
        }
        else if(tens === 0){
            increase = false;
        }
        else if(tens === 0 && seconds === 0 && minutes === 0){
            clearInterval(Interval);
            buttonStopWatch.disabled = false;
            buttonTimer.disabled = true;
        }
    }

    // Code to evaluate positive, negative or zero digits
        
    if(tens > 0){
        prefix = "0";
        prefix2 = "";
        tensValue = tens;
        secondsValue = seconds;
        minutesValue = minutes;
        buttonStopWatch.disabled = false;
        buttonTimer.disabled = false;
    }
    else if(tens < 0){
        prefix = "-0";
        prefix2 = "-";
        tensValue = toPositive(tens);
        increase = false;
        buttonStopWatch.disabled = true;
        buttonTimer.disabled = true;
    }
    else if(tens === 0){
        prefix = "0";
        tensValue = tens;
        buttonStopWatch.disabled = false;
        buttonTimer.disabled = true;
    }

    // Code to evaluate double digit
    
    if(tensValue <= 9){
        outputTens.innerHTML = prefix + tensValue;
        console.log("A");
    }
    if(tensValue > 9){
        outputTens.innerHTML = prefix2 + tensValue;
        console.log("B");
    }
    if(mode === "counter" || mode === "chronometer"){
        if(tensValue > 99){
            tens = 0;
            outputTens.innerHTML = "0" + 0;
            if(increase){
                seconds++;
                secondsValue = seconds;
            }
            else{
                seconds--;
                secondsValue = toPositive(seconds);
            }
            outputSeconds.innerHTML = prefix + secondsValue;
            console.log("C");
        }
    }
    // Timer
    else{
        if(tensValue === 0){
            if(seconds === 0 && minutes === 0){
                buttonTimer.textContent = "Temporizador ok";
                html.style.background = null;
                html.classList.add("blink");
                clearInterval(Interval);
                outputTens.innerHTML = "0" + 0;
                buttonStopWatch.disabled = false;
                buttonTimer.disabled = false;
                secondsValue = seconds;
            }
            else{
                tens = 100;
                outputTens.innerHTML = "0" + 0;
                if(increase){
                    seconds++;
                    secondsValue = seconds;
                }
                else{
                    seconds--;
                    secondsValue = toPositive(seconds);
                }
            }
            outputSeconds.innerHTML = prefix + secondsValue;
            console.log("C");
        }
    }
    if(secondsValue > 9){
        outputSeconds.innerHTML = prefix2 + secondsValue;
        console.log("D");
    }
    if(secondsValue > 59){
        seconds = 0;
        outputSeconds.innerHTML = "0" + 0;
        if(increase){
            minutes++;
            minutesValue = minutes;
        }
        else{
            minutes--;
            minutesValue = toPositive(minutes);
        }
        outputMinutes.innerHTML = prefix + minutesValue;
        console.log("E");
    }
    if(minutesValue > 9){
        outputMinutes.innerHTML = prefix2 + minutesValue;
        console.log("F");
    }
    if(minutesValue > 59){
        resetValues();
        console.log("G");
    }
};
    
buttonIncrease.addEventListener('click', () => {
    mainEvaluator("increase", "counter");
});
    
buttonDecrease.addEventListener('click', () => {
    mainEvaluator("decrease", "counter");
});
    
buttonStopWatch.addEventListener('click', () => {
    if(buttonStopWatch.textContent === "Iniciar cronometro"){
        buttonStopWatch.textContent = "Detener cronometro";
        round.style.display = "inline-block";
        clearInterval(Interval);
        Interval = setInterval(mainEvaluator, 10, "increase", "chronometer");
    }
    else{
        buttonStopWatch.textContent = "Iniciar cronometro";
        round.style.display = "none";
        clearInterval(Interval);
    }
});
    
let input = "";
let count = 0;
let auxMinutes = "";
let auxSeconds = "";
let auxTens = "";
    
let round = document.createElement("button");
round.textContent = "Marcar vuelta";    
buttonsTimer.append(round);
round.style.display = "none";

const convertTwoDigits = (number) => {
    if(number.toString().length === 1){
        return "0" + number;
    }
    else{
        return number;
    }
};

round.addEventListener('click', () => {
    let divRound = document.createElement("div");
    divRound.classList.add("div-round");
    document.body.append(divRound);
    
    let deleteRound = document.createElement("button");
    deleteRound.textContent = "Eliminar vuelta";
    divRound.append(deleteRound);

    deleteRound.addEventListener('click', () => {
        divRound.style.display = "none";
    });

    count++;
    
    if(count === 1){
        auxMinutes = minutes;
        auxSeconds = seconds;
        auxTens = tens;
    }
    
    let liRound = document.createElement("li");
    liRound.innerHTML = `Nro. ${count} // ${outputMinutes.textContent}:${outputSeconds.textContent}:${outputTens.textContent} // Diferencia: ${convertTwoDigits(toPositive(minutes-auxMinutes))}:${convertTwoDigits(toPositive(seconds-auxSeconds))}:${convertTwoDigits(toPositive(tens-auxTens))}`;
    liRound.classList.add("round-text");
    divRound.append(liRound);
    auxMinutes = minutes;
    auxSeconds = seconds;
    auxTens = tens;

    let inputRound = document.createElement("input");
    inputRound.type = "text";
    inputRound.placeholder = "Agregar nombre";
    inputRound.classList.add("input");
    divRound.append(inputRound);

    liRound.addEventListener('mouseenter', () => {
        inputRound.style.display = "block";
    });

});
    
buttonTimer.addEventListener('click', () => {
    if(buttonTimer.textContent === "Iniciar temporizador"){
        buttonTimer.textContent = "Detener temporizador";
        clearInterval(Interval);
        Interval = setInterval(mainEvaluator, 10, "decrease", "timer");
    }
    else if(buttonTimer.textContent === "Temporizador ok"){
        html.classList.remove("blink");
        html.style.background = "linear-gradient(to bottom, rgb(217, 18, 217), rgb(214, 52, 214), purple)";

    }
    else{
        buttonTimer.textContent = "Iniciar temporizador";
        clearInterval(Interval);
    } 
});
    
    
buttonReset.addEventListener('click', () => {
    buttonStopWatch.textContent = "Iniciar cronometro";
    buttonTimer.textContent = "Iniciar temporizador";
    clearInterval(Interval);
    resetValues();
    round.style.display = "none";
    buttonStopWatch.disabled = false;
    buttonTimer.disabled = true;
});

// function spanSwitch(e) {
//   let txt = e.innerText;
//   let element = document.getElementById('element');

//   element.innerHTML = `<input onblur='spanReset(this)' value='${txt}' />`;
//   document.getElementsByTagName('input')[0].focus();
// }

// function spanReset(e) {
//     let txt = e.value;
//     let element = document.getElementById('element');
  
//     element.innerHTML = `<span onclick='spanSwitch(this)'> ${txt} </span>`;
//   }