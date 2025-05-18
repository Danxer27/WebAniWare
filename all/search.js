
const loadAnimes = async () => {
    let series = [];
    try {
      const res = await fetch("https://api.jikan.moe/v4/anime?limit=25&order_by=popularity");
      const data = await res.json();
      series = data.data;
    } catch (e) {
      console.log("ERROR!!!", e);
    }
    return series;
}; 

let series = loadAnimes().then(result => {
    //series = result;
    series = result.filter(anime => anime.rating == "PG-13 - Teens 13 or older");

    //localStorage.setItem("selectAnime", JSON.stringify(anims));

    const cardsMenu = document.getElementById('cardsMenu');
    const cards = cardsMenu.querySelectorAll('.card');
    
    for (let i = 0; i < 20; i++) {
      card = cards[i];

      let genres = "", title = "";
      for(let j = 0; j < series[i].genres.length && j < 5; j++){
        if(j>0){genres += " / "}
        genres += series[i].genres[j].name + " ";
      }
      if(series[i].title_english == null){
        title = series[i].title;
      }else{
        title = series[i].title_english;
      }


      card.id = `${series[i].mal_id}`;
      card.querySelector(".card-title").innerText = title;
      card.querySelector(".card-text").innerText = genres;
      card.classList.add("bg-custom"); //url('${recentSeries[0].getPoster()}')
      card.style.backgroundImage = `url('${series[i].images.webp.image_url}')`; //, linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`;
    }
});

// filtrado

async function filter(filterType, element) {
 let result = [];
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?${filterType}=${element}&limit=16&page=1`);
      const data = await res.json();
        result = data.data;
    } catch (e) {
      console.log("ERROR!!!", e);
    }

    let seriesFiltered = result.filter(anime => anime.rating == "PG-13 - Teens 13 or older");

  // vaciando todas las cards que hay
  const contenedor = document.getElementById('sub-container');
  contenedor.innerHTML = '';
    	
  if(seriesFiltered.length < 1){
        const voidTitle = document.createElement('h1');
        voidTitle.innerText = "No se encontro ningun anime";
        voidTitle.classList.add("subtitulo");
        contenedor.appendChild(voidTitle);
        return;
    }
    

    for (let i = 0; i < seriesFiltered.length; i++) {
      crearTarjetaVacia(i);
    }

    const cardsMenu = document.getElementById('cardsMenu');
    const cards = cardsMenu.querySelectorAll('.card');
    
    for (let i = 0; i < seriesFiltered.length; i++) {
      card = cards[i];

      let genres = "", title = "";
      for(let j = 0; j < seriesFiltered[i].genres.length && j < 5; j++){
        if(j>0){genres += " / "}
        genres += seriesFiltered[i].genres[j].name + " ";
      }
      if(seriesFiltered[i].title_english == null){
        title = seriesFiltered[i].title;
      }else{
        title = seriesFiltered[i].title_english;
      }

      card.id = `${seriesFiltered[i].mal_id}`;
      card.querySelector(".card-title").innerText = title;
      card.querySelector(".card-text").innerText = genres;
      card.classList.add("bg-custom"); //url('${recentSeries[0].getPoster()}')
      card.style.backgroundImage = `url('${seriesFiltered[i].images.webp.image_url}')`;
  }
};


function crearTarjetaVacia(id) {
  const col = document.createElement('div');
  col.className = 'col';

  col.innerHTML = `
      <div class="card" id="card${id}">
      <img src="/logo.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Titulo</h5>
              <p class="card-text">Some quick example text.</p>
              <a onclick="verDetalles(this)" href="/viewOne/anim.html" class="btn btn-primary" id="details">Ver detalles</a>
              <a onclick="addFavorite(this)" class="btn btn-info">Agregar a Favoritos</a>
          </div>
      </div>
  `;
  col.classList.add("bg-custom");
  const contenedor = document.getElementById('sub-container');
  contenedor.appendChild(col);
}

function addFavorite(element) {
  const cardId = element.closest('.card').id;
  
  let favorites = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (!favorites.includes(cardId)) {
    favorites.push(cardId);
  }

  localStorage.setItem("favoritos", JSON.stringify(favorites));
  Swal.fire({
  title: 'Agregado a Favoritos',
  icon: 'success',
  confirmButtonText: 'Aceptar'
});
}


function verDetalles(element) {
  const cardId = element.closest('.card').id;
  localStorage.setItem("detail", cardId);
  window.location.href = "/viewOne/anim.html";
}


window.onload = userLoged();
async function userLoged() {
    const userButton = document.getElementById("userButton");
    try {
        let userName = JSON.parse(localStorage.users).name;
        userButton.innerText = userName;
        userButton.href = "/userMenu/user.html";
    } catch {
        //console.log("USER BUTTON ERROR!");
    }
}