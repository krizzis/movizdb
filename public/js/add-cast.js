var add_cast = document.querySelector(".add_card");
var popup = document.querySelector(".popup");
var popupForm_cast = document.querySelector(".popup__form__cast");

console.log(add_cast);

add_cast.onclick = function() {
    popup.style.visibility = "visible";
    popup.style.opacity = .7;
    popupForm_cast.style.visibility = "visible";
    popupForm_cast.style.opacity = 1;
}