const menuBtn = document.querySelector('.navbar .menuIcon');
const closeBtn = document.querySelector('.navLinks .closeIcon')
const navLinks = document.querySelector('.navLinks')

menuBtn.addEventListener('click',() =>{
    navLinks.style.left = '0';

});
closeBtn.addEventListener('click',() => {
    navLinks.style.left = '-100%';
})

const submenuIcon = document.querySelector('.arrowIcon');
submenuIcon.addEventListener('click', () =>{
    navLinks.classList.toggle('show1');
})

/* order */
// const orderBtn = document.querySelector('.button');
// const returnMessage = document.querySelector('.return');

// returnMessage.style.display ='none';
