import{games} from './games.js'

// varibles
let iframe_created = false;
let pages = 0
let time_on = 0
let all_pages = 2
let current_page = 1
let games_created = 0
let games_played = 0
let current_game = ""
let headerContainer = document.querySelector(".headerContainer");
var frame = document.createElement("iframe");
frame.scroll = false
// end

let pageIndex = 1

// fullscreen ):
function fullscreen() {
    if (frame.requestFullscreen) {
        frame.requestFullscreen();
    } else if (frame.webkitRequestFullscreen) { /* Safari */
        frame.webkitRequestFullscreen();
    } else if (frame.msRequestFullscreen) { /* IE11 */
        frame.msRequestFullscreen();
    }
  }

// main change function
function change_page(bof){
        // changes page var
        if (bof == "+") {
            document.getElementById("pg"+current_page).style.display = "none"
            current_page += 1
        } else {
            document.getElementById("pg"+current_page).style.display = "none"
            current_page -= 1
        }
    
        destroy_frame()

        if (document.getElementById("download-holder").style.display = "flex") {
            document.getElementById("download-holder").style.display = "none"
        }
    
        if (!document.getElementById("pg"+current_page)) {
    
                if (document.getElementById("page-count")) {
                    document.getElementById("page-count").innerHTML = "Page : "+current_page
                }
                
                // 'create' new page
                let new_page = document.createElement("div")
                new_page.id = "pg"+current_page
                new_page.classList.add("page")
                
                // make games on the page visible
                games.map(function(p){
                    if (p.viewed_on == current_page) {
                        new_page.style.display = "flex"
                        document.getElementById(p.gamename).style.display = "flex"
                        new_page.appendChild(document.getElementById(p.gamename))
                    }
                })
                document.body.appendChild(new_page)
            } else{
                document.getElementById("pg"+current_page).style.display = "flex"
        }

        
        // fix
        games.map(function(i){
            if (i.viewed_on != current_page) {
                document.getElementById(i.gamename).style.display = "none"
            }
        })
}
// end

frame.classList.add("frame")

// start of iframe
function create_iframe(link,r){
    let page234242 = document.querySelector(".game-holder")
    let gameButton = document.querySelectorAll(".game-button")
    let holder = document.querySelectorAll(".holder")

    if (!iframe_created == true){
        if (r == "true") {
            holder.forEach(removeBtn => { 
                removeBtn.style.display = "none"
            })

            if (document.getElementById("download")){
                document.getElementById("download").remove()
            }

            document.getElementById("download-holder").style.display = "flex"

            let download = document.createElement('a')
            download.id = "download"
            download.innerHTML = "This games file was to big to host. So you have to download it play it(click me to download it)"
            if (link == "fnaf2.html") {
                download.href = "https://drive.google.com/file/d/1tmmhUDU0_GFjtagrRxWL3Oa7kEy4rsX2/view?usp=sharing"
            }
            if (link == "fnaf3.html") {
                download.href = "https://drive.google.com/file/d/1oKIxAolpAysCZFaCimhJa3XWN7OEKo_7/view?usp=sharing"
            }
            if (link == "fnaf4.html") {
                download.href = "https://drive.google.com/file/d/1PnwqWPRiX1cL7KnBi9HvSyhJ4yrpw5NL/view?usp=sharing"
            }

            document.getElementById("download-holder").appendChild(download)
        } else {
            page234242.style.display = "flex"
            games_played = games_played + 1;

            if (!r) {
                frame.src = "https://"+link;
            } else {
                frame.src = link
            }
    
            holder.forEach(removeBtn => { 
                removeBtn.style.display = "none"
            })
    
            document.getElementById("bottom-settings").style.display = "flex"

            document.getElementById("fullscreen").onclick = function(){
                fullscreen()
            }

            document.getElementById("home").onclick = function(){
                destroy_frame()
            }

            page234242.appendChild(frame)
            iframe_created = true; 
        }
    }
}

function check(){
    games.map(function(vrf){
        if (vrf.viewed_on == current_page) {
            document.getElementById(vrf.gamename).style.display = "flex"
        } else {
            document.getElementById(vrf.gamename).style.display = "none"
        }
    })
}

function destroy_frame(){
    let gameButton = document.querySelectorAll(".game-button")
    let holder = document.querySelectorAll(".holder")
    check()

    if (iframe_created == true) {
        //headerContainer.style.visibility= "visible";

        document.getElementById("bottom-settings").style.display = "none"
        frame.remove();
        iframe_created = false;

        if (document.getElementById("download")){
            document.getElementById("download").remove()
        }
    }
}
// end of iframe

let count = 0

function u(i){
    i.viewed_on = pageIndex

    // div create
    let div = document.createElement("div")
    div.id = i.gamename
    div.classList.add("holder")
    let div_game_name = document.createElement("button")
    div_game_name.innerHTML = i.gamename
    div_game_name.classList.add("game-button")
    //

    div_game_name.onclick = function() {
        create_iframe(i.link,i.hardcoded)
    };

    // create game image
    let image = document.createElement("img")
    image.classList.add("game-image")
    image.src = i.gameIMG
    div.appendChild(image)
    div.appendChild(div_game_name)
    document.getElementById("pg"+current_page).appendChild(div)
    games_created += 1

    image.onclick = function(){
        create_iframe(i.link,i.hardcoded)
    }
    //

    count++
    document.getElementById("games-count").innerHTML = count+" Games Available"

    // hide the div its not on the right page
    if (i.viewed_on != current_page) {
        div.style.display = "none"
    }

    // checks if games are more than 25 if it is then makes a new page
    if (games_created > 25){
        pages += 1
        pageIndex += 1
        games_created = 0
    }
}

// go home
document.getElementById("title").onclick = function(){
    destroy_frame()

    if (document.getElementById("download")) {
        document.getElementById("download").remove()
    }
}

// change to fun tools
function change_doct(){
    window.location.href = "fun/fun.html"
}

// change page positive
document.getElementById("nextPage").addEventListener("click", function() {
    if (current_page != all_pages) {
        change_page("+")
    }
});

// change page negative
document.getElementById("previousPage").addEventListener("click", function() {
    if (current_page > 1) {
        change_page("-")
    }
});

// create all games from const
games.map(function(i){
    u(i)
})

// visit counter with ':'
window.addEventListener('keydown', function (e) {
    if (e.key == ":") {
        window.location.href = "visitcounter.html"
    }
}, false);

// if page is equal to one find page 1 and set it to visible
if (current_page == 1) {
    document.getElementById("pg"+current_page).style.display = "flex"
}
