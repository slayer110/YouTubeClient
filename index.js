var but = document.getElementById('but');
var search = document.getElementById('search');
var content = document.getElementsByClassName('content')[0];
var xhr = new XMLHttpRequest();
var elems = content.childNodes;
var pages = document.getElementsByClassName('pages')[0];
var nextPage;

function numberOnPage() {
    var number;

    if (document.body.clientWidth >= 1340) {
        number = 4;
    }
    else if (
        document.body.clientWidth < 1340 && document.body.clientWidth > 1000) {
        number = 3;
    }
    else if (document.body.clientWidth > 687 && document.body.clientWidth < 1000) {
        number = 2;
    }
    else {
        number = 1;
    }
    return number;
}
function numberOfPages() {
    pages.innerHTML = '';
    var left = document.getElementsByClassName('fa-arrow-circle-left ')[0];
    var right = document.getElementsByClassName('fa-arrow-circle-right ')[0];
    left.style.display = 'block';
    right.style.display = 'block';
    for (let i = 0; i < 4; i++) {
        var page = document.createElement('div');
        page.className = 'circle';
        pages.appendChild(page);
    }
    var first = pages.firstChild;
    first.innerText = '1';
    first.style.background = "orange";
}

function clear() {
    var number = numberOnPage();
    elems.forEach(function (elem) {
        elem.style.display = 'none';
    });
}

function start() {
    var number = numberOnPage();
    numberOfPages();
    for (i = 0; i < number; i++) {
        elems[i].style.display = 'block';
    }
}

navSearch = function () {
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
    if (search.value === null || search.value === "") {
        return
    }
    xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCo9PzsaqQqyWVqqGOmjj4TWenlTP9armY&part=snippet&type=video&maxResults=15&q=' + search.value);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let data = JSON.parse(xhr.response);
                nextPage = data.nextPageToken;
                data.items.forEach(function (item) {
                    let picture = document.createElement('div');
                    let signature = document.createElement('div');
                    let signature_author = document.createElement('div');
                    let signature_date = document.createElement('div');
                    signature.className = 'signature';
                    signature_author.className = 'signature_author';
                    signature_date.className = 'signature_date';
                    picture.className = 'view';
                    picture.innerHTML = "<img src=" + item.snippet.thumbnails.medium.url + ">";
                    signature.innerHTML = "<p><a href=https://www.youtube.com/watch?v=" + item.id.videoId + ">" + item.snippet.title + "</a></p>";
                    signature_author.innerHTML = "<p>" + item.snippet.channelTitle + "</p>";
                    signature_date.innerHTML = ("<p>" + item.snippet.publishedAt + "</p>").substring(13, 0);
                    content.appendChild(picture);
                    picture.appendChild(signature);
                    picture.appendChild(signature_author);
                    picture.appendChild(signature_date);
                });
                clear();
                start();
            } else {
                // код при ошибке
            }
        }
    };
    xhr.send();
};
navSlider = function () {
    xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCo9PzsaqQqyWVqqGOmjj4TWenlTP9armY&part=snippet&type=video&maxResults=15&q=' + search.value + '&pageToken=' + nextPage);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.response);
            nextPage = data.nextPageToken;
            data.items.forEach(function (item) {
                let picture = document.createElement('div');
                let signature = document.createElement('div');
                let signature_author = document.createElement('div');
                let signature_date = document.createElement('div');
                signature.className = 'signature';
                signature_author.className = 'signature_author';
                signature_date.className = 'signature_date';
                picture.className = 'view';
                picture.style.display = 'none';
                picture.innerHTML = "<img src=" + item.snippet.thumbnails.medium.url + ">";
                signature.innerHTML = "<p><a href=https://www.youtube.com/watch?v=" + item.id.videoId + ">" + item.snippet.title + "</a></p>";
                signature_author.innerHTML = "<p>" + item.snippet.channelTitle + "</p>";
                signature_date.innerHTML = ("<p>" + item.snippet.publishedAt + "</p>").substring(13, 0);
                content.appendChild(picture);
                picture.appendChild(signature);
                picture.appendChild(signature_author);
                picture.appendChild(signature_date);

            });
        } else {
            // код при ошибке
        }
    };
    xhr.send();
};
window.addEventListener("resize", clear);
window.addEventListener("resize", start);

but.addEventListener("click", navSearch);

function nextPageBottom(arr) {
    var arrPages = [...pages.childNodes];

    let j = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].style.display === 'none') {
            j++;
        } else {
            break;
        }
    }
    let page = Math.ceil(j / 4 + 1);
    let indexPage;
    if (page <= 4) {
        indexPage = page - 1;
    } else {
        indexPage = page % 4 - 1;
    }
    if (indexPage < 0) {
        indexPage = 3;
    }
    if (indexPage === 0) {
        arrPages[3].innerHTML = "";
        arrPages[3].style.background = "";
    } else {
        arrPages[indexPage - 1].innerHTML = "";
        arrPages[indexPage - 1].style.background = "";
    }
    arrPages[indexPage].innerText = page;
    arrPages[indexPage].style.background = 'orange';
}

