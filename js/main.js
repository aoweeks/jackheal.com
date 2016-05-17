
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

$(window).scroll( function (event) { 
    updateBasedOnScrollPosition();
});

$(window).resize( function (event){
    
    getSectionPointInfo();
    placeYouTubeScreen();
    getSectionTops();
});


$(document).ready( function (event){
    getSectionPointInfo();
    updateBasedOnScrollPosition();
    placeYouTubeScreen();    
    getSectionTops();
});

/* SECTION SCROLLING STUFF
##########################*/

$(document).keydown( function (event){
   switch(event.which){
        
        case 33: //page up
            scrollCheckSection(false);
        break;
   
        case 34: //page down
            scrollCheckSection(true);
        break;
       
       
        case 38: //up
            scrollCheckSection();
        break;
   
        case 40: //down
            scrollCheckSection(true);
        break;
        
        default: return;
   }
});

$(document).mousewheel( function(event, delta) {
   if(delta > 0 ){
        scrollCheckSection(false);
   }
   else{
       scrollCheckSection(true);
   }
});

var scrollTimeOut;
function scrollCheckSection(goingDown){
    clearTimeout(scrollTimeOut);
    scrollTimeOut = setTimeout(function(){
        checkIfMovedToNewSection(goingDown)
    }, 200);
}





function scrollToSection(target){
         $('html, body').animate({
            scrollTop: target//101 rather than 100 because of issue where 1 pixel was still sometimes visible
        },500);
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


/* END SECTION SCROLLING STUFF
#############################*/




function placeYouTubeScreen(){
    
    //Kludge to get around embedding iframe in SVG problems with IE
    
    var screen = document.getElementById('youtube-screen-off');
    var screenHeight = screen.getBoundingClientRect().height;
    var screenWidth = screen.getBoundingClientRect().width;
    var screenLeft = $('#youtube-screen-off').position().left;
    var screenTop = $('#youtube-screen-off').position().top;
    
    console.log(screenLeft + " " + screenTop + " : " + screenHeight + " " + screenWidth);
    
    $('#youtube-screen-on').css('left', screenLeft);
    $('#youtube-screen-on').css('top', screenTop);
    $('#youtube-screen-on').css('height', screenHeight);
    $('#youtube-screen-on').css('width', screenWidth);
    
}

/*VIDEO PLAYER STUFF
########################

var currentVideo = "#chortle-final";


class Video {
    constructor(id, urlMiddle) {
        this.id = id;
        var urlStart = '<iframe xmlns="http://www.w3.org/1999/xhtml" class="youtube-content" src="https://www.youtube.com/embed/'
        var urlEnd = '" frameborder="0" /allowfullscreen></iframe>';
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
END OF VIDEO PLAYER STUFF
##########################*/




var avatar = new Snap('.avatar-content');
Snap.load('img/jack.svg', function (response) {
   
   var theMonitor = response.select('#monitor-group');
   theMonitor.click( monitorClickHandler );
   
   avatar.append(response);
});



var monitorOn = true;
function monitorClickHandler(){
    monitorOn ? $('#monitor-screen-on').css("opacity", 1) : $('#monitor-screen-on').css("opacity", 0);
    monitorOn = !monitorOn;
};



var posterStand = new Snap('#poster-stand');
Snap.load('img/poster-stand.svg', function (response) {
    posterStand.append(response);
});

var thePoster = posterStand.image("img/murderthon.jpg", 181.386, -118.162, 542.798, 767.714);


/* VIDEO PLAYER STUFF
########################*/

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-screen-on', {
        videoId: 'S26XIyT5BCI',
        playerVars: {
            color: 'white',
            playlist: 'Zk-hz7ki4H8'
        },
        events: {
            onReady: initializeYouTube
        }
    });
}

function initializeYouTube(){
    placeYouTubeScreen();
    player.setLoop(true);
}


