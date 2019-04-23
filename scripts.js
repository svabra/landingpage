$(document).ready(function () {
    console.log('document ready');

    $("#controls").on('mouseover', 'div', function () {
        console.log('mouse-over');
        $("#imgContainer img").removeClass("opaque");

        var newImage = $(this).index() + 1;
        $("#imgContainer img").eq(newImage).addClass("opaque");
        drawLine($(this));

    });

    $("#controls").on('mouseout', 'div', function () {
        console.log('POSITION: ' + $(this).position());
        
        $("#imgContainer img").removeClass("opaque");
        $("#imgContainer img").eq(0).addClass("opaque");
        clearCanvas();
    });


});

function clearCanvas() {
    console.log("clearing canvas");
    var canvas = document.getElementById('DemoCanvas');
    if (canvas.getContext) {
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function drawLine(element) {

    var canvas = document.getElementById('DemoCanvas');
    if (canvas.getContext) {
        console.log("drawing connector line");
        var context = canvas.getContext('2d');
        // Reset the current path
        context.beginPath();
        // Staring point (10,45)
        context.moveTo(element.position().left, element.position().top);
        console.log('printing at: ' + element.position().left + ' ' + element.position().top);
        // End point (180,47)
        let imgContainer = $('#imgContainer');
        context.lineTo(imgContainer.position().left, imgContainer.position().top);
        console.log('printing to: ' + imgContainer.position().left + ' ' + imgContainer.position().top)
        context.lineWidth = 2;
        context.strokeStyle = '#000000';
        // Make the line visible
        context.stroke();
    }

}