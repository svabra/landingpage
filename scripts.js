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
    var squareSize = 30;
    //var colors = ["BlueViolet", "MediumSeaGreen", "Tomato", "DarkTurquoise", "DeepSkyBlue"];
    var colors = ["SteelBlue", "Gainsboro", "DeepSkyBlue", "LightSkyBlue", "LightBlue"];

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
        
        // if the trail leads west, you need to add some extra pixels to show the bound effect better.
        // For east you need to subtract the maximum square size.

        let xCorrSize = (this.srcEl.width() / 2)
        let xShift = (this.srcEl.position().left - this.trgCentreX);
        let xBoxCorrection = (xShift > 0) ? (xCorrSize * -1) + squareSize : (xCorrSize * 1) - squareSize;
        this.srcCentreXRel =  xShift + (this.srcEl.width() / 2) + xBoxCorrection;

        let yCorrSize = (this.srcEl.height() / 2)
        let yShift = (this.srcEl.position().top - this.trgCentreY);
        let yBoxCorrection = (yShift > 0) ? yCorrSize * -1 : yCorrSize * 1;
        this.srcCentreYRel = yShift + (this.srcEl.height() / 2) + yBoxCorrection;

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
            var ranSquareSize = parseInt(Math.random() * squareSize);
            circle.graphics.setStrokeStyle(1);
            //circle.graphics.beginStroke("#113355");
            //circle.graphics.beginStroke(this.srcEl.css("background-color"));
            //circle.graphics.drawCircle(this.trgCentreX, this.trgCentreY, (i + 1) * 9);
            circle.graphics.beginFill(this.getColor(i));
            circle.graphics.drawCircle(this.trgCentreX, this.trgCentreY, ranSquareSize);
            //circle.graphics.drawRect(this.trgCentreX, this.trgCentreY, ranSquareSize, ranSquareSize);
            circle.alpha = 0.2; //- (i * 0.02);
            circle.x = this.getScatterCord(150);
            circle.y = this.getScatterCord(150);
            circle.compositeOperation = "lighter";
            //console.log(this.srcCentreXRel + " " + this.srcCentreYRel);
    
            var tween = createjs.Tween.get(circle)
            .to({x: this.srcCentreXRel, y: this.srcCentreYRel}, (0.5 + i * 0.04) * 5000, createjs.Ease.bounceOut)
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

    this.getScatterCord = function (scatterRadius){

        let ranInti = parseInt(Math.random() * 10);
        let newScattCord = (ranInti % 2 == 0) ? scatterRadius * -1 : scatterRadius * 1;
        return newScattCord;
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

function clearCanvas(){
    const canvas = document.getElementById("myCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function fitAll(){  
    fitTheTopicTag();
    fitCanvasAndDrawings();
    fitTheSwan();          
}

function fitCanvasAndDrawings(){
    var canvas = document.getElementById("myCanvas");
    canvas.width = $("body").innerWidth();
    canvas.height = document.documentElement.clientHeight 
}

function fitTheTopicTag(){
    // only fit the bubbles/tags, if it's portrait mode
    // put them into an array

    if(isPortraitMode()){
        // vertical positioning
        let nextPos = 80;

        $("#controls .dot").each(function () { 
            $(this).css({
                top: nextPos,
                left: -5,
                width: '20%',
                height: '15%'

            });
            nextPos += 200;            
         });

         
    } else {
        //static positioning
        $("#palma").css({
            top: '10%',
            left: '5%',  
        })

        $('#eam').css({
            top: '5%',
            left: '',
            right: '5%'
        })

        $('#btb').css({
            top: '40%',
            left: '',
            right: '2%'
        })

        $('#coinrattler').css({
            top: '70%',
            left: '',
            right: '5%'
        })
    }
}

// Position and resize the Svan images
function fitTheSwan() {
    const DEFAULT_BORDER_SIZE = 20;

    if(isPortraitMode()){
        // resize the svan area 
        $("#imgContainer, #imgContainer > img").css({
            position: 'fixed',            
        });

        let adaptedSize;
        let adaptedTop;

        let i = 0;

        // position the svans next to the tag
        $("#controls > a > .dot").each(function () { 
            let imgIdx = $(this).index() + 1;
            let i 
            let ctrPosTop = $(this).position().top;
            let ctrPosLeft = $(this).position().left;

            // compute the image width
            let leftStart = parseInt(ctrPosLeft + $(this).width() + (window.innerWidth * 0.1) + DEFAULT_BORDER_SIZE);
            let svanWidth =  window.innerWidth - (leftStart  + (window.innerWidth * 0.05));

            // compute the image top pos;
            let centreCtrY = ctrPosTop + ($(this).height() / 2);
            let centreImgY = ctrPosTop + (svanWidth / 2);
            let delta = (centreImgY - centreCtrY);
            if((ctrPosTop - delta) < 0){
                ctrPosTop = 0;
                console.log("set to 0: " + ctrPosTop + ": " + delta);
            }else{
                ctrPosTop -= delta;
            }
            
            console.log("top/left: " + ctrPosTop + "/" + ctrPosLeft + ", w/h:" + svanWidth + "/" + svanWidth);

            let svanImg = $("#imgContainer > img").eq(imgIdx);
            console.log(imgIdx + " --> " + svanImg.attr("src"));
            svanImg.css({
                position: 'fixed',
                top: ctrPosTop + 'px',
                left: leftStart + 'px',
                width: svanWidth + 'px',
                height: svanWidth + 'px'
            });                      
         });

         // fit the black svan
         let refEl = $(".dot").first();
         let ctrPosLeft = refEl.position().left;

         // compute the main black svan width
         let leftStart = parseInt(ctrPosLeft + refEl.width() + (window.innerWidth * 0.1));
         let svanWidth =  window.innerWidth - (leftStart + (window.innerWidth * 0.05));
        $("#imgContainer > img").first().css({
            width: svanWidth,
            height: svanWidth,
            left: leftStart,
            top: '0px',
         });
    }
    else {
        // resize the svan area;    
        adaptedSize = window.innerWidth * 0.6;
        if(adaptedSize > window.innerHeight) {
            adaptedSize = window.innerHeight * 1.1;
        }

        adaptedTop = (window.innerHeight / 2) - (adaptedSize / 2);        
        var x = ($("body").innerWidth() / 2) - (adaptedSize / 2);
        $("#imgContainer, #imgContainer > img").css({
            width: adaptedSize,
            height: adaptedSize,
            left: x,
            top: adaptedTop
        });

    }
}

// indicates portrait mode or a mode where vertical space is just too narrow.
function isPortraitMode(){
    if(screen.orientation.type.includes("portrait"))
        return true;
    if(window.innerHeight < 800)
        return true;
    if(window.innerHeight > window.innerWidth)
        return true;
    else
        return false;
}

///////////// INVOCATIONS CODE //////////////////
$(document).ready(function () {

    $("#controls").on('touchstart', 'div', function (event) {
        console.log(event.type + " fired.");
    });

    $("#controls").on('touchend', 'div', function (event) {        
        console.log(event.type + " fired");        
    });

    $("#controls").on('mouseover', '>a', function (event) {
    
        $("#imgContainer img").removeClass("opaque");
        var imageIdx = $(this).index() + 1;
        $("#imgContainer img").eq(imageIdx).addClass("opaque");

        // start the flare
        var svanImg = $("#imgContainer>img").eq(imageIdx);
        var flare = new Flare($(this).children().first(), svanImg );
        flare.draw();

        $(this)
        .delay(1000)
        .queue( function(next){ 
          $(this).find("a").first().css({ "pointer-events": "all"});
          next(); 
        });
    });

    $("#controls .dot").on('mouseout', function (event) {
        //console.log("mouse out on controls ");
        $("#imgContainer > img").removeClass("opaque");
        $("#imgContainer > img").eq(0).addClass("opaque");
        clearCanvas();    
        //$(this).parent().css({ "pointer-events": "none"});          
    });

    fitAll();

    // Update the drawings on signifficant change

    window.addEventListener('resize', function (event) {
        fitAll();
    });

    screen.orientation.addEventListener('change', function() {
        fitAll();
    });

});

