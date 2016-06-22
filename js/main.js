const numberOfPosters = 4;

var sectionTops = [];


var halfWindowHeight;
//Tops for each of the various major sections
var aboutPoint;
var datesPoint;
var mediaPoint;
var contactPoint;

var everythingIsReady = false;


$('a[href^="#"]').on('click', function(event) {

    var target = $( $(this).attr('href') );

    if( target.length ) {
        event.preventDefault();
        scrollToSection(target.offset().top - 99);
    }

});

var lastScrollPos = 0;
var disableScrollAtStart = true;

$(window).scroll( function (event) {
    var goingDown;
    
    goingDown = $(document).scrollTop() >= lastScrollPos ? true : false;
    
    updateBasedOnScrollPosition();
    if(!autoScrolling) scrollCheckSection(goingDown);
});

$(window).resize( function (event){
    getSectionPointInfo();
    placeYouTubeScreen();
    getSectionTops();
});


$(document).ready( function (event){
    
    getSectionPointInfo();
    updateBasedOnScrollPosition();
    getSectionTops();
    
    
    lastScrollPos = $(document).scrollTop();
    console.log(lastScrollPos);
    
    //kludge to get around buggy behaviour when page is first loading
    setTimeout(function(){
        disableScrollAtStart = false;
        newAnimation = "waving";
        updateAnimations(); 
    }, 300);
 
    setTimeout(blink, 900);
    
    
});

/* SECTION SCROLLING STUFF
##########################*/


var scrollTimeOut;
function scrollCheckSection(goingDown){
    clearTimeout(scrollTimeOut);
    scrollTimeOut = setTimeout(function(){
        checkIfMovedToNewSection(goingDown)
    }, 200);
}


var autoScrolling = false;


function scrollToSection(target){
    
    
    if(!disableScrollAtStart){
        
        autoScrolling = true;
        
        
        console.log("scrollToSection Firing. Target: " + target + " (lastScrollPos = " + lastScrollPos + ")");
        
         $('html, body').animate({
            scrollTop: target//101 rather than 100 because of issue where 1 pixel was still sometimes visible
        },500);
        
        setTimeout(function(){
            lastScrollPos = $(document).scrollTop();
            autoScrolling = false;
        }, 500);
        
  
    }
}

function getSectionTops(){
    
    //Clear the array
    sectionTops.length = 0;
    
    
    //Find the top of each section of the page and add to array
    $(".section").each( function() {
       sectionTops.push($(this).offset().top);  
    });
    
    //Also add the top of the footer to the end of the array
    sectionTops.push($("#footer").offset().top);
    
}


function checkIfMovedToNewSection(goingDown){
    
    var windowTop = $(document).scrollTop() + 99;
    var windowBottom = $(document).scrollTop() + $(window).height();
    
    var topSection;
    var bottomSection;
    
    for(i = 0; i < sectionTops.length; i++){
        if(windowTop >= sectionTops[i] && windowTop < sectionTops[i + 1]) topSection = sectionTops[i];
        if(windowBottom >= sectionTops[i] && windowTop < sectionTops[i + 1]) bottomSection = sectionTops[i];
    }
    
    //Prevent autoscrolling when reaching the top or body of the page
    if(windowTop < 100) return;
    if(windowBottom > $("#footer").offset().top) return;
    
    
    console.log("checkIfMovedToNewSection Firing. windowTop: " + windowTop + ", topSection: " + topSection + ", bottomSection: " + bottomSection);
    
    
    //If the window has moved into a new section
    if(topSection != bottomSection){
        if(goingDown){
            scrollToSection(bottomSection - 99);
            getSectionTops();
        }
        else{
            
            scrollToSection(bottomSection - $(window).height());
            getSectionTops();
        }
    }
    else{
        lastScrollPos = $(document).scrollTop();
    }
}






/* END SECTION SCROLLING STUFF
#############################*/

function blink(){    
    $('#jack-caricature').addClass('closed-eyes');
    setTimeout(unblink, 130);
}

function unblink(){
    $('#jack-caricature').removeClass('closed-eyes');
    setTimeout(blink, randomBlinkInterval());
}

function randomBlinkInterval(){
    var blinkInterval = Math.random() * (10000 - 2000) + 2000;
    return blinkInterval;
}



/* AVATAR ANIMATION STUFF*/
lastAnimation = "";
newAnimation = "";


