var add_button = document.querySelector(".add_genre");
var genres = document.querySelector(".genres");

add_button.onclick = function() {
    var newItem = document.createElement("div");
    newItem.className = "genre";
    var newSpan = document.createElement("span");
    newSpan.setAttribute("contenteditable", "true");
    newSpan.setAttribute("onblur", "checkSpan(event)");
    newItem.appendChild(newSpan);
    genres.insertBefore(newItem, add_button);

    setTimeout(setFocus, 100, newSpan);
}


function setFocus (el) {
    el.focus();
}

function checkSpan(event) {
    var span = event.srcElement;
    if (span.innerHTML == "") {
        span.parentElement.remove();
    }
}