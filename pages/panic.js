// varibles
let headerContainer2 = document.querySelector(".headerContainer");

let games2 = document.querySelector("#games")

let gameButton2 = document.querySelectorAll(".game-button")

let holder2 = document.querySelectorAll(".holder")

let title = ""
//

//

//

//frame
var fake_frame = document.createElement("iframe");
fake_frame.id = "fake_frame"
fake_frame.frameBorder = "0"
fake_frame.SameSite="None"
//

function panic(){
    document.getElementById("games").style.visibility = "hidden"
    headerContainer2.style.visibility = "hidden"
    document.body.appendChild(fake_frame)
    window.top.document.title = title
}

function set(sent_info,link_sent){
    console.log("started")
    console.log(sent_info)
    console.log(link_sent)
    title = sent_info
    fake_frame.src = link_sent

    headerContainer.style.visibility= "visible";

    holder.forEach(removeBtn => { 
        removeBtn.style.display = "flex"
    })

    document.getElementById("setting-form").style.display = "none"
}

function show(){
    headerContainer.style.visibility= "hidden";

    holder.forEach(removeBtn => { 
        removeBtn.style.display = "none"
    })

    document.getElementById("bottom-settings").style.visibility = "hidden"
    document.getElementById("setting-form").style.display = "flex"
}

console.log(title)