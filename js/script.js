var spelplan, ctx;
var Score = 0;

// Karaktär
var plx = 40,
    ply = 400,
    plvy = 10;

// Övre Stapel
var upx = 700,
    
    upvx = -10;


//Nedre Stapel 
var downx = 700,
    downy = 0,
    downvx = -10;

// Hastighet på bakrundsbilden
var mx = 0,
    mvx = -2;


var bgSound = new Howl({
    urls: ['ljud/bgsound.mp3']
}).play();



function start() {
    spelplan = document.getElementById("spelplan");
    ctx = spelplan.getContext("2d");

    // Gömmer Eggsplash från början
    document.getElementById("eggsplash").style.visibility = "hidden"

    // Uppdaterar var 25 ms
    window.setInterval(update, 25);
}


// Rita Övre staplar
function paintStaplarup(x) {
    ctx.fillStyle ="rgb(177, 255, 0)"; 
    // stapel 1 
    ctx.fillRect(x, 0, 100, 150);
    // stapel 2
    ctx.fillRect(x + 350, 0, 100, 350);

}




// Rita nedre staplar
function paintStaplardown(x, y) {
    //stapel 1
    ctx.fillRect(x , y + 400, 100, 450);
    // stapel 2
    ctx.fillRect(x + 350, y + 575 , 100, 350);
}




// Rita Karaktär
function paintboll(x, y){
    ctx.drawImage(egg1, x, y, 70, 70);
}

function wallpaper(x){
    ctx.drawImage(background, x, 0, 5600, 790);
}

// Uppdatering
function update() {
    // Suddar spelplanen
    ctx.clearRect(0, 0, spelplan.width, spelplan.height);
    wallpaper(mx);
    // Rita ut övre staplar
    paintStaplarup(upx);
    // Rita ut nedre staplar
    paintStaplardown(downx, downy);
    // Rita ut karaktär
    paintboll(plx, ply);
    // Uppdaterar positioner
    ply += plvy 
    upx += upvx 
    downx += downvx
    mx += mvx


    // Crash funktion
    if(ply < (150) && plx > upx - 70 && plx < upx + 70 || ply > ((downy - 70) + 400) && plx > downx - 70 && plx < downx + 70 || ply < 0 || ply > 720) {  






        // Visa eggsplash när man kraschat.
        document.getElementById("eggsplash").style.visibility = "visible"
        // Pausar allt när man kraschat.
        upvx = 0;
        downvx = 0;
        plvy = 0;
        mvx = 0;

     //   var bfSound = new Howl({
    //     urls: ['ljud/failsound.mp3']
            
    // }).play();


    }    

    //Poängsystem
    if(downx === 10){
        Score++;
        document.getElementById("Score").innerHTML = "Points: " + Score;

    }
}

// Knapptryck
function keyDown(e){

    e.preventDefault()

    // hur snabbt karaktären ska åka uppåt 
    if(e.keyCode == 32){
        plvy = -15;
    }   

    //  Återställer allt till det ursprungliga (restart knapp) (enter)
    if(e.keyCode == 13){
        location = location;

    }
    // Nivåer med olika hastigheter

    // Knapptryck 1
    if(e.keyCode == 49){
        downvx = -15;
        upvx = - 15;
    }   
    // Knapptryck 2
    if(e.keyCode == 50){
        downvx = - 20;
        upvx = - 20;
    }   
    // Knapptryck 3
    if(e.keyCode == 51){
        downvx = - 25 ;
        upvx = - 25;
    }   

}
//checkar att github fungerar 

function keyUp(e){
    //hur stor gravitation karaktär ska ha neråt
    if(e.keyCode == 32){
        plvy = 10;
    }   
}


