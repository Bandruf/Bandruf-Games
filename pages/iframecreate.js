let iframe_created = false;
var frame = document.createElement("iframe");
let headerContainer = document.querySelector(".headerContainer");
let games = document.querySelector("#games")

frame.width = 1200;
frame.height = 600;

function fullscreen() {
    if (frame.requestFullscreen) {
        frame.requestFullscreen();
    } else if (frame.webkitRequestFullscreen) { /* Safari */
        frame.webkitRequestFullscreen();
    } else if (frame.msRequestFullscreen) { /* IE11 */
        frame.msRequestFullscreen();
    }
  }

function create_iframe(link){
    if (!iframe_created == true){
        frame.src = "https://"+link;

        frame.scrolling = "no"
        frame.style.position = "absolute";
        frame.style.left = "20%"
        frame.style.top = "20%"

        document.getElementById("bottom-settings").style.visibility = "visible"

        headerContainer.style.visibility= "hidden";
        games.style.visibility = "hidden";

        document.body.appendChild((frame));
        iframe_created = true; 
    }
}

function destroy_frame(){
    if (iframe_created == true) {
        headerContainer.style.visibility= "visible";
        games.style.visibility = "visible";
        document.getElementById("bottom-settings").style.visibility = "hidden"
        frame.remove();
        iframe_created = false;
    }
}