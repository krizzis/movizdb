raiting = document.getElementById("raiting_score");
bar = document.querySelector('.progress-bar');
mark = document.querySelector('.raiting_mark');

raiting.oninput = function () {
    if (this.value > 100) {
        this.value = 100; 
    }

    var ratingValue = this.value;
    setMark(ratingValue);
    
}

function setColor(fm, sl, sm) {
    bar.style.setProperty("--fm", fm);
    bar.style.setProperty("--sl", sl);
    bar.style.setProperty("--sm", sm);
}

function setMark(val) {
    val < 20 ? bar.style.width = "20%" : bar.style.width = val + "%";
    if (val <= 20) {
        mark.innerHTML = "Bad";
        setColor(0, 240, 60)
    }
    else if (val < 40) {
        mark.innerHTML = "Poor";
        setColor(60, 240, 120)
    }
    else if (val <= 60) {
        mark.innerHTML = "Fair";
        setColor(120, 240, 240)
    }
    else if (val <= 80) {
        mark.innerHTML = "Good";
        setColor(180, 120, 240)
    }
    else {
        mark.innerHTML = "Excellent";
        setColor(240, 0, 240)
    }
}