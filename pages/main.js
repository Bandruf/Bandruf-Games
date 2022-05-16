
import{games} from './games.js'

// varibles
let iframe_created = false;
let pages = 0
let time_on = 0
let all_pages = 5
let current_page = 1
let games_created = 0
let games_played = 0
let current_game = ""
let headerContainer = document.querySelector(".headerContainer");
var frame = document.createElement("iframe");
frame.scrolling = "no"
// end

let pageIndex = 1

document.addEventListener("keydown", function(event) {
    if (event.which == "221") {
        let cmd = prompt("CMD")

        cmds.map(function(i){
            console.log(i)
            if (i.name == cmd) {
                cmd_init(i)
            }
        })
    }
  })

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
        console.log(link)
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
            if (link == "force.html") {
                document.getElementById("download").remove()
                file_it("force.html")
            }
            
            let help = document.createElement('a')
            help.id = "help"
            help.href="https://docs.google.com/document/d/1IcT91NbslhsEM_DF35MW56ak_skqRVmq7FFU1NMNxE4/edit?usp=sharing"
            help.innerHTML = "Click here for help"
            
            document.getElementById("download-holder").appendChild(download)
            document.getElementById("download-holder").appendChild(help)
        } else {
            page234242.style.display = "flex"
            games_played = games_played + 1;

            if (!r) {
                frame.src = "https://"+link;
            }
            
            holder.forEach(removeBtn => { 
                removeBtn.style.display = "none"
            })
            document.getElementById("pg"+current_page).style.display = "none"
    
            document.getElementById("bottom-settings").style.display = "flex"

            document.getElementById("fullscreen").onclick = function(){
                fullscreen()
            }

            document.getElementById("home").onclick = function(){
                destroy_frame()
                document.getElementById("pg"+current_page).style.display = "flex"
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

let disg_vis = false
// tab disguise
document.getElementById("Disguise").onclick = function(){
    if (disg_vis == false) {
        disg_vis = true
        document.getElementById("disg_menu").style.display = "flex"
    } else {
        disg_vis = false
        document.getElementById("disg_menu").style.display = "none"
    }
}

document.getElementById("classroom").onclick = function(){
    if (document.getElementById("disg_menu").style.display = "flex") {
        document.title = "Classes"

        var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = 'images/1200px-Google_Classroom_icon.svg.png';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
}

document.getElementById("drive").onclick = function(){
    if (document.getElementById("disg_menu").style.display = "flex") {
        document.title = "My Drive - Google Drive"

        var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = 'images/860px-Google_Drive_icon_(2020).svg.png';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
}

document.getElementById("tab").onclick = function(){
    if (document.getElementById("disg_menu").style.display = "flex") {
        document.title = "New Tab"

        var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = 'images/google-chrome-icon-256-removebg-preview.png';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
}

document.getElementById("Docs").onclick = function(){
    if (document.getElementById("disg_menu").style.display = "flex") {
        document.title = "Google Docs"

        var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = 'images/76310_doc_256x256.png';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
}
//


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

    let image_div = document.createElement("div")
    image_div.classList.add("image-holder")
    div.appendChild(image_div)

    // create game image
    let image = document.createElement("img")
    image.alt = i.gamename
    image.classList.add("game-image")
    image.src = i.gameIMG
    image_div.appendChild(image)
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
    if (games_created > 23){
        pages += 1
        pageIndex += 1
        games_created = 0
    }
}

document.getElementById("discord").onclick = function(){
    window.location.href = "https://discord.gg/NHpHf5XVQn"
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
function ver(i){
    u(i)
}
games.map(function(i){
    ver(i)
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

