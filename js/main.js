const numberOfPosters = 4;

var sectionTops = [];


var halfWindowHeight;
//Tops for each of the various major sections
var aboutPoint;
var datesPoint;
var mediaPoint;
var contactPoint;


var previousShows = {
    syntheticSheep : { "title" : "Do Scientists Dream of Synthetic Sheep?", "content" : `The Fringe's first ever comedy lecture on synthetic biology.</p>
Supported by the Royal Society of Chemistry, this is a show that answers pressing questions like: What is a spider-goat? Can we create artificial life? And why haven’t we made Jurassic Park yet?`},
    frankensteinsMonster : { "title" : "Frankenstein's Love Monster", "content" : `The story of a zoo-keeper who falls in love with a modern-day Dr. Frankenstein.
There is something strange going on in the catacombs under the otter cage. Inside these ottercombs, someone is conducting an experiment.
Find out just how far one man will go to impress a girl who has a face like Keira Knightley has a face.`},
    killingMachines : { "title" : "Jack and Nikki: Killing Machines", "content" : `Jack Heal (Chortle Student Comedian 2008) and Nikki Blemings (a girl) request the pleasure of your company at their business seminar on contract killing.
Bring cash for this once in a lifetime opportunity.
Goggles optional.`},
    murderthon : { "title" : "Jack Heal's Murderthon", "content" : `Jack Heal is a man with an axe to grind. A literal axe.
Join him for his spoken word show, Murderthon: a tale of vengeance, death threats and unexpected sentence endings.`}    
}


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
currentAnimations = {
    leftLowerArm: "waving"
}


var leftLowerArm;

