var spelplan, ctx;
var Score = 0;

// Karaktär
var pl,
    plx = 40,
    ply = 400,
    plvy = 10;


var sx = 700,
    sy = 0,
    vx = -15;

var fail = "false"


// Hastighet på bakrundsbilden
var mx = 0,
    mvx = -2;


var object = [];



var bgSound = new Howl({
    urls: ['ljud/bgsound.mp3']
}).play();



function start() {
    spelplan = document.getElementById("spelplan");
    ctx = spelplan.getContext("2d");

    // Gömmer Eggsplash från början
    document.getElementById("eggsplash").style.visibility = "hidden"
    pl = new egg(40, 400, 75, 75);  


    // Uppdaterar var 25 ms
    window.setInterval(update, 25);
}


/////////////////////////// Rita staplar //////////////////////////////////////////////

function staplar(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;


    this.paint = function(){
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }



}

function paintstaplar(x, y) {

        //övre
        object.push(new staplar(x, y, 100, 200));
        object.push(new staplar(x + 300, y, 100, 300));

        //undre 
        object.push(new staplar(x, y + 500, 100, 400));
        object.push(new staplar(x + 300, y + 500, 100, 400));
    }



    //////////////////////////// Rita Karaktär /////////////////////////////////////
    function egg(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.paint = function(){
            ctx.fillStyle="#00f"
            ctx.fillRect(this.x, this.y, this.w, this.h);
           
        }

        
        // Hitbox
    this.hitBox = function(i) {
        if(this.x > object[i].x && this.x < object[i].x + 100 && this.y > object[i].y && this.y < object[i].y + object[i].h) {
            console.log(object);
        }
    }
        
    }



    //////////////////////////////// rita bakrunds bild/////////////////////////////////////////
    function wallpaper(x){
        ctx.drawImage(background, x, 0, 5600, 790);
    }


    // Uppdatering
    function update() {
     
        ctx.clearRect(0, 0, spelplan.width, spelplan.height);
        wallpaper(mx);
        // rita karaktär
        pl.paint();
        // paintboll(plx, ply)
        paintstaplar(sx, sy)
        mx += mvx

        pl.y += plvy;

        object[1].paint();
        object[2].paint();
        object[3].paint();
        object[4].paint();
        
    
        
        
        for(var i = 0; i < object.length; i++) {
            pl.hitBox(i);
             object[i].x += vx;
           
            
         if(object[i].x == 0){
                object.splice(i,1);
                object.splice(i,2);
                object.splice(i,3);
                object.splice(i,4);
            }
            
          
            
            // krash till övre staplar
           /* if(objectu[i].x < (pl.x + pl.w) && (objectu[i].y + objectu[i].h) > pl.y){
                plvy = 0;
                vx = 0;
                mvx = 0;
                fail = "true"
                document.getElementById("eggsplash").style.visibility = "Visible"
            }
                 // krash till undre staplar
            if(objectd[i].x < (pl.x + pl.w) && (objectd[i].x + objectd[i].w) > pl.x && objectd[i].y < pl.y){
                plvy = 0;
                vx = 0;
                mvx = 0;
                fail = "true"
                document.getElementById("eggsplash").style.visibility = "Visible"
            } */


        }


    }


    function keyDown(e){

        e.preventDefault()

        // hur snabbt karaktären ska åka uppåt 
        if(e.keyCode == 32 && fail == "false"){
            plvy = -15;
        }   

        //  Återställer allt till det ursprungliga (restart knapp) (enter)
        if(e.keyCode == 13){
            location = location;

        }  

    }


    function keyUp(e){
        //hur stor gravitation karaktär ska ha neråt
        if(e.keyCode == 32 && fail == "false"){
            plvy = 10;
        }   
    }

 

