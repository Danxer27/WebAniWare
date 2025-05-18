let currentIds = [];

const loadAnimes = async () => {
    let series = [];
    try {
      const res = await fetch("https://api.jikan.moe/v4/seasons/now");
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

    const cardsMenu = document.querySelector('#cardsMenu');
    const cards = cardsMenu.querySelectorAll('.card');
    
    for (let i = 0; i < series.length; i++) {
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
      //card.getElementById("details").onclick = `one(${series[i].mal_id})`;
      //card.getElementById("details").element = `${series[i].mal_id}`;
      currentIds.push(series[i].mal_id);
    }
});


function crearTarjetaVacia(i) {
  const col = document.createElement('div');
  col.className = 'col';

  col.innerHTML = `
      <div class="card" id="${i}">
      <img src="logo.png" class="card-img-top" alt="...">
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

// ID 
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



// FILTRADO POR GENERO
async function filterGenre(genre) {

// vaciando todas las cards que hay
const contenedor = document.getElementById('sub-container');
contenedor.innerHTML = '';

 const seriesGenred = series
    .filter(anime => anime.rating === "PG-13 - Teens 13 or older")
    .filter(anime => Array.isArray(anime.genres) && anime.genres.some(g => g.name === genre));

  if(seriesGenred.length == 0){
      const voidTitle = document.createElement('h1');
      voidTitle.innerText = "No se encontro ningun anime";
      contenedor.appendChild(voidTitle);
      voidTitle.classList.add("subtitulo");
      return;
  }

  for (let i = 0; i < seriesGenred.length; i++) {
    crearTarjetaVacia();
  }

  const cardsMenu = document.getElementById('cardsMenu');
  const cards = cardsMenu.querySelectorAll('.card');
  
  for (let i = 0; i < seriesGenred.length; i++) {
    card = cards[i];

    let genres = "", title = "";
    for(let j = 0; j < seriesGenred[i].genres.length && j < 5; j++){
      if(j>0){genres += " / "}
      genres += seriesGenred[i].genres[j].name + " ";
    }
    if(seriesGenred[i].title_english == null){
      title = seriesGenred[i].title;
    }else{
      title = seriesGenred[i].title_english;
    }

    card.id = `${i}`;
    card.querySelector(".card-title").innerText = title;
    card.querySelector(".card-text").innerText = genres;
    card.classList.add("bg-custom");
    card.style.backgroundImage = `url('${seriesGenred[i].images.webp.image_url}')`;
}
};

// FILTRADO POR TIPO
async function filterType(type) {

// vaciando todas las cards que hay
const contenedor = document.getElementById('sub-container');
contenedor.innerHTML = '';

 const seriesGenred = series
    .filter(anime => anime.rating === "PG-13 - Teens 13 or older")
    .filter(anime => anime.type === type);

  if(seriesGenred.length == 0){
      const voidTitle = document.createElement('h1');
      voidTitle.innerText = "No se encontro ningun anime";
      contenedor.appendChild(voidTitle);
      voidTitle.classList.add("subtitulo");
      return;
  }

  for (let i = 0; i < seriesGenred.length; i++) {
    crearTarjetaVacia();
  }

  const cardsMenu = document.getElementById('cardsMenu');
  const cards = cardsMenu.querySelectorAll('.card');
  
  for (let i = 0; i < seriesGenred.length; i++) {
    card = cards[i];

    let genres = "", title = "";
    for(let j = 0; j < seriesGenred[i].genres.length && j < 5; j++){
      if(j>0){genres += " / "}
      genres += seriesGenred[i].genres[j].name + " ";
    }
    if(seriesGenred[i].title_english == null){
      title = seriesGenred[i].title;
    }else{
      title = seriesGenred[i].title_english;
    }

    card.id = `${i}`;
    card.querySelector(".card-title").innerText = title;
    card.querySelector(".card-text").innerText = genres;
    card.classList.add("bg-custom");
    card.style.backgroundImage = `url('${seriesGenred[i].images.webp.image_url}')`;
}
};