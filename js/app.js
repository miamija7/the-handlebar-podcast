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


