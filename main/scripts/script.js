/************
 * NAV *
 ************/
const menuBtn = document.querySelector('.navbar .menuIcon');
const closeBtn = document.querySelector('.navLinks .closeIcon')
const navLinks = document.querySelector('.navLinks')

menuBtn.addEventListener('click',() =>{
    navLinks.style.left = '0';

});
closeBtn.addEventListener('click',() => {
    navLinks.style.left = '-100%';
})

/************
 * MODAL *
 ************/
let popup = document.getElementById('popup');
function openPopup(){
    popup.classList.add('open-popup');
}
function closePopup(){
    popup.classList.remove('open-popup');
}
/************
 * CAROUSEL *
 ************/
if(document.querySelector('.carouselItems')){
const slideWrapper = document.querySelector('.carouselItems');
const slides = Array.from(slideWrapper.children);
const nextBtn = document.querySelector('.carouselRightBtn');
const prevBtn = document.querySelector('.carouselLeftBtn');
const dotsNav = document.querySelector('.carouselNav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);

const moveToSlide = (currentSlide, targetSlide) => {
  slideWrapper.style.transform =  'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('currentSlide');
  targetSlide.classList.add('currentSlide');
}

const updateDots = (targetDot) => {
  const currentDot = dotsNav.querySelector('.currentSlide');
  currentDot.classList.remove('currentSlide');
  targetDot.classList.add('currentSlide');
}

const hideShowArrows = (targetIndex) => {
  prevBtn.classList.remove('isHidden');
  nextBtn.classList.remove('isHidden');
  
  if(targetIndex === 0 ) {
    prevBtn.classList.add('isHidden');
  }
  else if (targetIndex === slides.length - 1) {
    nextBtn.classList.add('isHidden');
  }
}

var carouselIdle;
var carouselIndex = 1;
function rotateSlide() {
  const currentSlide = slideWrapper.querySelector('.currentSlide');
  if(currentSlide === slides[slides.length-1]){
    moveToSlide(currentSlide, slides[0]);
    updateDots(dots[0]);
    hideShowArrows(0);
  }
  else {
    moveToSlide(currentSlide, slides[carouselIndex]);
    updateDots(dots[carouselIndex]);
    hideShowArrows(carouselIndex);
   }
  carouselIndex = (carouselIndex + 1) % slides.length;
}

function startCarousel() {
  carouselIdle = setInterval(rotateSlide, 5000); 
}
startCarousel();

const pauseCarousel = _ => {
  if(carouselIdle){
    clearInterval(carouselIdle);
    setTimeout(startCarousel, 10000);
    carouselIdle = 0;
  }
  carouselIndex = slides.findIndex(slide => slide.classList.contains('currentSlide')) + 1;
}

const changeSlide = (changedSlide, changedDot, currentSlide) => {
  moveToSlide(currentSlide, changedSlide);
  updateDots(changedDot);
  hideShowArrows(slides.findIndex(slide => slide === changedSlide));
  pauseCarousel();
}

nextBtn.addEventListener('click', _ => {
  const currentSlide = slideWrapper.querySelector('.currentSlide');
  const nextSlide = currentSlide.nextElementSibling;
  const nextDot = dotsNav.querySelector('.currentSlide').nextElementSibling;
  changeSlide(nextSlide, nextDot, currentSlide);
})

prevBtn.addEventListener('click', _ => {
  const currentSlide = slideWrapper.querySelector('.currentSlide');
  const prevSlide = currentSlide.previousElementSibling;
  const prevDot = dotsNav.querySelector('.currentSlide').previousElementSibling;
  changeSlide(prevSlide, prevDot, currentSlide);
})

dotsNav.addEventListener('click', e => {
  const targetDot = e.target.closest('button');
  
  if(!targetDot) return;
  
  const currentSlide = slideWrapper.querySelector('.currentSlide');
  
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];
  
  moveToSlide(currentSlide, targetSlide);
  updateDots(targetDot);
  hideShowArrows(targetIndex);
  pauseCarousel();
})
}

/************
 *ORDER  APP*
 ************/
const plates = document.querySelectorAll(".addItemButton");
const orderUp = document.querySelector("#orderUp");
var order = [];
var totalPrice = [];

plates.forEach(plate => plate.addEventListener('click', addPlateToOrder));
function addPlateToOrder(e){
  if(!e.target.classList.contains("added")) {
    order.push(e.target.id);
    totalPrice.push(e.target.previousElementSibling.innerHTML);
    e.target.value = "- Remove";
    e.target.classList.add("added");
  }
  else { removePlateFromOrder(e); }
}
function removePlateFromOrder(e) {
  order.splice(order.indexOf(e.target.id), 1);
  totalPrice.splice(totalPrice.indexOf(e.target.previousElementSibling.innerHTML), 1);
  e.target.value = "+ Add";
  e.target.classList.remove("added");
}

orderUp.addEventListener('click', completeOrder);

function completeOrder(e) {
  e.preventDefault();
  let costTotal = 0;
  totalPrice.forEach(cost => {
    cost *= 100; //multiply to prevent floating point errors
    costTotal += cost;
  })
  costTotal /= 100;
  costTotal = costTotal.toFixed(2);
  costTotal = '$' + costTotal;
}