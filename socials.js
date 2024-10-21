var d = new Date();
var n = d.getMonth();
n++;

if (n == 10) {
    document.getElementById("wave").style.top = "0";
    document.getElementById("wave").style.right = "0";
}

var pet = new eSheep();
pet.Start();

var dt;
setInterval(camTimer, 60000);
camTimer();

function camTimer() {
    dt = new Date;
    document.getElementById("cam").src = 'cam/cam_' + ('00' + ((Math.floor(dt.getTime() / 60000) % 446) + 1)).slice(-3) + '.jpg';
}


function article_title(t) {
    if (t !== undefined) { document.getElementById("article_title").innerHTML = t; }
    else { document.getElementById("article_title").innerHTML = "Latest Articles"; }
}

function dopeswim() {
    if (document.getElementById("dopefish").style.right == "0px" || document.getElementById("dopefish").style.right == "") {
        document.getElementById("dopefish").style.right = (document.getElementById("games").offsetWidth - 200) + "px";
        document.getElementById("dopefish").style.transform = "scaleX(-1)";
    } else {
        document.getElementById("dopefish").style.right = "0px";
        document.getElementById("dopefish").style.transform = "scaleX(1)";
    }
}

var game_els = document.getElementsByClassName("games_monster");
var games_timeout = [];
var games_count = 0;
[].forEach.call(game_els, function (el) {
    games_timeout[games_count] = setTimeout(function () { games_walk(el, games_count); }, Math.floor(Math.random() * 2000) + 1000);
    games_count++;
});

function games_walk(el, c) {
    el.children[0].src = 'images/games/' + el.id + '_walk.gif';
    var old_left = el.style.left.substr(0, el.style.left.length - 2);
    var new_left = Math.floor(Math.random() * (el.offsetParent.offsetWidth - el.offsetWidth));
    var new_bot = Math.floor(Math.random() * (el.offsetParent.offsetHeight - el.offsetHeight));
    var new_coef = 1.3 - (new_bot / (el.offsetParent.offsetHeight - el.offsetHeight) / 2);
    if (old_left > new_left) { el.children[0].style.transform = "scaleX(1)" } else { el.children[0].style.transform = "scaleX(-1)" }
    el.style.transform = "scale(" + new_coef + "," + new_coef + ")"
    el.style.left = new_left + 'px';
    el.style.bottom = new_bot + 'px';
    games_timeout[c] = setTimeout(function () { games_idle(el, c); }, 2000);
}

function games_idle(el, c) {
    el.children[0].src = 'images/games/' + el.id + '_idle.gif';
    games_timeout[c] = setTimeout(function () { games_walk(el, c); }, 2000);
}

function games_dead(elem) {
    var el = document.getElementById(elem);
    el.children[0].src = 'images/games/' + el.id + '_dead.gif?' + Math.random();
    setTimeout(function () { document.location.href = 'games_' + elem + '.html'; }, 500);

}

var demon_click = 1;

function invert() {
    if (demon_click % 2 == 1) {
        if (demon_click % 22 == 1) {
            document.body.style.filter = "invert(100%)";
        } else if (demon_click % 22 == 3) {
            document.body.style.filter = "blur(2px)";
        } else if (demon_click % 22 == 5) {
            document.body.style.filter = "brightness(500%)";
        } else if (demon_click % 22 == 7) {
            document.body.style.filter = "hue-rotate(270deg)";
        } else if (demon_click % 22 == 9) {
            document.body.style.filter = "grayscale(100%)";
        } else if (demon_click % 22 == 11) {
            document.body.style.filter = "contrast(1000%)";
        } else if (demon_click % 22 == 13) {
            document.body.style.filter = "hue-rotate(90deg)";
        } else if (demon_click % 22 == 15) {
            document.body.style.filter = "sepia(90%)";
        } else if (demon_click % 22 == 17) {
            document.body.style.filter = "hue-rotate(180deg)";
        } else if (demon_click % 22 == 19) {
            document.body.style.filter = "saturate(.1)";
        } else if (demon_click % 22 == 21) {
            document.body.style.filter = "saturate(6)";
        }
    } else {
        document.body.style.filter = "unset";
    }
    console.log(demon_click % 21);
    demon_click++;
}

$(document).ready(function () {
    $("#stubs").lightSlider({
        item: 6,
        auto: true,
        loop: true,
        slideMargin: 10,
        speed: 400,
        pause: 3000,

        pauseOnHover: true,
        enableTouch: true,
        enableDrag: true,
        freeMove: true,

        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    item: 5
                }
            },
            {
                breakpoint: 890,
                settings: {
                    item: 4
                }
            },
            {
                breakpoint: 740,
                settings: {
                    item: 3
                }
            },
            {
                breakpoint: 500,
                settings: {
                    item: 2,
                    slideMargin: 0,
                    pause: 6000
                }
            }
        ]
    });
});

var els = document.getElementsByClassName("icon");
[].forEach.call(els, function (el) {
    dragElement(el);
});


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var x_min, x_max, y_min, y_max;

    elmnt.onmousedown = dragMouseDown;



    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();


        //document.getElementById("hint").innerHTML = document.getElementById("hint").innerHTML+elmnt.offsetParent+x_min+" "+x_max+" "+y_min+" "+y_max+"<br/>";

        x_min = 25,
            x_max = elmnt.offsetParent.offsetHeight - 8;
        y_min = 0,
            y_max = elmnt.offsetParent.offsetWidth - 8;

        //	x_max = x_max + 60;

        x_max = x_max - elmnt.offsetHeight;
        y_max = y_max - elmnt.offsetWidth;

        //document.getElementById("hint").innerHTML = document.getElementById("hint").innerHTML+elmnt.offsetParent+x_min+" "+x_max+" "+y_min+" "+y_max+"<br/>";

        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        if (elmnt.offsetTop - pos2 > x_min && elmnt.offsetTop - pos2 < x_max) {
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        }
        if (elmnt.offsetLeft - pos1 > y_min && elmnt.offsetLeft - pos1 < y_max) {
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
        //document.getElementById("hint").innerHTML = x_max+" "+elmnt.offsetTop+" "+y_max+" "+elmnt.offsetLeft;
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }

}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        //document.getElementById("hitcount").innerHTML = this.responseText;
        var site_data = JSON.parse(this.responseText);
        var num_arr = site_data.info.hits.toString().split("");
        var num_img = "";
        for (i = 0; i < num_arr.length; i++) {
            num_img += `<img src="images/c` + num_arr[i] + `.gif"/>`;
            if ((num_arr.length - 1 - i) % 3 == 0 && (num_arr.length - 1 - i) != 0) { num_img += ","; }
        }
        document.getElementById("hitcount").innerHTML = num_img;
        var date_obj = new Date(site_data.info.last_updated);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        document.getElementById("lastupdate").innerHTML = days[date_obj.getDay()] + " " + months[date_obj.getMonth()] + " " + date_obj.getDate() + ", " + date_obj.getFullYear();
    }
};
xhttp.open("GET", "https://weirdscifi.ratiosemper.com/neocities.php?sitename=dann", true);
xhttp.send();
