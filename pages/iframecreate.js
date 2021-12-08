let iframe_created = false;
var frame = document.createElement("iframe");
let headerContainer = document.querySelector(".headerContainer");
let games = document.querySelector("#games")
let gameButton = document.querySelectorAll(".game-button")

//frame.width = 1200;
//frame.height = 600;

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
    frame.classList.add("frame")
    if (!iframe_created == true){
        frame.src = "https://"+link;
        // document.getElementById("bottom-settings").style.visibility = "visible"

        gameButton.forEach(removeBtn => { 
            removeBtn.style.display = "none"
        })

        headerContainer.style.visibility= "hidden";
        document.getElementById("bottom-settings").style.visibility = "visible"
        games.appendChild(frame)
        iframe_created = true; 
    }
}

function destroy_frame(){
    if (iframe_created == true) {
        headerContainer.style.visibility= "visible";

        gameButton.forEach(removeBtn => { 
            removeBtn.style.display = "block"
        })

        document.getElementById("bottom-settings").style.visibility = "hidden"
        frame.remove();
        iframe_created = false;
    }
}
