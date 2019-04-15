console.log('footer.js running...')

//// ----------  CONSTANTS  ---------- ////
const facebook = document.getElementById('facebook');
const twitter = document.getElementById('twitter');
const linkedin = document.getElementById('linkedin');
const github = document.getElementById('github');
const instagram = document.getElementById('instagram');
const contactForm = document.getElementById('contactForm');


//// ----------  EVENT LISTENERS  ---------- ////
facebook.addEventListener('click', (ev) => fade(ev.target.parentElement));
twitter.addEventListener('click', (ev) => fade(ev.target.parentElement));
linkedin.addEventListener('click', (ev) => fade(ev.target.parentElement));
github.addEventListener('click', (ev) => fade(ev.target.parentElement));
instagram.addEventListener('click', (ev) => fade(ev.target.parentElement));
contactForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  fade(ev.target.parentElement)
});






// Fade function
function fade(element) {
  let op = 1;  // initial opacity
  let timer = setInterval(function () {
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    op -= op * 0.4;
  }, 50);
}
