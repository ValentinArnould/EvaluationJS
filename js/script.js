const meme = window.MgApi;
const apiUrl = "http://version1.api.memegenerator.net//";
const apikey = "ee6eea65-524a-4067-8f00-7bfe05e1b150";
var filter = parseInt(document.querySelector('#number').value);
var state = {"search": "memes", "type": "new", "filter": filter};

const mainSearch = document.querySelector('#mainSearch');

mainSearch.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchMemes(mainSearch.value);
    }
});

document.querySelector('#number').addEventListener("change", function(event) {

    if(parseInt(document.querySelector('#number').value) != NaN) {
        filter = parseInt(document.querySelector('#number').value);
        state.filter = filter;
    }
});

const searchClick = function clickOnSearchButton() {
    //debugger;
    searchMemes(mainSearch.value);
}

const searchMemes = function searchMemesApi(input) {
    debugger;
    let request;
    switch (state.search) {
        case "memes":
            request = apiUrl+"Instances_Search?q="+input+"&pageIndex="+state.filter+"&pageSize=25&apiKey="+apikey;
            fetch(request).then(function(response) {
                //debugger;
                return response.json();
            }).then(function(data) {
                //debugger; //utiliser data pour les données
                document.querySelector('#contenu').innerHTML = "";
                data.result.forEach(meme => {
                    addMeme(meme);
                });
            });
            break;

        case "images":
        request = apiUrl+"Generators_Search?q="+input+"&pageIndex=0&pageSize="+state.filter+"&apiKey="+apikey;
        fetch(request).then(function(response) {
            //debugger;
            return response.json();
        }).then(function(data) {
            //debugger; //utiliser data pour les données
            document.querySelector('#contenu').innerHTML = "";
            data.result.forEach(meme => {
                addMeme(meme);
            });
        });
        break;

        default:
            break;
    }
    debugger;
}

const addMeme = function createMemeHtml(meme) {
    html = `<div class="image memeImg" style="background-image:url(${meme.imageUrl}); background-size: cover;">
        <img src="${meme.imageUrl}" style="visibility: hidden;" />
        <p style="position:absolute; top:0; color:white;text-align: center;">${meme.text0}</p>
        <p style="position:absolute; bottom:0; color:white;text-align: center;">${meme.text0}</p>
    </div>`;
    debugger;
    document.querySelector('#contenu').innerHTML += html;
}