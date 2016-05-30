

var previousShows = {
    syntheticSheep : { "title" : "Do Scientists Dream of Synthetic Sheep?",
                       "content" : `The Fringe's first ever comedy lecture on synthetic biology.
                                    Supported by the Royal Society of Chemistry, this is a show that answers pressing questions like: What is a spider-goat? Can we create artificial life? And why haven’t we made Jurassic Park yet?`
                     },
    frankensteinsMonster : { "title" : "Frankenstein's Love Monster",
                             "content" : `The story of a zoo-keeper who falls in love with a modern-day Dr. Frankenstein.
                                          There is something strange going on in the catacombs under the otter cage. Inside these ottercombs, someone is conducting an experiment.
                                          Find out just how far one man will go to impress a girl who has a face like Keira Knightley has a face.`},
    killingMachines : { "title" : "Jack and Nikki: Killing Machines",
                        "content" : `Jack Heal (Chortle Student Comedian 2008) and Nikki Blemings (a girl) request the pleasure of your company at their business seminar on contract killing.
                                     Bring cash for this once in a lifetime opportunity.
                                     Goggles optional.`},
    murderthon : { "title" : "Jack Heal's Murderthon",
                   "content" : `Jack Heal is a man with an axe to grind. A literal axe.
                                Join him for his spoken word show, Murderthon: a tale of vengeance, death threats and unexpected sentence endings.`}    
}


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
