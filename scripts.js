function Flare(srcEl, trgEl) {
    this.srcEl = srcEl;
    this.trgEl = trgEl;

    //this.srcEl.centreX = this.srcEl.position().left + (this.srcEl.width / 2);

    // flare settings
    /////////FLARE SETUP////////////////
    var canvas;
    var stage;
    var tweens;
    var activeCount;
    var circleCount = 20;
    //var colors = ["BlueViolet", "MediumSeaGreen", "Tomato", "DarkTurquoise", "DeepSkyBlue"];
    var colors = ["CornflowerBlue", "DodgerBlue", "DeepSkyBlue", "LightSkyBlue", "LightBlue"];

    this.getColor = function (i){
        return colors[i % colors.length];
    }

    this.draw = function () {
        // at the end draw
        this.update();
        // draw the flares underneath the source.
    }

    this.update = function () {        
        // set the center points of the srcEl and trgEl;
        this.trgCentreX = this.trgEl.position().left + (this.trgEl.width() / 2);
        this.trgCentreY = this.trgEl.position().top + (this.trgEl.height() / 2);
        this.srcCentreXRel = (this.srcEl.position().left - this.trgCentreX) + (this.srcEl.width() / 2);
        this.srcCentreYRel = (this.srcEl.position().top - this.trgCentreY) + (this.srcEl.height() / 2);

        this.initFlare();
    }

    this.initFlare = function () {
        canvas = document.getElementById("myCanvas");
        stage = new createjs.Stage(canvas);
        stage.enableDOMEvents(true);
        tweens = [];
        stage.enableMouseOver(10);

        createjs.Touch.enable(stage);
        
        for (var i = 0; i < circleCount; i++) {
            // draw the circle, and put it on stage:
            var circle = new createjs.Shape();
            var isZero = (parseInt(Math.random() * 10) % 2 == 0);
            //console.log(isZero);
            var h = isZero?20: 20;
            var w = isZero?10: 1;
            
            var squarSize = parseInt(Math.random() * 50);
            circle.graphics.setStrokeStyle(1);
            //circle.graphics.beginStroke("#113355");
            //circle.graphics.beginStroke(this.srcEl.css("background-color"));
            //circle.graphics.drawCircle(this.trgCentreX, this.trgCentreY, (i + 1) * 9);
            //console.log( this.srcEl.css("background-color"));
            //circle.graphics.beginFill(this.srcEl.css("background-color"));
            circle.graphics.beginFill(this.getColor(i));
            circle.graphics.drawRect(this.trgCentreX, this.trgCentreY, squarSize, squarSize);
            circle.alpha = 0.2; //- (i * 0.02);
            circle.x = Math.random() * 700;
            circle.y = Math.random() * 700;
            circle.compositeOperation = "lighter";
    
            var tween = createjs.Tween.get(circle)
            .to({x: this.srcCentreXRel, y: this.srcCentreYRel}, (0.5 + i * 0.04) * 3000, createjs.Ease.bounceOut)
            .wait(100)
            //.to({alpha: 0})
            .call(this.tweenComplete)
            .addEventListener("complete", this.completed);
           
            tweens.push({tween: tween, ref: circle});
            stage.addChild(circle);
        }
        activeCount = circleCount;
        theSrcElement = this.srcEl;
    
        createjs.Ticker.addEventListener("tick", this.tick);
    }

    this.completed = function(event){
    }
       
    this.tweenComplete = function () {
        activeCount--;
    }
    
    this.tick = function (event) {
        if (activeCount) {
            stage.update(event);
        }
    }
}

window.addEventListener('resize', function (event) {
    // UPDATE THE DRAWINGS AND POSITIONINGS
    fitAll();
});

function clearCanvas(){
    const canvas = document.getElementById("myCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function fitAll(){
    fitTheSwan();
    fitTheBubbles();
    fitCanvasAndDrawings();    
}

function fitCanvasAndDrawings(){
    var canvas = document.getElementById("myCanvas");
    canvas.width = $("body").innerWidth();
    canvas.height = document.documentElement.clientHeight 
}

function fitTheBubbles(){
    var c = document.getElementById("myCanvas");
}

// Position and resize the Svan images
function fitTheSwan() {
    // resize the canvas area;    
    const ORIGINAL_SIZE = 400;
    const PERCENTAGE_OF_SCREEN = 0.6;
    var adaptedSize = $("body").innerWidth() * PERCENTAGE_OF_SCREEN;
    $("#imgContainer, #imgContainer > img").css({
        width: adaptedSize,
        height: adaptedSize
    });
    //alert(adaptedSize);

    // POSITION THE SVAN
    var x = ($("body").innerWidth() / 2) - ($("#imgContainer>img").eq(0).width() / 2);
    $("#imgContainer").css({
        left: x
    });
}

///////////// INVOCATIONS CODE //////////////////
$(document).ready(function () {

    $("#controls").on('mouseover', 'div', function () {
        $("#imgContainer>img").removeClass("opaque");
        var imageIdx = $(this).index() + 1;
        $("#imgContainer>img").eq(imageIdx).addClass("opaque")

        //$("#imgContainer>img").removeClass("opaque");
        //var imageIdx = $(this).index();
        //$("#controls>.dot").eq(imageIdx).addClass("hover")

        // start the flare
        var svanImg = $("#imgContainer");
        var flare = new Flare($(this), svanImg );
        flare.draw();

    });

    $("#controls").on('mouseout', 'div', function () {
        $("#imgContainer > img").removeClass("opaque");
        $("#imgContainer > img").eq(0).addClass("opaque");

        //$("#controls>.dot").removeClass("hover")
        clearCanvas();       
    });

    fitAll();

});

