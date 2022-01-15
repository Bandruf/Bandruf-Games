let downtime = false
let ff = document.querySelectorAll(".holder")
let hh = document.querySelector(".headerContainer")

if (downtime == true) {
    ff.forEach(aa => { 
        console.log(aa)
        aa.style.display = "none"
    })

    hh.style.display= "none";
    document.getElementById("discord-link").style.display = "none"

    let eli = document.createElement("div")
    eli.style.marginRight = "auto"
    eli.style.marginLeft = "auto"
    eli.style.marginBottom = "20%"
    eli.style.backgroundColor = "grey"
    eli.style.width = 50+"%"
    eli.style.height = 50+"vh"
    let txt = document.createElement("b")
    txt.style.marginRight = "auto"
    txt.style.marginLeft = "auto"
    txt.style.width = 100+"%"
    txt.style.height = 5+"vh"
    txt.style.backgroundColor = "transparent"
    txt.innerHTML = "Sorry! There seems to be something wrong with the website please try again soon        |"
    let dis = document.createElement("a")
    dis.href = "https://discord.gg/Q7HRpcMgYd"
    dis.style.marginRight = "auto"
    dis.style.marginLeft = "auto"
    dis.style.width = 100+"%"
    dis.style.height = 5+"vh"
    dis.style.backgroundColor = "transparent"
    dis.innerHTML = "Join The Discord For More Information"
    document.body.appendChild(eli)
    eli.appendChild(txt)
    eli.appendChild(dis)
}