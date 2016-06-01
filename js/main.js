const numberOfPosters = 4;

var sectionTops = [];


var halfWindowHeight;
//Tops for each of the various major sections
var aboutPoint;
var datesPoint;
var mediaPoint;
var contactPoint;




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
    
    goingDown = $(document).scrollTop() > lastScrollPos ? true : false;
    
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
    
    //kludge to get around buggy behaviour when page is first loading
    setTimeout(function(){
        disableScrollAtStart = false;
        updateAnimations();
    }, 300);
    
    
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




function placeYouTubeScreen(){
    
    //Kludge to get around embedding iframe in SVG problems with IE
    
    var screen = document.getElementById('youtube-screen-off');
    var screenHeight = screen.getBoundingClientRect().height;
    var screenWidth = screen.getBoundingClientRect().width;
    var screenLeft = $('#youtube-screen-off').position().left;
    var screenTop = $('#youtube-screen-off').position().top;
    
    
    $('#youtube-screen-on').css('left', screenLeft);
    $('#youtube-screen-on').css('top', screenTop);
    $('#youtube-screen-on').css('height', screenHeight);
    $('#youtube-screen-on').css('width', screenWidth);
    
}


/* AVATAR ANIMATION STUFF*/
lastAnimation = "";
newAnimation = "";

currentAnimations = {
    leftLowerArm: ""
}


var leftLowerArm, leftHand;

var avatar = new Snap('.avatar-content');
Snap.load('img/jack.svg', function (response) {
   
   var theMonitor = response.select('#monitor-group');
   theMonitor.click( monitorClickHandler );
   
   leftLowerArm = bodyPartGenerator(response, '#left-lower-arm', '#left-lower-elbow');
   leftHand = bodyPartGenerator(response, '#left-palm-open', '#left-wrist');
   
   avatar.append(response);
});

function bodyPartGenerator(response, bodyPart, rotationPart){
    var generatedPart = {
        element: response.select(bodyPart),
        rotationPointX: response.select(rotationPart).attr("cx"),
        rotationPointY: response.select(rotationPart).attr("cy")
    };
    
    return generatedPart;
}

function updateAnimations(){
    if(lastAnimation != newAnimation){
        
    }
}

function waveLeftArmStart(){
    if(currentAnimations.leftLowerArm == "waving"){
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
    
    if(currentAnimations.leftLowerArm == "waving"){
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
        
        
        currentAnimations.leftLowerArm = "waving";
        var topColour = $('#top').css("background-color");
        $(".title-cap").css("color", topColour);
        $("#lab-background").css("opacity", 0);
        
    }
    else if(windowTop > aboutPoint && windowTop < datesPoint){
        currentAnimations.leftLowerArm = "";
        var aboutColour = $('#about').css("background-color");
        $(".title-cap").css("color", aboutColour);
        $("#lab-background").css("opacity", 1);
        $("#comedy-club-background").css("opacity", 0);
        $("#comedy-club-foreground").css("opacity", 0);
    }
    else if(windowTop > datesPoint && windowTop < mediaPoint){
        var datesColour = $('#dates').css("background-color");
        $(".title-cap").css("color", datesColour);
        $("#lab-background").css("opacity", 0);
        $("#comedy-club-background").css("opacity", 1);
        $("#comedy-club-foreground").css("opacity", 1);
        $('#media-background').css("opacity", 0);
        $("#contact-background").css("opacity", 0);
        
    }
    else if(windowTop > mediaPoint && windowTop < contactPoint){
        var mediaColour = $('#media').css("background-color");
        $(".title-cap").css("color", mediaColour);
        $("#comedy-club-background").css("opacity", 0);
        $("#comedy-club-foreground").css("opacity", 0);
        $('#media-background').css("opacity", 1);
        $("#contact-background").css("opacity", 0);
        
    }
    
    else if(windowTop > contactPoint){
        var contactColour = $('#contact').css("background-color");
        $(".title-cap").css("color", contactColour);
        $("#comedy-club-background").css("opacity", 0);
        $("#comedy-club-foreground").css("opacity", 0);
        $('#media-background').css("opacity", 0);
        $("#contact-background").css("opacity", 1);
    }
    
}
/* DEBUGGING FUNCTIONS
########################*/
