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