function prevPageBottom(arr) {
    var arrPages = [...pages.childNodes];
    let j = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].style.display === 'none') {
            j++;
        } else {
            break;
        }
    }
    let page = Math.ceil(j / 4 + 1);
    let indexPage;
    if (page <= 4) {
        indexPage = page - 1;
    } else {
        indexPage = page % 4 - 1;
    }
    if (indexPage < 0) {
        indexPage = 3;
    }
    if (indexPage === 3) {
        arrPages[0].innerHTML = "";
        arrPages[0].style.background = "";
    } else {
        arrPages[indexPage + 1].innerHTML = "";
        arrPages[indexPage + 1].style.background = "";
    }
    arrPages[indexPage].innerText = page;
    arrPages[indexPage].style.background = 'orange';
}

content.addEventListener("wheel", function (e) {
        var arr = [...elems];
        var i = 0;
        if (e.deltaY > 0) {
            navSlider();
            arr.map(function (elem, key, arr) {
                if (elem.style.display == 'block') {
                    if (arr[key + numberOnPage()]) {
                        elem.style.display = 'none';
                        i++;
                    }
                } else if (i > 0 && i <= numberOnPage()) {
                    elem.style.display = 'block';
                    i--;
                }
            });
            nextPageBottom(arr);
        }
        else {
            var arrRev = arr.reverse();
            arrRev.map(function (elem, key, arr) {
                if (elem.style.display == 'block') {
                    if (arr[key + numberOnPage()]) {
                        elem.style.display = 'none';
                        i++;
                    }
                } else if (i > 0 && i <= numberOnPage()) {
                    elem.style.display = 'block';
                    i--;
                }
            });
            prevPageBottom(arr.reverse());
        }
    }
);
var shiftX;
var startX;
var endX;

function moveAt(e) {
    var coords = content.getBoundingClientRect();
    shiftX = e.pageX - coords.left;
    startX = e.pageX;
    var shiftY = e.pageY - coords.top;
    document.addEventListener("mousemove", moveAt1);
    content.addEventListener("mouseup", moveAt2);
}

function moveAt1(e) {
    content.style.left = e.pageX - shiftX + "px";

}

function moveAt2(e) {
    endX = e.pageX;
    document.removeEventListener("mousemove", moveAt1);
    content.removeEventListener("mouseup", moveAt2);
    var arr = [...elems];
    var i = 0;

    if (endX < startX) {
        content.style.left = 0;
        navSlider();
        arr.map(function (elem, key, arr) {
            if (elem.style.display == 'block') {
                if (arr[key + numberOnPage()]) {
                    elem.style.display = 'none';
                    i++;
                }
            } else if (i > 0 && i <= numberOnPage()) {
                elem.style.display = 'block';
                i--;
            }
        });
        nextPageBottom(arr);
    }
    else {
        content.style.left = 0;
        var arrRev = arr.reverse();
        arrRev.map(function (elem, key, arr) {
            if (elem.style.display == 'block') {
                if (arr[key + numberOnPage()]) {
                    elem.style.display = 'none';
                    i++;
                }
            } else if (i > 0 && i <= numberOnPage()) {
                elem.style.display = 'block';
                i--;
            }
        });
        prevPageBottom(arr.reverse());
    }

}

content.addEventListener("mousedown", moveAt);
content.addEventListener("dragstart", function () {
    return false
});
var leftBut = document.getElementsByClassName('fa-arrow-circle-left ')[0];
var rightBut = document.getElementsByClassName('fa-arrow-circle-right ')[0];
rightBut.addEventListener("mouseup", rightClick);
leftBut.addEventListener("mouseup", leftClick);

function rightClick(e) {
    var arr = [...elems];
    var i = 0;
    navSlider();
    arr.map(function (elem, key, arr) {
        if (elem.style.display == 'block') {
            if (arr[key + numberOnPage()]) {
                elem.style.display = 'none';
                i++;
            }
        } else if (i > 0 && i <= numberOnPage()) {
            elem.style.display = 'block';
            i--;
        }
    });
    nextPageBottom(arr);
}

function leftClick(e) {
    var arr = [...elems];
    var i = 0;
    var arrRev = arr.reverse();
    arrRev.map(function (elem, key, arr) {
        if (elem.style.display == 'block') {
            if (arr[key + numberOnPage()]) {
                elem.style.display = 'none';
                i++;
            }
        } else if (i > 0 && i <= numberOnPage()) {
            elem.style.display = 'block';
            i--;
        }
    });
    prevPageBottom(arr.reverse());
}