var leftArm, leftLowerArm, leftHand, hair;
var eyeCenterPoint, eyeballs, eyeMask;
var eyeLeftPupilOriginX, eyeRightPupilOriginX;
var eyeLeftPupilOriginY, eyeRightPupilOriginY;


var avatar = new Snap('.avatar-content');

/*Load the cariacture of Jack which is on the right of screen via Snap.svg, and 
assign handlers for events etc*/

//This line is for development only
var c1 = avatar.circle(0,0,3).attr({ fill: "red" });
Snap.load('img/jack.svg', function (response) {
   
   var theMonitor = response.select('#monitor-group');
   theMonitor.click( monitorClickHandler );
   
   
   avatar.mousemove( avatarMouseMove );
   
   //No enter function, just leave
   avatar.hover( null, avatarMouseLeave);
   
   leftArm = bodyPartGenerator(response, '#left-arm', '#left-shoulder');
   leftLowerArm = bodyPartGenerator(response, '#left-lower-arm', '#left-lower-elbow');
   leftHand = bodyPartGenerator(response, '#left-palm-open-skin', '#left-wrist');
   
   hair = response.select('#hair');
   
   eyeCenterPoint = response.select('#eye-center-point');
   eyeMask = response.select('#eye-mask');
   eyeballs = response.select('#eyeballs');
   
   eyeballs.attr({
      mask: eyeMask 
   });
   
   avatar.append(response);
   
   everythingIsReady = true;
});

var avatarBBoxInfo;

/* This takes a body part that rotates, and the point about which it does rotate, and makes
object with all this information in */
function bodyPartGenerator(response, bodyPart, rotationPart){
    var generatedPart = {
        element: response.select(bodyPart),
        rotationPointX: response.select(rotationPart).attr("cx"),
        rotationPointY: response.select(rotationPart).attr("cy")
    };
    
    return generatedPart;
}


/* Anytime the mouse moves over the area with Jack's caricature in,
this works out where the mouse is and makes Jack's eyes move accordingly*/
function avatarMouseMove( ev, x, y){
    
    
    var xWithinAvatarFrame = x - avatar.getBBox().x;
    console.log(avatar.getBBox().x);
    console.log(xWithinAvatarFrame);
    console.log(x);
    
    var pnt = avatar.paper.node.createSVGPoint();
    pnt.x = x;
    pnt.y = y;
    var localPnt = pnt.matrixTransform( avatar.paper.node.getScreenCTM().inverse() );
    
    c1.attr({ cx: localPnt.x , cy: localPnt.y });
    
    
    var eyePnt = avatar.paper.node.createSVGPoint();
    eyePnt.x = eyeCenterPoint.attr("cx");
    eyePnt.y = eyeCenterPoint.attr("cy");
    var localEyePnt = eyePnt.matrixTransform( avatar.paper.node.getScreenCTM().inverse() );
    /*
    console.log(localPnt.x);
    if( localPnt.x > (localEyePnt.x + 980.889) ){
        console.log( localEyePnt.x + 980.889 );
        console.log("above");
    }
    else{
        
        console.log("below");
    }*/
    
}

/*When the mouse leaves the avatar area, the eyes reset to straight forward*/
function avatarMouseLeave(){
    console.log("left");
}

function updateAnimations(){
    
    if(lastAnimation != newAnimation){
        switch(newAnimation) {
            case "waving":
                if(everythingIsReady)waveLeftArmStart();
                break;
            default:
                break;
                
        }
        
        lastAnimation = newAnimation;
    }
}

function waveLeftArmStart(){
    if(newAnimation == "waving"){
        leftArm.element.animate({
            transform: 'r-2,' + leftArm.rotationPointX + "," + leftArm.rotationPointY
        }, 350, mina.elastic());
        
        leftLowerArm.element.animate({
            transform: 'r-10,' + leftLowerArm.rotationPointX + "," + leftLowerArm.rotationPointY
        }, 350, mina.elastic(), function(){waveLeftArmBack()});
        
        leftHand.element.animate({
            transform: 'r-30,' + leftHand.rotationPointX + "," + leftHand.rotationPointY
        }, 350, mina.bounce());
    }
    else{
        leftLowerArm.element.animate({
            transform: 'r0,' + leftLowerArm.rotationPointX + "," + leftLowerArm.rotationPointY
        }, 175, mina.elastic());
        
        leftHand.element.animate({
            transform: 'r0,' + leftHand.rotationPointX + "," + leftHand.rotationPointY
        }, 175, mina.bounce());
    }
}

