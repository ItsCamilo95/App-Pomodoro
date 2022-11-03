window.onload = () => {

    let clock = document.querySelector("#clock");
    let cyclesInput = document.querySelector("#cyclesInput");
    let startButton = document.querySelector("#buttonStart");
    let reanudateButton = document.querySelector("#buttonReanudate");
    let stopButton = document.querySelector("#buttonStop");
    let workTimeInput = document.querySelector("#workTime");
    let breakTimeInput = document.querySelector("#breakTime");
    let restTimeInput = document.querySelector("#restTime");

    //clock
    let clockMinutes;
    let clockSeconds;

    // timer
    let currentTime; //minutos seteados
    let seconds = 0 ;
    let audio = document.querySelector("#audio");

    // Pomodoro
    let workTime;
    let breakTime;
    let resTime;
    let timesCompleted;
    let cyclesCompleted = 0;

    breakTimeInput.onclick = () =>{
        temp = timesCompleted;
        populateVariables();
        timesCompleted = temp;
    }

    workTimeInput.onclick = () =>{
        temp = timesCompleted;
        populateVariables();
        timesCompleted = temp;
    }
    restTimeInput.onclick = () =>{
        temp = timesCompleted;
        populateVariables();
        timesCompleted = temp;
    }

    function populateVariables(){
        console.log("populated variables");
        workTime = workTimeInput.value;
        breakTime = breakTimeInput.value;
        resTime = restTimeInput.value;
        cyclesGoal = cyclesInput.value;
        timesCompleted=0;
    }


    function timer() {
        if (currentTime > 0 || seconds > 0) {
            if (seconds == 0) {
                seconds = 59;
                currentTime--;
            }else{
                seconds--;
            }
            updateClock();
            console.log(currentTime, seconds);
            interval = setTimeout(timer, 10);
        }else{
            pomodoroController();
            audio.play();
            stopButton.classList.add('inactive');
            reanudateButton.classList.remove('inactive');
        }
    }
    
    function pomodoroController(){
        if (isRestTime()) {
            cyclesCompleted++; 
            currentTime = resTime;
            timesCompleted++;
            return;
        }
        if (timesCompleted % 2 == 0) {
            currentTime = workTime;
            timesCompleted++;
            console.log("Time to work! TC: "+timesCompleted);
        }else{
            currentTime = breakTime;
            timesCompleted++;
            
            console.log("Time to break! TC: "+timesCompleted)
            if (clock.innerText == "0"+0+":"+"0"+0) {
                cyclesCompleted++;
                cyclesInput.value=cyclesCompleted;
            }
        }

        if (timesCompleted==8) {
            clock.innerText=formatNumbers(resTime)+":00";
        }else if (timesCompleted % 2 == 0) {
            clock.innerText=formatNumbers(breakTime)+":00";
        }else{
            clock.innerText=formatNumbers(workTime)+":00";
            
        }
    }

    function updateClock(){
        clockMinutes = formatNumbers(currentTime);
        clockSeconds = formatNumbers(seconds);
        clock.innerHTML = clockMinutes + ":" + clockSeconds;
    }

    function formatNumbers(time){
        let formatetedDigits;
        if (time < 10) {
            formatetedDigits = "0" + time;
        }else{
            formatetedDigits = time;
        }
        return formatetedDigits
    }
    

    function isRestTime(){
        return timesCompleted == 7;
    }

    function startPomodoro(){
        console.log("started pomodoro");
        pomodoroController();
    }

    startButton.onclick = () => {
        if (breakTimeInput.value>0 && restTimeInput.value>0 && workTimeInput.value>0) {
            populateVariables();
            startPomodoro();
            timer();
            startButton.classList.add('inactive');
            stopButton.classList.remove('inactive');
        }else{
            alert("cualquier contador debe ser superior a 0")
        }
    }

    stopButton.onclick = () =>{
        clearInterval(interval);
        stopButton.classList.add('inactive');
        reanudateButton.classList.remove('inactive');
    }

    reanudateButton.onclick = () =>{
        if (breakTimeInput.value>0 && restTimeInput.value>0 && workTimeInput.value>0) {
        stopButton.classList.remove('inactive');
        reanudateButton.classList.add('inactive');
        populateVariables();
        timer();
        }else{
            alert("cualquier contador debe ser superior a 0")
        }
    }
}
