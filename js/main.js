$('a[href^="#"]').on('click', function(event) {

    var target = $( $(this).attr('href') );

    if( target.length ) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top - 99//101 rather than 100 because of issue where 1 pixel was still sometimes visible
        },500);
    }

});

$(window).scroll( function (event) { 
    
    updateBasedOnScrollPosition();
    
});

$(window).resize( function (event){
    placeYouTubeScreen();
});


$(document).ready( function (event){
    
    updateBasedOnScrollPosition();
    placeYouTubeScreen();    
    
});

function placeYouTubeScreen(){
    
    //Kludge to get around embedding iframe in SVG problems with IE
    //IE and Firefox absolute positioning not behaving the way it does in Chrome. Investigate!
    var screenLeft = $('#youtube-screen-off').position().left;
    var screenTop = $('#youtube-screen-off').position().top;
    
    console.log(screenLeft + " " + screenTop);
    
    $('#youtube-screen-on').css('left', screenLeft);
    $('#youtube-screen-on').css('top', screenTop);
    
}

/*VIDEO PLAYER STUFF
########################*/

var currentVideo = "#chortle-final";


class Video {
    constructor(id, urlMiddle) {
        this.id = id;
        var urlStart = '<iframe xmlns="http://www.w3.org/1999/xhtml" class="youtube-content" src="https://www.youtube.com/embed/'
        var urlEnd = '" frameborder="0"></iframe>';
        this.url = urlStart + urlMiddle + urlEnd;
    }
}

var chortleFinalVideo = new Video('#chortle-final', 'S26XIyT5BCI');
var murderthonTrailerlVideo = new Video('#murderthon-trailer', 'Zk-hz7ki4H8');


$('#chortle-final').on('click', function(){

    loadVideo(chortleFinalVideo);
});

$('#murderthon-trailer').on('click', function(){
    loadVideo(murderthonTrailerlVideo);
});

function loadVideo(videoToLoad){
    if($('#youtube-screen-on').html() != videoToLoad.url){
        $('#youtube-screen-on').html(videoToLoad.url);
        currentVideo = videoToLoad.id;
    }
}

loadVideo(chortleFinalVideo);
/*END OF VIDEO PLAYER STUFF
##########################*/


sectionTops = [];
function sectionTopCalculator(){
    
}



var avatar = new Snap('.avatar-content');
Snap.load('img/jack.svg', function (response) {
   
   var theMonitor = response.select('#monitor-group');
   theMonitor.click( monitorClickHandler );
   
   avatar.append(response);
});



var monitorOn = true;
function monitorClickHandler(){
    console.log("Monitor clicked!");
    monitorOn ? $('#monitor-screen-on').css("opacity", 1) : $('#monitor-screen-on').css("opacity", 0);
    monitorOn = !monitorOn;
};



var posterStand = new Snap('#poster-stand');
Snap.load('img/poster-stand.svg', function (response) {
    posterStand.append(response);
});

var thePoster = posterStand.image("img/murderthon.jpg", 181.386, -118.162, 542.798, 767.714);





var headIcon = new Snap('.jack-head-icon');
Snap.load('img/jack-head.svg', function (response) {
   headIcon.append(response); 
});


var calendarIcon = new Snap('.calendar-icon');
Snap.load('img/calendar.svg', function (response) {
   calendarIcon.append(response); 
});


var televisionIcon = new Snap('.television-icon');
Snap.load('img/television.svg', function (response) {
   televisionIcon.append(response); 
});


var envelopeIcon = new Snap('.envelope-icon');
Snap.load('img/envelope.svg', function (response) {
   envelopeIcon.append(response); 
});

function updateBasedOnScrollPosition(){
    
  
    
    var windowTop = $(document).scrollTop();
    var halfWindowHeight = $(window).height() / 2;
    
    var aboutPoint = $("#about").position().top - halfWindowHeight;
    var datesPoint = $("#dates").position().top - halfWindowHeight;
    var mediaPoint = $("#media").position().top - halfWindowHeight;
    var contactPoint = $("#contact").position().top - halfWindowHeight;
    
    
    
   console.log(windowTop);
    
    /* Could do with refactoring to DRY up*/
    if(windowTop < aboutPoint){
        var topColour = $('#top').css("background-color");
        $(".title-cap").css("color", topColour);
        $("#lab-background").css("opacity", 0);
        
    }
    else if(windowTop > aboutPoint && windowTop < datesPoint){
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
        $("#contact-background").css("opacity", 0);
        
    }
    else if(windowTop > mediaPoint && windowTop < contactPoint){
        var mediaColour = $('#media').css("background-color");
        $(".title-cap").css("color", mediaColour);
        $("#comedy-club-background").css("opacity", 0);
        $("#comedy-club-foreground").css("opacity", 0);
        $("#contact-background").css("opacity", 0);
        
    }
    
    else if(windowTop > contactPoint){
        var contactColour = $('#contact').css("background-color");
        $(".title-cap").css("color", contactColour);
        $("#comedy-club-background").css("opacity", 0);
        $("#comedy-club-foreground").css("opacity", 0);
        $("#contact-background").css("opacity", 1);
    }
    
}