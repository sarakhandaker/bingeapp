const form = document.getElementsByClassName("input-group")[0]
const myshowbtn= document.getElementById("my-shows")
const parent = document.getElementById("show")
const searchResults = document.getElementsByClassName("div search-result")[0]

myshowbtn.addEventListener("click", event => showUserShows())
form.addEventListener("submit", event => handleSearch(event))

showUserShows()

//handles the search bar input
function handleSearch(e) {
  e.preventDefault()
  fetch(`http://api.tvmaze.com/search/shows?q=${e.target.title.value}`)
  .then(resp => resp.json())
  .then(resp=> showTitles(resp))
}

function showTitles(titles){
  parent.innerText = ""
  titles.forEach( title =>{
      // let li=document.createElement('li')
      // li.innerText=`${title.show.name}- ${title.show.premiered.slice(0,4)}`
      // searchResults.appendChild(li)
      makeCard(title)
  }
  )
}

//--------TO DO------------
//HANDLE CASE OF NO IMAGE AVAILABLE
//FILL IN SHOW DATA
//CONFIRM POPULATION OF CSS ELEMENTS
function makeCard(title) {
let card = document.createElement('div')
card.className = "col-md-4 card-tvshow"
card.innerHTML =
  `<div class="container-fluid">
    <div class="row">
      <div class="col-sm-12 cardimage">
        <img src="${title.show.image.original}" alt="">
      </div>
      <div class="container information-box">
        <div class="row">
      
      <div class="col-sm-6 information-left">
        <h3>${title.show.name}</h3>
        <h6>${title.show.network.name} - ${title.show.premiered}</h6>
        <img src="img\seo-and-web.png" alt="">
        <h6>18555</h6>
      </div>
      <div class="col-sm-6 information-right">
        <div class="follow">
          <a href="#">
            <img src="img\plus.png" alt="">
          </a>
        </div>
      
      <div class="information-button">
        <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
          <img src="img\Information.png" alt="">
        </a>  
      </div>
        
      </div>
    </div>
  </div>`

  parent.appendChild(card)
  card.addEventListener('click', event => handleFollow(event, title.show))
}

//TO DO
//change user_id from 1 to current user
function handleFollow(e,object){ 
  console.log(object)
  let data ={ "user_id": 1,
                  "api_id": object.id,
                  "title": object.name
                  }
      fetch('http://localhost:8008/user_shows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        showUserShows()
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      
}

//send a user eventually...
function showUserShows() {
  parent.innerText = ""
  fetch('http://localhost:8008/user_shows/1')
  .then(resp=> resp.json())
  .then(resp=>resp.shows.forEach(show => getAPIshow(show)))
}

function getAPIshow(show){
  fetch(`http://api.tvmaze.com/shows/${show.api_id}`)
  .then(resp => resp.json())
  .then(resp=> makeusercards(resp))
}

function makeusercards(title){
  let card = document.createElement('div')
card.className = "col-md-4 card-tvshow"
card.innerHTML =
  `<div class="container-fluid">
    <div class="row">
      <div class="col-sm-12 cardimage">
        <img src="${title.image.original}" alt="">
      </div>
      <div class="container information-box">
        <div class="row">
      
      <div class="col-sm-6 information-left">
        <h3>${title.name}</h3>
        <h6>${title.network.name} - ${title.premiered}</h6>
        <img src="img\seo-and-web.png" alt="">
        <h6>18555</h6>
      </div>
      <div class="col-sm-6 information-right">
      
      <div class="information-button">
        <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
          <img src="img\Information.png" alt="">
        </a>  
      </div>
        
      </div>
    </div>
  </div>`

  parent.appendChild(card)
  card.addEventListener('click', event => handleDelete(event, title))
}

function handleDelete(event, object) {
  console.log("delete?")
}