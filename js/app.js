const appleId = '1629208237';
const loadPodcastByAppleId = async (id) => {
    try {
        const res = await fetch(`https://itunes.apple.com/lookup?id=${id}`);
        const data = await res.json();
        console.log(data);
    } catch (e) {
        console.log("ERROR:", e);
    }
}

////////  TRUNK START  ////////
VANTA.TRUNK({
    el: "#your-element-selector",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 70.00,
    minWidth: 70.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x1327bb,
    spacing: 0.50,
    chaos: 5.00
})
////////  TRUNK END  ////////


////////  MORPH START  ////////
const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    "The",
    "Handlebar",
    "Podcast"
];

const morphTime = 1;
const cooldownTime = 1;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}
animate();
////////  MORPH START  ////////

////////  SNAP START  ////////
const gra = function(min, max) {
    return Math.random() * (max - min) + min;
}

const init = function(){
    let items = document.querySelectorAll('section');
    for (let i = 0; i < items.length; i++){
        items[i].style.background = randomColor();
    }
}

const randomColor = ()=>{
    const colors = ["#8C8D89", "#515DA9", "#131F70"];
    return colors[Math.floor(Math.random() * 3)]
}

init();
////////  SNAP END  ////////

////////  POST START  ////////
window.addEventListener("load", function() {
    const form = document.getElementById('my-form');
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const data = new FormData(form);
        const action = e.target.action;
        fetch(action, {
            method: 'POST',
            body: data,
        })
            .then(() => {
                form.reset();
                alert("Your question was submitted! ❤️");
            })
    });
});
////////  POST END  ////////

////////  NAVBAR START  ////////
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {

            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

        });
    });

});
////////  NAVBAR END  ////////


