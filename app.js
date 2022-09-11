let minutes = 00;
let seconds = 00;
let tens = 00;
let outputSeconds = document.getElementById("seconds");
let outputTens = document.getElementById("tens");
let buttonStart = document.getElementById("btn-start");
let buttonStop = document.getElementById("btn-stop");
let buttonReset = document.getElementById("btn-reset");
let Interval;

const botones = document.querySelectorAll('.boton');

const mainEvaluator = (signal="increase") => {
if(signal === "increase"){
    tens++;
}
else if(signal === "decrease"){
    tens--;
}

if(tens <= 9){
    outputTens.innerHTML = "0" + tens;
}
if(tens > 9){
    outputTens.innerHTML = tens;
}
if(tens > 99){
    seconds++;
    outputSeconds.innerHTML = "0" + seconds;
    tens = 0;
    outputTens.innerHTML = "0" + 0;
}
if(seconds > 9){
    outputSeconds.innerHTML = seconds;
}


if(tens < 0){
    aux = tens;
    aux -= aux * 2;
    if(tens < -9){
        outputTens.innerHTML = "-" + aux; 
    }
    /*if(tens < -99){
        seconds--;
        outputSeconds.innerHTML = "-" + seconds;
        outputTens.innerHTML = tens;
    }*/
    else{
        outputTens.innerHTML = "-0" + aux;
    }
}
};


botones.forEach(boton => {
    boton.addEventListener('click', function(e) {

        const estilos = e.currentTarget.classList; 
    
        if(estilos.contains('increase')) {
            mainEvaluator();
        }
        else if(estilos.contains('decrease')) {
            mainEvaluator("decrease");
        }

    })
})

buttonStart.addEventListener('click', () => {
    clearInterval(Interval);
    Interval = setInterval(mainEvaluator, 10);
});

buttonStop.addEventListener('click', () => {
    clearInterval(Interval);
});

buttonReset.addEventListener('click', () => {
    clearInterval(Interval);
    tens = "00";
    seconds = "00";
    outputSeconds.innerHTML = seconds;
    outputTens.innerHTML = tens;
});

