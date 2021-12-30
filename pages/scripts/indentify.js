var navigator_info = window.navigator;
var screen_info = window.screen;
var uid = navigator_info.mimeTypes.length;
uid += navigator_info.userAgent.replace(/\D+/g, '');
uid += navigator_info.plugins.length;
uid += screen_info.height || '';
uid += screen_info.width || '';
uid += screen_info.pixelDepth || '';
console.log(uid);

window.addEventListener('keydown', function (e) {
    this.document.write("user info")
    this.document.write(" |     user id : "+uid)
}, false);