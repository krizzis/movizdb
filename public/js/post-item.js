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
    var data = new FormData();


    data.append("title", title.value);
    data.append("slogan", slogan.value);
    data.append("imageUrl", poster_image);

    var genres_items = []
    for (var i = 0; i < genres.childNodes.length; i++) {
        let genre = genres.childNodes[i];
        if (genre.className === 'genre'){
            genres_items.push(genre.childNodes[0].textContent);
        }
    }

    data.append("genres", genres_items);
    data.append("rating", raiting.value);
    data.append("description", description.value);
    data.append("status", status_field.options[status_field.selectedIndex].value);
    data.append("release_date", release_date.value);
    data.append("language", language.options[status_field.selectedIndex].value);
    data.append("duration", duration.value);
    data.append("budget", budget.value);
    data.append("revenue", revenue.value);
    console.log();
    
    

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'admin/', true);
    xhr.send(data);
}