function Flare(srcEl, trgEl) {
    this.srcEl = srcEl;
    this.trgEl = trgEl;
  
    this.draw = function() {
  
      $("header").html("pos (" +
        this.srcEl.position().left + "," +
        this.srcEl.position().top + ") (" +
        this.trgEl.position().left + "," +
        this.trgEl.position().top + ")"
      );
  
      var bezier_params = {
        start: {
          x: 185,
          y: 185,
          angle: 10
        },
        end: {
          x: 540,
          y: 110,
          angle: -10,
          length: 0.25
        }
      }
  
      $("#palma").animate({
        path: new $.path.bezier(bezier_params)
      });
  
    }
  
    this.update = function() {
  
      // at the end draw
      this.draw();
    }
  }
  
  window.addEventListener('resize', function(event) {
    // UPDATE THE DRAWINGS AND POSITIONINGS
    fitTheSwan();
  });
  
  // Position and resize the Svan images
  function fitTheSwan() {
    // resize the canvas area;
    var c = document.getElementById("myCanvas");
    const ORIGINAL_SIZE = 400;
    const PERCENTAGE_OF_SCREEN = 0.6;
    var adaptedSize = window.innerWidth * PERCENTAGE_OF_SCREEN; 
    $("#imgContainer > img").css({width: adaptedSize, height: adaptedSize});
    //alert(adaptedSize);
    
    // POSITION THE SVAN
    var x = (window.innerWidth / 2) - ($("#imgContainer>img").eq(0).width() / 2);
    $("#imgContainer").css({left: x});
  }
  
  // find elements
  var canvas = $("canvas");
  //console.log("canvas width:" + canvas.width);
  var c = document.getElementById("myCanvas");
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  console.log(c);
  
  ctx = c.getContext("2d");
  
  /************/
  var x = 100;
  var y = 100;
  var dx = 0.5;
  var dy = 1;
  var radius = 50
  
  function animate() {
  
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    //ctx.strokeStyle = '#20B2AA';
    //ctx.stroke(); 
    ctx.fillStyle = 'rgba(95, 158, 160, 0.8)';
    ctx.fill();
  
    if (x + radius > window.innerWidth || x - radius < 0) {
      dx = -dx;
    }
    x += dx;
    //y += dy;
  }
  
  animate();
  
  
  $("#controls").on('mouseover', 'div', function() {
    console.log('mouse-over');
    $("#imgContainer img").removeClass("opaque");
    var imageIdx = $(this).index() + 1;
    $("#imgContainer img").eq(imageIdx).addClass("opaque")
  
    // starte the flare
    var flare = new Flare($(this), $("#imgContainer"));
    flare.draw();
  
  });
  
  $("#controls").on('mouseout', 'div', function() {
  
    $("#imgContainer img").removeClass("opaque");
    $("#imgContainer img").eq(0).addClass("opaque");
    //clearCanvas();
    $("header").html("HEADER");
  });
  
  fitTheSwan();
  
  
  // CreateJS TweenJS
  var stage = new createjs.Stage("myCanvas"); 
  var circle = new createjs.Shape();
  circle.graphics.beginFill("red").drawCircle(100, 100, 50);
  circle.x = 100;
  circle.y = 100;
  stage.addChild(circle);
  
  stage.update(); 
  