function waveLeftArmBack(){ 
    
    if(newAnimation == "waving"){
        
        
        leftArm.element.animate({
            transform: 'r4,' + leftArm.rotationPointX + "," + leftArm.rotationPointY
        }, 350, mina.elastic());
        
        
        leftLowerArm.element.animate({
            transform: 'r20,' + leftLowerArm.rotationPointX + "," + leftLowerArm.rotationPointY
        }, 350, mina.elastic(), function(){waveLeftArmStart()});
        
        leftHand.element.animate({
            transform: 'r10,' + leftHand.rotationPointX + "," + leftHand.rotationPointY
        }, 350, mina.bounce());
    }
    else{
        leftLowerArm.element.animate({
            transform: 'r0,' + leftLowerArm.rotationPointX + "," + leftLowerArm.rotationPointY
        }, 175, mina.elastic());
        
        leftHand.element.animate({
            transform: 'r0,' + leftHand.rotationPointX + "," + leftHand.rotationPointY
        }, 175, mina.bounce());
    }
}





var monitorOn = true;
function monitorClickHandler(){
    monitorOn ? $('#monitor-screen-on').css("opacity", 1) : $('#monitor-screen-on').css("opacity", 0);
    monitorOn = !monitorOn;
};



var headIcon = new Snap('.jack-head-icon');
Snap.load('img/jack-head.svg', function (response) {
   headIcon.append(response); 
});


var televisionIcon = new Snap('.television-icon');
Snap.load('img/television.svg', function (response) {
   televisionIcon.append(response); 
});


var envelopeIcon = new Snap('.envelope-icon');
Snap.load('img/envelope.svg', function (response) {
   envelopeIcon.append(response); 
});



function getSectionPointInfo(){
    halfWindowHeight = $(window).height() / 2;
    
    aboutPoint = $("#about").position().top - halfWindowHeight;
    datesPoint = $("#dates").position().top - halfWindowHeight;
    mediaPoint = $("#media").position().top - halfWindowHeight;
    contactPoint = $("#contact").position().top - halfWindowHeight;
    
   
}

function updateBasedOnScrollPosition(){
   
    var windowTop = $(document).scrollTop();

    /* Could do with refactoring to DRY up*/
    if(windowTop < aboutPoint){
        newAnimation = "waving";
        var topColour = $('#top').css("background-color");
        $(".title-cap").css("color", topColour);
        $("#lab-background").css("opacity", 0);
        updateAnimations();
        
    }
    else if(windowTop > aboutPoint && windowTop < datesPoint){
        newAnimation = "";
        var aboutColour = $('#about').css("background-color");
        $(".title-cap").css("color", aboutColour);
        $("#lab-background").css("opacity", 1);
        $("#comedy-club-background").css("opacity", 0);
        $("#comedy-club-foreground").css("opacity", 0);
        updateAnimations();
        
    }
    else if(windowTop > datesPoint && windowTop < mediaPoint){
        var datesColour = $('#dates').css("background-color");
        $(".title-cap").css("color", datesColour);
        $("#lab-background").css("opacity", 0);
        $("#comedy-club-background").css("opacity", 1);
        $("#comedy-club-foreground").css("opacity", 1);
        $('#media-background').css("opacity", 0);
        $("#contact-background").css("opacity", 0);
        updateAnimations();
        
    }
    else if(windowTop > mediaPoint && windowTop < contactPoint){
        var mediaColour = $('#media').css("background-color");
        $(".title-cap").css("color", mediaColour);
        $("#comedy-club-background").css("opacity", 0);
        $("#comedy-club-foreground").css("opacity", 0);
        $('#media-background').css("opacity", 1);
        $("#contact-background").css("opacity", 0);
        updateAnimations();
        
    }
    
    else if(windowTop > contactPoint){
        var contactColour = $('#contact').css("background-color");
        $(".title-cap").css("color", contactColour);
        $("#comedy-club-background").css("opacity", 0);
        $("#comedy-club-foreground").css("opacity", 0);
        $('#media-background').css("opacity", 0);
        $("#contact-background").css("opacity", 1);
        updateAnimations();
    }
    
}


function coordinateTransform(screenPoint, someSvgObject)
{
  var CTM = someSvgObject.getScreenCTM();
  return screenPoint.matrixTransform( CTM.inverse() );
}

/* DEBUGGING FUNCTIONS
########################*/
