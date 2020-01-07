var close_btn = document.querySelector(".close__button");
var add_btn = document.querySelector(".add__button");
var popup = document.querySelector(".popup");
var popupForm = document.querySelector(".popup__form");
var poster = document.querySelector(".poster");
var input = document.querySelector(".url__input");
var poster_text = document.querySelector(".poster p");
var poster_image = "";

var url_error = document.getElementById('url_error');

var imageSet = false;

close_btn.onclick = function () {
    closePopup();
}

poster.onclick = function(){
    if (!imageSet) {
        popup.style.visibility = "visible";
        popup.style.opacity = .7;
        popupForm.style.visibility = "visible";
        popupForm.style.opacity = 1;
        input.value = "";
        url_error.innerHTML = "";
    }
    else {
        poster.style.backgroundImage  = "";
        imageSet = false;
        poster_image = "";
        poster_text.textContent = 'Click to add';
        poster_text.style.color = 'black';
    }
}

add_btn.onclick = function(){
    if (input.value !== ''){
        var fileType = input.value.slice(-3);
        if (fileType == "png" || fileType == "jpg" ) {
            if (imageExists(input.value)) {
                poster_image = input.value;
                poster.style.backgroundImage  = "url('" + poster_image + "')";
                closePopup();
                poster_text.textContent = 'Click to remove';
                poster_text.style.fontWeight = "900";
                imageSet = true;
            }
            else {
                url_error.innerHTML = "Image is not found"
            }
        }
        else {
            url_error.innerHTML = "Unsupported file type. Use link to PNG or JPG only";
        }
    }
    else {
        url_error.innerText = "Field is required";
    }
}

input.oninput = function() {
    input.value !== "" ? url_error.innerHTML = "" : url_error.innerText = "Field is required";

    
}

function closePopup () {
    popup.style.visibility = "hidden";
    popup.style.opacity = 0;
    popupForm.style.visibility = "hidden";
    popupForm.style.opacity = 0;
}

function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}