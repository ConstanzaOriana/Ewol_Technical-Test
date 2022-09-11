let minutes = 00;
let seconds = 00;
let tens = 00;
let outputMinutes = document.getElementById("minutes");
let outputSeconds = document.getElementById("seconds");
let outputTens = document.getElementById("tens");
let buttonIncrease = document.getElementById("btn-increase");
let buttonDecrease = document.getElementById("btn-decrease");
let buttonStart = document.getElementById("btn-stopwatch");
let buttonStop = document.getElementById("btn-stop");
let buttonReset = document.getElementById("btn-reset");
let Interval;

const toPositive = (timeUnit) => {
    aux = timeUnit;
    aux -= aux * 2;
    return aux;
};

const mainEvaluator = (signal="increase") => {

    if(signal === "increase"){
        tens++;
        buttonStart.disabled = false;
    }
    else if(signal === "decrease"){
        tens--;
        buttonStart.disabled = true;
    }

    let prefix = "";
    let prefix2 = "";
    let tensValue = "";
    let secondsValue = "";
    let minutesValue = "";
    let increase = true;

    ///////////////////////////////////////////////////

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
        //secondsValue = toPositive(seconds);
        //minutesValue = toPositive(minutes);

    }
    else if(tens === 0){
        outputTens.innerHTML = "0" + tens;
    }

    ///////////////////////////////////////////////////

    if(tensValue <= 9){
        outputTens.innerHTML = prefix + tensValue;
        console.log("A");
    }
    if(tensValue > 9){
        outputTens.innerHTML = prefix2 + tensValue;
        console.log("B");
    }
    if(tensValue > 99){
        tens = 00;
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
        seconds = 00;
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
        tens = 00;
        outputTens.innerHTML = "0" + 0;
        seconds = 00;
        outputSeconds.innerHTML = "0" + 0;
        minutes = 00;
        outputMinutes.innerHTML = "0" + 0;
        console.log("G");
    }
        
    /*if(tens < 0){

        prefix = "-0";
        prefix2 = "-";

        tensPositive = toPositive(tens);
        secondsPositive = toPositive(seconds);
        minutesPositive = toPositive(minutes);

        if(tensPositive <= 9){
            outputTens.innerHTML = prefix + tensPositive;
        }
        if(tensPositive > 9){
            outputTens.innerHTML = prefix2 + tensPositive;
        }
        if(tensPositive > 99){
            tens = 00;
            outputTens.innerHTML = tens;
            seconds--;
            outputSeconds.innerHTML = prefix + secondsPositive;
        }


    }

    if(tens === 0){
        outputTens.innerHTML = "0" + tens;
    }*/

};

buttonIncrease.addEventListener('click', () => {
    mainEvaluator();
});

buttonDecrease.addEventListener('click', () => {
    mainEvaluator("decrease");
});

clickCount = 0;

buttonStart.addEventListener('click', () => {
    i = 0
    clearInterval(Interval);
    Interval = setInterval(mainEvaluator, 10);
    buttonStart.innerHTML = "Detener cronometro";
if (buttonStart.innerHTML === "Detener cronometro") {
    buttonStart.addEventListener('click', () => {
        i++
        clearInterval(Interval);
    })
;} 
});

// buttonStop.addEventListener('click', () => {
//     clearInterval(Interval);
// });

buttonReset.addEventListener('click', () => {
    clearInterval(Interval);
    tens = "00";
    seconds = "00";
    minutes = "00";
    outputMinutes.innerHTML = minutes;
    outputSeconds.innerHTML = seconds;
    outputTens.innerHTML = tens;
});

