$(document).ready(function() {
    console.log('document ready');

    $("#controls").on('mouseover', 'div', function() {
        console.log('mouse-over');
      $("#imgContainer img").removeClass("opaque");
  
      var newImage = $(this).index() + 1;
  
      $("#imgContainer img").eq(newImage).addClass("opaque");
  
    });

    $("#controls").on('mouseout', 'div', function() {
        console.log('mouse-out');
        $("#imgContainer img").removeClass("opaque");
        $("#imgContainer img").eq(0).addClass("opaque");  
    });

  });