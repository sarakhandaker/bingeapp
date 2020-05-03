let addform = false;
const div=document.querySelector('#showlist')

//ADD SHOW FORM

  const addBtn = document.querySelector("#new-toy-btn");
  const Container = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addform = !addform;
    if (addform) {
      Container.style.display = "block";
    } else {
      Container.style.display = "none";
    }
  })

const form=document.getElementsByClassName("add-show")[0]

form.addEventListener("submit", (e)=> {
    e.preventDefault()
    console.log(e.target.title.value)
    
    fetch(`http://api.tvmaze.com/search/shows?q=${e.target.title.value}`)
    .then(resp => resp.json())
    .then(resp=> showtitles(resp))

    e.target.reset()
})

//SHOW USER SEARCH RESULTS
function showtitles(titles){
    titles.forEach( title =>{
        let li=document.createElement('li')
        li.innerText=`${title.show.name}- ${title.show.premiered.slice(0,4)}`
        div.appendChild(li)
        li.addEventListener('click', (event)=> makeCard(event, title))
    }
    )
}

//MAKE SHOW CARD WHEN ADDED
function makeCard(event, title){
     MakeShowDB(title)
    const TvDiv=document.createElement("div")
    TvDiv.className='card'
    TvDiv.innerHTML= `<h2>${title.show.name}
    </h2> <img src=${title.show.image.medium} class='Toy-avatar' />`
    div.appendChild(TvDiv)
    TvDiv.addEventListener('click', (event)=> showEpisodes(event, title))
  }

//ADD SHOW AND USERSHOW TO DB
   function MakeShowDB(object) {
      let data ={ "user_id": 1,
                  "api_id": object.show.id,
                  "title": object.show.name
                  }
      fetch('http://localhost:3000/user_shows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }

    //SHOW EPISODES WHEN CLICKED ON
    function showEpisodes(event, object){
      fetch(`http://localhost:3000/episodes/${object.show.id}`)
    .then(resp => resp.json())
    .then(resp=> console.log(resp))

    }