
class OMDBClient {
    constructor(url, api_key) {
        this.url = url;
        this.api_key = api_key;
        this.state = {};
        this.content;
    }

    render_search(data) {
        document.querySelector("#main").innerHTML = data
                .map(movie=> this.render_data_to_dom(movie))
                .join(" ")//data-arrayinin icindeki vergulleri goturecek ve html de gorunmeyecek;
        
        
    }
    render_data_to_dom = (element) => {
        return `<div class="col-md-6 py-4">
                    <h4>Title:  <small> "${element.Title}"</small></h4>
                    <h4>Year: <small>"${element.Year}" </small></h3>
                    <h4>imdbID: <small id = "imdbID">"${element.imdbID}" </small></h4>
                    <h6 class = "plot" data-id="${element.imdbID}">Read Plot: </h6>
                </div>
                <div class="col-md-6 py-4">
                    <img src="${element.Poster}" alt="Responsive image"/>
                </div>`
    }
        

    search(keyword) {
        let url = `${this.url}/?apikey=${this.api_key}&s=${keyword}`;
        
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                if(data.Response === 'True') {
                    this.state.search_results = data.Search;
                    this.render_search(this.state.search_results);
                    searches.push(keyword);
                } else {
                    alert("Failed to load data"); 
                }
            }).catch(err => console.log(err.message));
    }
    /*moviesStorage(keyword){
        
            localStorage.setItem(keyword, JSON.stringify(state.search_results));
       
        }
        */

    get_by_id(id) {
        let url = `${this.url}/?apikey=${this.api_key}&i=${id}`;
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                if(data.Response === 'True') {
                    this.state.movie_data = data;
                    this.content = this.state.movie_data.Plot;
                    
                } else {
                    alert("Failed to load data"); 
                }
            }).catch(err => console.log(err.message));
    }       



}