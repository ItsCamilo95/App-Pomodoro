const openModal = document.querySelector('#openModal');
const closeModal = document.querySelector('#closeModal');
const closeModalAlert = document.querySelector('#closeModalAlert');
const modal = document.querySelector('#modal');
const modalAlert= document.querySelector('#modalAlert');
let run = true;
let workOption = document.querySelector('#workOption');
let breakOption = document.querySelector('#breakOption');
let longOption = document.querySelector('#longOption');
let workInput = document.querySelector('#workInput');
let breakInput = document.querySelector('#breakInput');
let longInput = document.querySelector('#longInput');
let clock = document.querySelector('#clock');


openModal.addEventListener('click', ()=>{
    modal.classList.add('modal-show');
});

closeModal.addEventListener('click', ()=>{
    modal.classList.remove('modal-show');
    modalAlert.classList.remove('modal-show');
});

closeModalAlert.addEventListener('click', ()=>{
    modalAlert.classList.remove('modal-show');
});

workOption.addEventListener('click', () =>{
    if (!run) {
        workOption.classList.add('active')
        breakOption.classList.remove('active')
        longOption.classList.remove('active')
        clock.innerText = workInput.value+":00"
    }else{
        modalAlert.classList.add('modal-show');
    }
});

breakOption.addEventListener('click', () =>{
    if (!run) {
        
        breakOption.classList.add('active')
        workOption.classList.remove('active')
        longOption.classList.remove('active')
        clock.innerText = breakInput.value+":00"
    }
});

longOption.addEventListener('click', () =>{
    if (!run) {
        longOption.classList.add('active')
        breakOption.classList.remove('active')
        workOption.classList.remove('active')
        clock.innerText = longInput.value+":00"
    }
});