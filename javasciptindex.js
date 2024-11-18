let slideIndex = -1;
let slideIndex1=-1;
let slides = document.getElementsByClassName("mySlides");
let slides1 = document.getElementsByClassName("mySlides1");
function plusSlides() {
    slideIndex1=slideIndex1+1;
    slideIndex=slideIndex+1;
    if (slideIndex > slides.length-1) {slideIndex = 0;}
    showSlides(slideIndex);
    if (slideIndex1 > slides1.length-1) {slideIndex1 = 0;}
    showSlides1(slideIndex1);
}

plusSlides();
setInterval(plusSlides, 5000);
function showSlides(n) {
    slideIndex=n;
    let i;
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 0;}
    for (i = 0; i < slides.length; i++) { slides[i].style.display = "none";}
    for (i = 0; i < dots.length; i++) { dots[i].className = dots[i].className.replace(" active", "");}
    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
}
function showSlides1(n) {
    slideIndex1=n;
    let i;
    let dots = document.getElementsByClassName("dots1");
    if (n > slides1.length) {slideIndex1 = 0;}
    for (i = 0; i < slides1.length; i++) { slides1[i].style.display = "none";}
    for (i = 0; i < dots.length; i++) { dots[i].className = dots[i].className.replace(" active", "");}
    slides1[slideIndex1].style.display = "block";
    dots[slideIndex1].className += " active";
}

function toggleInfo(event, infoId) {
    event.stopPropagation();
    const infoBoxes = document.querySelectorAll('.info-box');
    infoBoxes.forEach(box => {
        if (box.id !== infoId) {  box.classList.remove('active');  }  });
    const infoBox = document.getElementById(infoId);
    if (infoBox) { infoBox.classList.toggle('active');}
}
document.addEventListener('click', function() {
    const infoBoxes = document.querySelectorAll('.info-box');
    infoBoxes.forEach(box => box.classList.remove('active'));
});







