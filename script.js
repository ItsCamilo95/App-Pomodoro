const openModal = document.querySelector('#openModal');
const closeModal = document.querySelector('#closeModal');
const closeModalAlert = document.querySelector('#closeModalAlert');
const modal = document.querySelector('#modal');
const modalAlert= document.querySelector('#modalAlert');
const buttonStart = document.querySelector('#buttonStart');
const buttonStop = document.querySelector('#buttonStop');
const buttonReanudate = document.querySelector('#buttonReanudate');
const audio = document.querySelector('#audio');
let run = false;
let workOption = document.querySelector('#workOption');
let breakOption = document.querySelector('#breakOption');
let longOption = document.querySelector('#longOption');
let workInput = document.querySelector('#workInput');
let breakInput = document.querySelector('#breakInput');
let longInput = document.querySelector('#longInput');
let clock = document.querySelector('#clock');
let seconds = 60;
let ciclos = 0;


inputSaved = () =>{
    workInput.value = parseInt(localStorage.getItem('workInputSave'))|| 25;
    breakInput.value = parseInt(localStorage.getItem('breakInputSave'))|| 5;
    longInput.value = parseInt(localStorage.getItem('longInputSave'))|| 15;
}
inputSaved();
window.onload = () => {
    clock.innerText=workInput.value+":00";
}


buttonStart.addEventListener('click', ()=>{
    if (workOption.classList.contains('active')) {
        minutes = workInput.value-1;
    }else if (breakOption.classList.contains('active')) {
        minutes = breakInput.value-1;
    }else{
        minutes = longInput.value-1;
    }
    buttonStop.classList.remove('inactive')
    buttonStart.classList.add('inactive')
    timer(minutes);
})

buttonStop.addEventListener('click', ()=>{
    buttonStop.classList.add('inactive')
    buttonReanudate.classList.remove('inactive')
    clearInterval(interval);
})

buttonReanudate.addEventListener('click', ()=>{
    buttonReanudate.classList.add('inactive')
    buttonStop.classList.remove('inactive')
    timer();
})

openModal.addEventListener('click', ()=>{
    modal.classList.add('modal-show');
});

closeModal.addEventListener('click', ()=>{
    modal.classList.remove('modal-show');
    modalAlert.classList.remove('modal-show');
    if (workOption.classList.contains('active')) {
        clock.innerText = workInput.value+":00"
    }else if (breakOption.classList.contains('active')) {
        clock.innerText = breakInput.value+":00"
    }else{
        clock.innerText = longInput.value+":00"
    }
    saveLocalStorage();
});

saveLocalStorage = () =>{
    localStorage.setItem("workInputSave", String(workInput.value));
    localStorage.setItem("breakInputSave", String(breakInput.value));
    localStorage.setItem("longInputSave", String(longInput.value));
}

closeModalAlert.addEventListener('click', ()=>{
    modalAlert.classList.remove('modal-show');
});

workOption.addEventListener('click', workTime = () =>{
    if (!run) {
        workOption.classList.add('active')
        breakOption.classList.remove('active')
        longOption.classList.remove('active')
        clock.innerText = workInput.value+":00"
    }else{
        modalAlert.classList.add('modal-show');
    }
});

breakOption.addEventListener('click', breakTime = () =>{
    if (!run) {
        breakOption.classList.add('active')
        workOption.classList.remove('active')
        longOption.classList.remove('active')
        clock.innerText = breakInput.value+":00"
    }else{
        modalAlert.classList.add('modal-show');
    }
});

longOption.addEventListener('click', longTime = () =>{
    if (!run) {
        longOption.classList.add('active')
        breakOption.classList.remove('active')
        workOption.classList.remove('active')
        clock.innerText = longInput.value+":00"
    }else{
        modalAlert.classList.add('modal-show');
    }
});

function timer() {
    if (minutes > 0 || seconds > 0) {
        run = true;
        if (seconds > 0) {
            seconds--;
        }else{
            minutes--;
            seconds = 60;
        }
        console.log(minutes, seconds)
        formatNumbers(minutes, seconds)
        interval = setTimeout(timer, 1000);
    }else{
        run = false;
        seconds=60;
        ciclos++;
        audio.play();
        if (workOption.classList.contains('active')) {
            if (ciclos==8) {
                longTime();
            }else{
                breakTime();
            }
        }else if (breakOption.classList.contains('active')) {
            workTime();
        }else{
            workTime();
        }
        buttonReanudate.classList.add('inactive');
        buttonStop.classList.add('inactive');
        buttonStart.classList.remove('inactive');
    }
}

function formatNumbers(minutes, seconds){
    if(minutes < 10){
        minutes = "0"+minutes;
    }if (seconds < 10) {
        seconds = "0"+seconds;
    }
    let time = minutes+":"+seconds;
    clock.innerText = time;
}