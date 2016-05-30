

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