var tvRemote = new Snap('#television-remote');
Snap.load('img/remote.svg', function (response) {
    
    var powerButton = response.select('#remote-power-button');
    powerButton.click( powerButtonClickHandler );
    
    /*Channel Number Buttons*/
    /* Would like to DRY this up, but can't find a way to pass parameters when setting the click handler*/
    var button1 = response.select('#remote-button-1');
    button1.click( button1ClickHandler );
    
    var button2 = response.select('#remote-button-2');
    button2.click( button2ClickHandler );
    
    
    var channelUpButton = response.select('#remote-channel-up-button');
    channelUpButton.click( channelUpButtonClickHandler );
    
    var channelDownButton = response.select('#remote-channel-down-button');
    channelDownButton.click( channelDownButtonClickHandler );
    
    
    var volumeUpButton = response.select('#remote-volume-up-button');
    volumeUpButton.click( volumeUpButtonClickHandler );
    
    var volumeDownButton = response.select('#remote-volume-down-button');
    volumeDownButton.click( volumeDownButtonClickHandler );
    
    var muteButton = response.select('#remote-mute-button');
    muteButton.click( muteButtonClickHandler );
    
        
    var playButton = response.select('#remote-play-button');
    playButton.click( playButtonClickHandler );
    
    var pauseButton = response.select('#remote-pause-button');
    pauseButton.click( pauseButtonClickHandler );
    
    var stopButton = response.select('#remote-stop-button');
    stopButton.click( stopButtonClickHandler );
    
    var fastForwardButton = response.select('#remote-fast-forward-button');
    fastForwardButton.click( fastForwardButtonClickHandler );
    
    var rewindButton = response.select('#remote-rewind-button');
    rewindButton.click( rewindButtonClickHandler );
    
    
    var skipForwardButton = response.select('#remote-skip-forward-button');
    skipForwardButton.click( skipForwardButtonClickHandler );
    
    var skipBackButton = response.select('#remote-skip-back-button');
    skipBackButton.click( skipBackButtonClickHandler );
        
        
    tvRemote.append(response);
});

var screenOn = true;
function powerButtonClickHandler(){
    
    if(screenOn){
        $('#youtube-screen-on').css('opacity', 0);
        player.stopVideo();
        $('#youtube-television-led').css('fill', '#A02B33');
    }
    else{
        $('#youtube-screen-on').css('opacity', 1);
        $('#youtube-television-led').css('fill', '#8AA24C');
    }
    
    screenOn = !screenOn;
    
}


function volumeUpButtonClickHandler(){
    
    if(screenOn){
        //Get volume in case the volume has been adjusted by the user manually
        var playerVolume = player.getVolume();
        playerVolume += 5;
        //Turn the volume up, only if the player isn't muted, otherwise unmute
        player.isMuted() ? player.unMute() : player.setVolume(playerVolume)
    }
}

function volumeDownButtonClickHandler(){
    
    if(screenOn){
        //Get volume in case the volume has been adjusted by the user manually
        var playerVolume = player.getVolume();
        playerVolume -= 5;
        player.setVolume(playerVolume)
    }
}

function channelUpButtonClickHandler(){
    if(screenOn) player.nextVideo();
}

function channelDownButtonClickHandler(){
    if(screenOn) player.previousVideo();
}


function muteButtonClickHandler(){
    
    if(screenOn){
        player.isMuted() ? player.unMute() : player.mute()
    }
    
}


function button1ClickHandler(){
    if(screenOn) player.playVideoAt(0);
}

function button2ClickHandler(){
    if(screenOn) player.playVideoAt(1);
}



function playButtonClickHandler(){
    if(screenOn){
        player.setPlaybackRate(1);
        player.playVideo();
    }
}

function pauseButtonClickHandler(){
    if(screenOn){
        player.pauseVideo();
    }
}

function stopButtonClickHandler(){
    if(screenOn){
        player.stopVideo();
    }
}

function fastForwardButtonClickHandler(){
    if(screenOn){
        var speed = player.getPlaybackRate() * 2;
        player.setPlaybackRate(speed);
    }
}

function rewindButtonClickHandler(){
    if(screenOn){
        var speed = player.getPlaybackRate() / 2;
        player.setPlaybackRate(speed);
    }
}

function skipForwardButtonClickHandler(){
    if(screenOn) player.seekTo(player.getCurrentTime() + 30, true);
}

function skipBackButtonClickHandler(){
    if(screenOn) player.seekTo(player.getCurrentTime() - 30, true);
}




/*END VIDEO PLAYER STUFF
#########################*/

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


function checkIfMovedToNewSection(goingDown){
    
    var windowTop = $(document).scrollTop() + 99;
    var windowBottom = $(document).scrollTop() + $(window).height();
    
    
    var topSection;
    var bottomSection;
    
    for(i = 0; i < sectionTops.length; i++){
        if(windowTop >= sectionTops[i] && windowTop < sectionTops[i + 1]) topSection = sectionTops[i];
        if(windowBottom >= sectionTops[i] && windowTop < sectionTops[i + 1]) bottomSection = sectionTops[i];
    }
    
    console.log("WINDOW TOP: " + windowTop + " + WINDOW BOTTOM: " + windowBottom);
    console.log("TOP: " + topSection + " + BOTTOM : " + bottomSection);
    console.log(sectionTops);
    //If the window has moved into a new section
    if(topSection != bottomSection){
        if(goingDown){
            scrollToSection(bottomSection - 99);
        }
        else{
            
            scrollToSection(topSection - 99);
        }
    }
}






/* DEBUGGING FUNCTIONS
########################*/

$('.section').on('click', function (event) {
    console.log($(this).offset().top);
});


$('#footer').on('click', function (event) {
    console.log($(this).offset().top);
});