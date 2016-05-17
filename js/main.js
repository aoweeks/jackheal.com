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
            onReady: placeYouTubeScreen
        }
    });
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
    channelUpButton.click( skipForwardButtonClickHandler );
    
    var channelDownButton = response.select('#remote-channel-down-button');
    channelDownButton.click( skipBackButtonClickHandler );
    
    
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

function skipForwardButtonClickHandler(){
    if(screenOn) player.nextVideo();
}

function skipBackButtonClickHandler(){
    if(screenOn) player.previousVideo();
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