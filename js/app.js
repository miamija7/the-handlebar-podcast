/////// LIVE CHAR COUNT START ///////
var text_max = 120;
$('#count_message').html('0 / ' + text_max );

$('#Question').keyup(function() {
    var text_length = $('#Question').val().length;
    var text_remaining = text_max - text_length;

    $('#count_message').html(text_length + ' / ' + text_max);
});

$('#button-next').click(function (){
    $('.form-pt2').toggleClass('hidden');
    $('.form-pt1').toggleClass('hidden');
})

$('#button-back').click(function (){
    $('.form-pt2').toggleClass('hidden');
    $('.form-pt1').toggleClass('hidden');
})
/////// LIVE CHAR COUNT END ///////


/////// ASK FORM START ///////
window.addEventListener("load", function() {
    const form = document.getElementById('ask-a-question');
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const data = new FormData(form);
        const action = e.target.action;
        fetch(action, {
            method: 'POST',
            body: data,
        }).then(() => {
            form.reset();
            $('.form-pt2').toggleClass('hidden');
            $('.form-pt1').toggleClass('hidden');
            alert("Your question was submitted! ❤️");
        })
    });
});
/////// ASK FORM END ///////