var avatar = new Snap('.avatar-content');
Snap.load('img/jack.svg', function (response) {
   
   var theMonitor = response.select('#monitor-group');
   theMonitor.click( monitorClickHandler );
   
   leftLowerArm = bodyPartGenerator(response, '#left-lower-arm', '#left-lower-elbow');
   
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
    if(currentAnimations.leftLowerArm == "waving") waveLeftArmStart();
}

function waveLeftArmStart(){
    if(currentAnimations.leftLowerArm == "waving"){
        leftLowerArm.element.animate({
            transform: 'r-20,' + leftLowerArm.rotationPointX + "," + leftLowerArm.rotationPointY
        }, 300, mina.easeinout(), function(){waveLeftArmBack()});
    }
    else{
        leftLowerArm.element.animate({
            transform: 'r0,' + leftLowerArm.rotationPointX + "," + leftLowerArm.rotationPointY
        }, 150, mina.easeinout());
    }
}

function waveLeftArmBack(){ 
    
    if(currentAnimations.leftLowerArm == "waving"){
        leftLowerArm.element.animate({
        transform: 'r20,' + leftLowerArm.rotationPointX + "," + leftLowerArm.rotationPointY
        }, 300, mina.easeinout(), function(){waveLeftArmStart()});
    }
    else{
        leftLowerArm.element.animate({
            transform: 'r0,' + leftLowerArm.rotationPointX + "," + leftLowerArm.rotationPointY
        }, 150, mina.easeinout());
    }
}





var monitorOn = true;
function monitorClickHandler(){
    monitorOn ? $('#monitor-screen-on').css("opacity", 1) : $('#monitor-screen-on').css("opacity", 0);
    monitorOn = !monitorOn;
};



var posterStand = new Snap('#poster-stand');

var posters;
var posterHeight;

Snap.load('img/poster-stand.svg', function (response) {
    
    
    posterMask = response.select('#poster-mask');
    posters = response.select('#posters');
    
    var syntheticSheepPoster = response.select("#synthetic-sheep-poster");
    syntheticSheepPoster.click( syntheticSheepPosterClickHandler );
    
    var murderthonPoster = response.select("#murderthon-poster");
    murderthonPoster.click( murderthonPosterClickHandler );
    
    var killingMachinesPoster = response.select("#killing-machines-poster");
    killingMachinesPoster.click( killingMachinesPosterClickHandler );
    
    var frankensteinsMonsterPoster = response.select("#frankensteins-monster-poster");
    frankensteinsMonsterPoster.click( frankensteinsMonsterPosterClickHandler );
    
    
    posterHeight = syntheticSheepPoster.getBBox().height;
    
    posters.attr({
       mask: posterMask 
    });
    
    posterStand.append(response);
    
});

function syntheticSheepPosterClickHandler(){
    $('#past-show-title').html(previousShows['syntheticSheep'].title);
    $('#past-show-description').html(previousShows['syntheticSheep'].content);
}

function murderthonPosterClickHandler(){
    $('#past-show-title').html(previousShows['murderthon'].title);
    $('#past-show-description').html(previousShows['murderthon'].content);
}

function killingMachinesPosterClickHandler(){
    $('#past-show-title').html(previousShows['killingMachines'].title);
    $('#past-show-description').html(previousShows['killingMachines'].content);
}

function frankensteinsMonsterPosterClickHandler(){
    $('#past-show-title').html(previousShows['frankensteinsMonster'].title);
    $('#past-show-description').html(previousShows['frankensteinsMonster'].content);
}

var whichPoster = 0;
var postersGoingUp = true;

setTimeout(movePosters, 3000);
function movePosters(){
    if(whichPoster == numberOfPosters - 1){
        postersGoingUp = false;
    }
    else if(whichPoster < 1){
        postersGoingUp = true;
    }
    
    if(postersGoingUp == true){
        setTimeout(movePostersUp, 3000);
    }
    else if(postersGoingUp == false){
        setTimeout(movePostersDown, 3000);
    }
}

function movePostersUp(){
    whichPoster++;
    var moveUpMatrix  = new Snap.Matrix();
    var moveDownMatrix = new Snap.Matrix();
    
    moveUpMatrix.translate(0, posterHeight * whichPoster);
    moveDownMatrix.translate(0,  -posterHeight * whichPoster);
    
    posterMask.animate({ transform: moveUpMatrix}, 3000 );
    posters.animate({ transform: moveDownMatrix}, 3000 );
    setTimeout(movePosters, 3000);
    
}

function movePostersDown(){
    
    whichPoster--;
    var moveUpMatrix  = new Snap.Matrix();
    var moveDownMatrix = new Snap.Matrix();
    
    moveUpMatrix.translate(0, -posterHeight * whichPoster);
    moveDownMatrix.translate(0,  posterHeight * whichPoster);
    
    posterMask.animate({ transform: moveDownMatrix}, 3000 );
    posters.animate({ transform: moveUpMatrix}, 3000 );
    setTimeout(movePosters, 3000);
}


var headIcon = new Snap('.jack-head-icon');
Snap.load('img/jack-head.svg', function (response) {
   headIcon.append(response); 
});

var topPage;
var topMonth;
var topDay;
var bottomMonth;
var bottomDay;
var calendarIcon = new Snap('.calendar-icon');
Snap.load('img/calendar.svg', function (response) {
    
   var today = new Date(); 
   
   var todayMonthString = getMonthString(today.getMonth());
   var todayDay = today.getDate();
   
   
   var tomorrow = new Date();
   tomorrow.setDate(todayDay + 1);
   
   var tomorrowMonthString = getMonthString(tomorrow.getMonth());
   var tomorrowDay = tomorrow.getDate();
   
   topPage = response.select('#top-page');
   topMonth = response.select('#top-month');
   topDay = response.select('#top-day');

   topMonth.attr({text: todayMonthString});
   topDay.attr({text: todayDay});
   
   bottomMonth = response.select('#bottom-month');
   bottomDay = response.select('#bottom-day');

   bottomMonth.attr({text: tomorrowMonthString});
   bottomDay.attr({text: tomorrowDay});
   
   calendarIcon.append(response);
   
   centerCalendarDates();
   
   /*Ugly workaround for centering month date which sometimes gives wrong value at first,
   must FIX LATER*/
   setTimeout(centerCalendarDates, 0);
});

function centerCalendarDates(){
       
   var topPageCenter = topPage.getBBox().width / 2;
   var topMonthHalf = topMonth.getBBox().width / 2;
   var topDayHalf = topDay.getBBox().width / 2;
   
   //console.log(topMonthHalf);
   //console.log(topDayHalf);
   
   topMonth.attr({x: topPageCenter - topMonthHalf});
   topDay.attr({x: topPageCenter - topDayHalf});
   //console.log("CENTERED " + topMonthHalf);
   
   var bottomMonthHalf = bottomMonth.getBBox().width / 2;
   var bottomDayHalf = bottomDay.getBBox().width / 2;
   
   
   bottomMonth.attr({x: topPageCenter - bottomMonthHalf});
   bottomDay.attr({x: topPageCenter - bottomDayHalf});
}

function getMonthString(monthNumeric){
       
   switch(monthNumeric) {
       case 0:
          return "JAN";
       case 1:
          return "FEB";
       case 2:
          return "MAR";
       case 3:
          return "APR";
       case 4:
          return "MAY";
       case 5:
          return "JUN";
       case 6:
          return "JUL";
       case 7:
          return "AUG";
       case 8:
          return "SEP";
       case 9:
          return "OCT";
        case 10:
          return "NOV";
       case 11:
          return "DEC";
      
   }
}


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



$('#up').on('click', function (event) {
    movePostersUp();
});


$('#down').on('click', function (event) {
    movePostersDown();
});
