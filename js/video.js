/* VIDEO PLAYER STUFF
########################*/

/*YouTube stuff
---------------*/

var player;

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

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-screen-on', {
        videoId: 'ajhgAqEnT38',
        playerVars: {
            color: 'white',
            playlist: 'Zk-hz7ki4H8, RoY1FFBBZQQ, S26XIyT5BCI'
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


function activateYouTube(){
    $('#youtube-screen-on').removeClass('inactive');
    screenMode = "youtube";
    youTubeActive = true;
}

function deactivateYouTube(){
    $('#youtube-screen-on').addClass('inactive');
    youTubeActive = false;
}


var screenMode = "menu";
const NUM_ROWS = "2";
const NUM_COLS = "2";
var menuPosition = [1,1];


var tvYouTube = new Snap('#television-youtube');
Snap.load('img/television-youtube.svg', function (response) {
    
    var videoRow1Col1 = response.select('#video-row-1-col-1');
    videoRow1Col1.click( videoRow1Col1ClickHandler );
    videoRow1Col1.mouseover(  videoRow1Col1MouseoverHandler );
    
    
    var videoRow1Col2 = response.select('#video-row-1-col-2');
    videoRow1Col2.click( videoRow1Col2ClickHandler );
    videoRow1Col2.mouseover(  videoRow1Col2MouseoverHandler );
    
    
    var videoRow2Col1 = response.select('#video-row-2-col-1');
    videoRow2Col1.click( videoRow2Col1ClickHandler );
    videoRow2Col1.mouseover(  videoRow2Col1MouseoverHandler );
    
    
    var videoRow2Col2 = response.select('#video-row-2-col-2');
    videoRow2Col2.click( videoRow2Col2ClickHandler );
    videoRow2Col2.mouseover(  videoRow2Col2MouseoverHandler );
    
    tvYouTube.append(response);
});

var tvRemote = new Snap('#television-remote');
Snap.load('img/remote.svg', function (response) {
    
    var powerButton = response.select('#remote-power-button');
    powerButton.click( powerButtonClickHandler );
    
    /*Channel Number Buttons*/
    /* Would like to DRY this up*/
    var button1 = response.select('#remote-button-1');
    button1.click( button1ClickHandler );
    
    var button2 = response.select('#remote-button-2');
    button2.click( button2ClickHandler );
    
    var button3 = response.select('#remote-button-3');
    button3.click( button3ClickHandler );
    
    var button4 = response.select('#remote-button-4');
    button4.click( button4ClickHandler );
    
    
    var menuButton = response.select('#menu-button');
    menuButton.click( stopButtonClickHandler );
    
    var backButton = response.select('#back-button');
    backButton.click( stopButtonClickHandler );
    
    
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
    
    
    
    var arrowUpButton = response.select('#remote-up-button');
    arrowUpButton.click( arrowUpButtonClickHandler );
    
    var arrowLeftButton = response.select('#remote-left-button');
    arrowLeftButton.click( arrowLeftButtonClickHandler );
    
    var arrowDownButton = response.select('#remote-down-button');
    arrowDownButton.click( arrowDownButtonClickHandler );
    
    var arrowRightButton = response.select('#remote-right-button');
    arrowRightButton.click( arrowRightButtonClickHandler );
    
    
    var enterButton = response.select('#remote-enter-button');
    enterButton.click( enterButtonClickHandler );
    
    
    
        
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

function powerButtonClickHandler(){
    
    if(screenMode){
        
        var oldMenuPosition;
        
        deactivateYouTube();
        player.stopVideo();
        $('#youtube-smart-menu').addClass('inactive');
        //Make LED red
        $('#youtube-television-led').css('fill', '#A02B33');
        oldMenuPosition = menuPosition.slice();
        menuPosition = [1,1];
        updateMenuSelection(oldMenuPosition);//Reset the menu
        screenMode = "";
    }
    else{
        
        $('#youtube-smart-menu').removeClass('inactive');
        //Make LED green
        $('#youtube-television-led').css('fill', '#8AA24C');
        
        screenMode = "menu";
    }
    
}


function volumeUpButtonClickHandler(){
    
    if(screenMode){
        //Get volume in case the volume has been adjusted by the user manually
        var playerVolume = player.getVolume();
        playerVolume += 5;
        //Turn the volume up, only if the player isn't muted, otherwise unmute
        player.isMuted() ? player.unMute() : player.setVolume(playerVolume)
    }
}

function volumeDownButtonClickHandler(){
    
    if(screenMode){
        //Get volume in case the volume has been adjusted by the user manually
        var playerVolume = player.getVolume();
        playerVolume -= 5;
        player.setVolume(playerVolume)
    }
}

function channelUpButtonClickHandler(){
    if(screenMode == "youtube") player.nextVideo();
}

function channelDownButtonClickHandler(){
    if(screenMode == "youtube") player.previousVideo();
}


function muteButtonClickHandler(){
    
    if(screenMode){
        player.isMuted() ? player.unMute() : player.mute()
    }
    
}


function button1ClickHandler(){
    if(screenMode){
        player.playVideoAt(0);
        activateYouTube();
    }    
}

function button2ClickHandler(){
    if(screenMode){
        player.playVideoAt(1);
        activateYouTube();
    }    
}

function button3ClickHandler(){
    if(screenMode){
        player.playVideoAt(2);
        activateYouTube();
    }    
}

function button4ClickHandler(){
    if(screenMode){
        player.playVideoAt(3);
        activateYouTube();
    }    
}


function arrowUpButtonClickHandler(){
   
   if(screenMode == "menu"){
        if(menuPosition[1] > 1){
            var oldMenuPosition = menuPosition.slice();
            menuPosition[1] -= 1;
            updateMenuSelection(oldMenuPosition);
        }
    }
}

function arrowLeftButtonClickHandler(){
    if(screenMode == "menu"){
        if(menuPosition[0] > 1){
            var oldMenuPosition = menuPosition.slice();
            menuPosition[0] -= 1;
            updateMenuSelection(oldMenuPosition);
        }
    }
}

function arrowDownButtonClickHandler(){
    if(screenMode == "menu"){
        if(menuPosition[1] < NUM_ROWS){
            var oldMenuPosition = menuPosition.slice();
            menuPosition[1] += 1;
            updateMenuSelection(oldMenuPosition);
        }
    }
}

function arrowRightButtonClickHandler(){
     if(screenMode == "menu"){
        if(menuPosition[0] < NUM_COLS){
            var oldMenuPosition = menuPosition.slice();
            
            menuPosition[0] += 1;
            updateMenuSelection(oldMenuPosition);
        }
    }
}

function enterButtonClickHandler(){
    if(screenMode = "menu"){
        var selectedVideo;
        
        //Calculate video number from the menu position, which is the column number plus the
        //number of columns in each previous row
        selectedVideo = menuPosition[0] + ((menuPosition[1] - 1) * NUM_COLS);
        player.playVideoAt(selectedVideo - 1); // -1 because of the zero indexing
        activateYouTube();
    }
};




function playButtonClickHandler(){
    if(screenMode == "youtube"){
        player.setPlaybackRate(1);
        player.playVideo();
    }
    else if(screenMode == "menu"){
        enterButtonClickHandler();
    }
}

function pauseButtonClickHandler(){
    if(screenMode == "youtube"){
        player.pauseVideo();
    }
}

function stopButtonClickHandler(){
    if(screenMode == "youtube"){
        player.stopVideo();
        deactivateYouTube();
        screenMode = "menu";
    }
}

function fastForwardButtonClickHandler(){
    if(screenMode){
        var speed = player.getPlaybackRate() * 2;
        player.setPlaybackRate(speed);
    }
}

function rewindButtonClickHandler(){
    if(screenMode){
        var speed = player.getPlaybackRate() / 2;
        player.setPlaybackRate(speed);
    }
}

function skipForwardButtonClickHandler(){
    if(screenMode == "youtube") player.seekTo(player.getCurrentTime() + 30, true);
}

function skipBackButtonClickHandler(){
    if(screenMode = "youtube") player.seekTo(player.getCurrentTime() - 30, true);
}


/*Smart TV Menu stuff
-------------------*/
var youTubeActive = false;

function videoRow1Col1MouseoverHandler() {
    var oldMenuPosition = menuPosition.slice();
    
    menuPosition = [1, 1];
    updateMenuSelection(oldMenuPosition);
}


function videoRow1Col2MouseoverHandler() {
    var oldMenuPosition = menuPosition.slice();
    
    menuPosition = [2, 1];
    updateMenuSelection(oldMenuPosition);
}

function videoRow2Col1MouseoverHandler() {
    var oldMenuPosition = menuPosition.slice();
    
    menuPosition = [1, 2];
    updateMenuSelection(oldMenuPosition);
}

function videoRow2Col2MouseoverHandler() {
    var oldMenuPosition = menuPosition.slice();
    
    menuPosition = [2, 2];
    updateMenuSelection(oldMenuPosition);
}

function videoRow1Col1ClickHandler() {
    activateYouTube();
    player.playVideoAt(0);
 }

function videoRow1Col2ClickHandler() {
    activateYouTube();
    player.playVideoAt(1);
 }
 
 function videoRow2Col1ClickHandler() {
    activateYouTube();
    player.playVideoAt(2);
 }
 
 function videoRow2Col2ClickHandler() {
    activateYouTube();
    player.playVideoAt(3);
 }

function updateMenuSelection(oldMenuPosition){
    
    //If the position hasn't changed, do nothing, otherwise the highlight disappears
    if(menuPosition[0] != oldMenuPosition[0] || menuPosition[1] != oldMenuPosition[1]){
        
        $("#video-row-" + menuPosition[1] + "-col-" + menuPosition[0]).addClass('menu-selection');
        $("#video-row-" + oldMenuPosition[1] + "-col-" + oldMenuPosition[0]).removeClass('menu-selection');
    }

}


/*END VIDEO PLAYER STUFF
#########################*/
