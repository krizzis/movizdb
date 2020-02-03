var submit = document.querySelector('.save__button');
var title = document.querySelector('.title');
var slogan = document.querySelector('.slogan__input');
var raiting = document.querySelector('#raiting_score');
var description = document.querySelector('.description');
var status_field = document.querySelector('.status__select');
var release_date = document.querySelector('.release_date__input');
var language = document.querySelector('.language__select');
var duration = document.querySelector('.duration__input');
var budget = document.querySelector('.budget__input');
var revenue = document.querySelector('.revenue__input');

submit.onclick = function() {

    var data = {};

    var genres_items = []
    for (var i = 0; i < genres.childNodes.length; i++) {
        let genre = genres.childNodes[i];
        if (genre.className === 'genre'){
            genres_items.push(genre.childNodes[0].textContent);
        }
    }

    data.title = title.value;
    data.slogan = slogan.value;
    data.imageUrl = poster_image;
    data.genres = genres_items;
    data.rating = raiting.value;
    data.description = description.value;
    data.status = status_field.options[status_field.selectedIndex].value;
    data.release_date = release_date.value === "" ? null : release_date.value;
    data.language = language.options[status_field.selectedIndex].value === "" ? null : language.options[status_field.selectedIndex].value;
    data.duration = duration.value === "" ? null : duration.value;
    data.budget = budget.value === "" ? null : budget.value;
    data.revenue = revenue.value === "" ? null : revenue.value;
    

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'admin/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}