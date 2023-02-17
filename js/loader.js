//----------------------- LOADER ------------------------
const loader = document.querySelector('#loader-container')
const load = () => { loader.style.visibility = 'visible'; }
const timeout = () => { loader.style.visibility = 'hidden'; }

load();
window.onload = function() { // can also use window.addEventListener('load', (event) => {
    timeout()
};