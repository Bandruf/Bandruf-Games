var uid = Math.random(1,99999999999999999)
console.log("Not LS : "+uid);

let account_created = false;

if (localStorage.getItem("id") == null) {
    if (uid != owner_id || uid != own_2) {
        localStorage.setItem('id',uid)
    }
} else {
    uid = localStorage.getItem('id')
    console.log("LS + "+localStorage.getItem('id'))
}

let name = "unknown";

let owner_id = "0.57390481321237856"
let own_2 = "25011866414268670537369604664111537365853151724"

let t = document.querySelector(".headerContainer");
let y = document.querySelector("#games")
let h = document.querySelectorAll(".holder")

// admin stuff
if (localStorage.getItem('id') == owner_id || localStorage.getItem('id') == own_2) {
    document.title = "Bandruf"
    document.getElementById("create_button").style.display = "none"
    setTimeout(document.getElementById("title").innerHTML = "Welcome Back : Bandruf", 1500);
}
//

function change_title(){
    let name_ls = window.localStorage.getItem("name")
    console.log("fired")
    console.log(name_ls)
    console.log(owner_id)
    console.log(owner_id)
    if (name_ls == null) {
        document.getElementById("title").innerHTML = "Bandruf Games"
    } else {
        if (name_ls != null) {
            document.getElementById("title").innerHTML = "Welcome : "+name_ls
            document.getElementById("create_button").style.display = "none"

               // log to discord
    console.log("send request")
    var request = new XMLHttpRequest();
    const Hook = "https://discord.com/api/webhooks/926563998139297803/wCCp1Gt7iGgXvfSWm-Msxp05UY4XniLHbAvlCen8h5RAGDMJA07IufmJjdIGGFa67IiX";

    var request = new XMLHttpRequest();
    request.open("POST", Hook);
    request.setRequestHeader('Content-type', 'application/json');
    var params = {
        username: "UID Logger",
        embeds: [
            { "color": 7506394, // Decimal Color [ Blue ]
            "title": "New Login, Name = "+localStorage.getItem("name"),
            "description": "UID : "+local_uid
            }]
                }
                request.send(JSON.stringify(params));
            //
        }
    }
}

function show_items(){
    document.getElementById("create_button").style.display = "none"
    document.getElementById("username-frame").style.display = "none"
    document.getElementById("games").style.display = "flex"

    h.forEach(rb => { 
        rb.style.display = "flex"
    })
}

function set_name_5(i){
    console.log("make fired")
    name = i
    window.localStorage.setItem('name', i);
    console.log(localStorage.getItem('name'))
    show_items()
    change_title()
}

function create_account(){
    if (!account_created == true) {
        h.forEach(rb => { 
            rb.style.display = "none"
        })
        document.getElementById("title").innerHTML = "Create Account"
        document.getElementById("create_button").style.display = "none"
        document.getElementById("username-frame").style.display = "flex"
        document.getElementById("games").style.display = "none"
    } else {
        // do nothing
    }
}

let debug = false

window.addEventListener('keydown', function (e) {
    if (e.key == "|") {
        debug = true
        this.document.write("user info")
        this.document.write(" |     user id : "+uid)
    
        if (localStorage.getItem('id') == owner_id || localStorage.getItem('id') == own_2) {
            this.document.write(" | Rank : Creator")
        } else {
            this.document.write("| Rank : User")
        }
    }
}, false);

//localStorage.clear()
change_title()