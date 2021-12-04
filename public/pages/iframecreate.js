let iframe_created = false;

var frame = document.createElement("iframe");

frame.width = 1200;
frame.height = 600;

function fullscreen(){
    //frame.width = 1500;
    //frame.height = 900;
    frame.frameBorder = 0
}

function create_iframe(link){
    if (!iframe_created == true){
        frame.src = "https://"+link;

        frame.scrolling = "no"
        frame.style.position = "absolute";
        frame.style.left = "20%"
        frame.style.top = "20%"

        document.getElementById("frame").style.visibility= "hidden";
        document.getElementById("games").style.visibility = "hidden";

        document.body.appendChild((frame));
        iframe_created = true;
    }
}