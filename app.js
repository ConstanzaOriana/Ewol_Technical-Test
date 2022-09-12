let modeCounter = document.getElementById("counter-mode-button");
let modeTime = document.getElementById("time-mode-button");
let minutes = 0;
let seconds = 0;
let tens = 0;
let containerDiv = document.getElementById("container");
let outputMinutes = document.getElementById("minutes");
let outputSeconds = document.getElementById("seconds");
let outputTens = document.getElementById("tens");
let buttonIncrease = document.getElementById("btn-increase");
let buttonDecrease = document.getElementById("btn-decrease");
let buttonStopWatch = document.getElementById("btn-stopwatch");
let buttonTimer = document.getElementById("btn-timer");
buttonTimer.disabled = true;
let buttonReset = document.getElementById("btn-reset");
let Interval;

//COUNTER MODE

modeCounter.addEventListener('click', () => {
    let timeCounter = document.getElementById('counter-mode');
    timeCounter.style.display = "flex";
    timeCounter.style.justifyContent = "center";
    timeCounter.style.color = "aliceblue";
    timeCounter.style.fontSize = "300%";
    timeCounter.style.fontFamily = "sans-serif";

    let contador = 0;

    const valor = document.querySelector('#valor');
    const botones = document.querySelectorAll('.boton')

    botones.forEach(boton => {
        boton.addEventListener('click', function(e) {
            const estilos = e.currentTarget.classList;

            if(estilos.contains('disminuir')){
                contador--;
            }
            else if(estilos.contains('aumentar')){
                contador++;
            } else{
                contador = 0;
            }
            valor.textContent = contador;
        })
    })
});

//TIME MODE

modeTime.addEventListener('click', () => {
    let timeMode = document.getElementById('time-mode');
    timeMode.style.display = "flex";
    timeMode.style.justifyContent = "center";
    timeMode.style.color = "aliceblue";
    timeMode.style.fontSize = "300%";
    timeMode.style.fontFamily = "sans-serif";
   

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
                        clearInterval(Interval);
                        outputTens.innerHTML = "0" + 0;
                        buttonStopWatch.disabled = false;
                        buttonTimer.disabled = true;
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
    containerDiv.append(round);
    round.style.display = "none";
    
    round.addEventListener('click', () => {
        let div = document.createElement("div");
        div.classList.add("div-round");
        document.body.append(div);
    
        let deleteRound = document.createElement("button");
        deleteRound.textContent = "Eliminar vuelta";
        deleteRound.classList.add("mx-5");
        div.append(deleteRound);
        deleteRound.addEventListener('click', () => {
            div.style.display = "none";
        });
    
        count++;
    
        if(count === 1){
            auxMinutes = minutes;
            auxSeconds = seconds;
            auxTens = tens;
        }
    
        let li = document.createElement("li");
        li.innerHTML = `Nro. ${count} // ${outputMinutes.textContent}:${outputSeconds.textContent}:${outputTens.textContent} // Diferencia: ${toPositive(minutes-auxMinutes)}:${toPositive(seconds-auxSeconds)}:${toPositive(tens-auxTens)}`;
    
        li.classList.add("li");
        li.classList.add("mx-5");
        div.append(li);
        auxMinutes = minutes;
        auxSeconds = seconds;
        auxTens = tens;
    
        li.addEventListener('mouseenter', () => {
            console.log(input);
            if(input === ""){
                input = document.createElement("input");
                input.type = "text";
                input.classList.add("input");
                input.classList.add("mx-5");
                div.append(input);
                console.log(input);
            }
        });
    
    });
    
    buttonTimer.addEventListener('click', () => {
        buttonStopWatch.disabled = true;
        if(buttonTimer.textContent === "Iniciar temporizador"){
            buttonTimer.textContent = "Detener temporizador";
            clearInterval(Interval);
            Interval = setInterval(mainEvaluator, 10, "decrease", "timer");
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
})

