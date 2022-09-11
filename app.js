let minutes = 0;
let seconds = 0;
let tens = 0;
let outputMinutes = document.getElementById("minutes");
let outputSeconds = document.getElementById("seconds");
let outputTens = document.getElementById("tens");
let buttonIncrease = document.getElementById("btn-increase");
let buttonDecrease = document.getElementById("btn-decrease");
let buttonStopWatch = document.getElementById("btn-stopwatch");
let buttonTimer = document.getElementById("btn-timer");
let buttonReset = document.getElementById("btn-reset");
let Interval;

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

/*
const digitsEvaluator = (tens, seconds, minutes) => {

    let prefix = "";
    let prefix2 = "";
    let tensValue = "";
    let secondsValue = "";
    let minutesValue = "";
    let increase = true;

    // Code to evaluate positive, negative or zero digits

    if(tens > 0){

        prefix = "0";
        prefix2 = "";
        tensValue = tens;
        secondsValue = seconds;
        minutesValue = minutes;

    }
    else if(tens < 0){

        prefix = "-0";
        prefix2 = "-";
        tensValue = toPositive(tens);
        increase = false;

    }
    else if(tens === 0){
        tens = 0;
        outputTens.innerHTML = "0" + 0;
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
    return [tens, seconds, minutes]
};*/

const mainEvaluator = (signal="increase") => {

    if(signal === "increase"){
        tens++;
    }
    else if(signal === "decrease"){
        tens--;
        buttonStopWatch.disabled = true;
        buttonTimer.disabled = true;
    }

    /*
    console.log(tens);
    
    asd = [];

    asd = digitsEvaluator(tens, seconds, minutes);

    asd[0] = tens;
    console.log(`${asd[0]} ASKFSHADLKJGHSDLKGFHASDLKFHSA`);
    asd[1] = seconds;
    asd[2] = minutes;
    */


    let prefix = "";
    let prefix2 = "";
    let tensValue = "";
    let secondsValue = "";
    let minutesValue = "";
    let increase = true;

    // Code to evaluate positive, negative or zero digits

    if(tens > 0){

        prefix = "0";
        prefix2 = "";
        tensValue = tens;
        secondsValue = seconds;
        minutesValue = minutes;

    }
    else if(tens < 0){

        prefix = "-0";
        prefix2 = "-";
        tensValue = toPositive(tens);
        increase = false;

    }
    else if(tens === 0){
        tens = 0;
        outputTens.innerHTML = "0" + 0;
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

buttonIncrease.addEventListener('click', mainEvaluator);

buttonDecrease.addEventListener('click', () => {
    mainEvaluator("decrease");
});

let round = "";
let input = "";
let auxMinutes = minutes;
let auxSeconds = seconds;
let auxTens = tens;

buttonStopWatch.addEventListener('click', () => {
    if(buttonStopWatch.textContent === "Iniciar cronometro"){
        buttonStopWatch.textContent = "Detener cronometro";
        clearInterval(Interval);
        Interval = setInterval(mainEvaluator, 10);
        if(round === ""){
            round = document.createElement("button");
            round.textContent = "Marcar vuelta";    
            document.body.appendChild(round);
            
        }
        console.log(round);
        round.addEventListener('click', () => {
            let li = document.createElement("li");
            li.innerHTML = `${minutes}:${seconds}:${tens} - Diferencia con ronda previa: ${toPositive(minutes-auxMinutes)}:${toPositive(seconds-auxSeconds)}:${toPositive(tens-auxTens)}`;
            li.classList.add("li");
            document.body.appendChild(li);
            auxMinutes = minutes;
            auxSeconds = seconds;
            auxTens = tens;
            if(input === ""){
            li.addEventListener('mouseenter', () => {
                let input = document.createElement("input");
                input.type = "text";
                input.innerHTML = "Ingrese nombre de ronda";
                input.classList.add("input");
                document.body.appendChild(input);   
            })
            let deleteRound = document.createElement("button");
            deleteRound.textContent = "Eliminar vuelta";
            document.body.appendChild(deleteRound);
            deleteRound.addEventListener('click', () => {
                li.style.display = "none";
            })
        }
    });
    }
    else{
        buttonStopWatch.textContent = "Iniciar cronometro";
        clearInterval(Interval);
    }
});

buttonTimer.addEventListener('click', () => {
    if(buttonTimer.textContent === "Iniciar temporizador"){
        buttonTimer.textContent = "Detener temporizador";

        if(tens > 0){
            clearInterval(Interval);
            Interval = setInterval(mainEvaluator, 10, "decrease");
        }
        // No funciona revisar
        else if(tens === 00 && seconds === 00 && minutes === 00){
            clearInterval(Interval);
            resetValues();
        }
    }
    else{
        buttonTimer.textContent = "Iniciar temporizador";
    } 
});


buttonReset.addEventListener('click', () => {
    buttonStopWatch.textContent = "Iniciar cronometro";
    clearInterval(Interval);
    resetValues();
    buttonStopWatch.disabled = false;
    buttonTimer.disabled = false;
});

