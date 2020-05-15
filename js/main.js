let url = "http://www.omdbapi.com/";
let api_key = "ffe4a75e";

/*let last_searches = localStorage.getItem("last-searches");
if (last_searches == undefined) {
   last_searches = [];
} else {
   last_searches = last_searches.split(",");
}
*/
let searches = [];



let client = new OMDBClient(url, api_key);



function lastSearch(){
        
        let lastValue = searches[searches.length-1];
        let last_searches = window.localStorage.setItem("lastKey", lastValue);
        let last_movies = window.localStorage.getItem("lastKey");
        let last_movie_obj = JSON.parse(last_movies);

        document.querySelector("#main").innerHTML = last_movie_obj
                .map(element=>{ 
                return `<div class="col-md-6 py-4">
                    <h4>Title:  <small> "${element.Title}"</small></h4>
                    <h4>Year: <small>"${element.Year}" </small></h3>
                    <h4>imdbID: <small id = "imdbID">"${element.imdbID}" </small></h4>
                    <h6 class = "plot" data-id="${element.imdbID}">Read Plot: </h6>
                </div>
                <div class="col-md-6 py-4">
                    <img src="${element.Poster}" alt="Responsive image"/>
                </div>`
                } )
                .join(" ")//data-arrayinin icindeki vergulleri goturecek ve html de gorunmeyecek;
    
    
      
}

document.querySelector("#input").addEventListener("keypress", (e) => {
    let keyword = e.target.value;

    
    if(e.keyCode === 13){
    
        client.search(keyword);
        localStorage.setItem(keyword, JSON.stringify(client.state.search_results));
        //client.moviesStorage(keyword);
        
    }
});

document.addEventListener('click', function(e){
    if(e.target.className == "plot"){
        let imdbID = e.target.dataset.id;
            client.get_by_id(imdbID);
            e.target.innerText = client.content;
            e.target.style.backgroundColor = "whitesmoke";       
       
            }
        }
)



window.onload= lastSearch();


