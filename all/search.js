
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


      card.id = `${i}`;
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

      card.id = `${i}`;
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
              <a onclick="" href="viewOne/anim.html" class="btn btn-primary">Ver detalles</a>
              <a href="#" class="btn btn-info">Agregar a Lista</a>
          </div>
      </div>
  `;
  col.classList.add("bg-custom");
  const contenedor = document.getElementById('sub-container');
  contenedor.appendChild(col);
}



// DE AQUI PARA ABAJO YA NO SE USA



//const listaRecuperada = JSON.parse(localStorage.getItem("miLista"));

async function filterGenre(genre) {
    let result = [];
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?genres=${genre}&limit=16&page=1`);
      const data = await res.json();
        result = data.data;
    } catch (e) {
      console.log("ERROR!!!", e);
    }

  // vaciando todas las cards que hay
  const contenedor = document.getElementById('sub-container');
  contenedor.innerHTML = '';

  // añadiendo el elemento para que todo este acomodado
  // const header = document.createElement('div');
  // header.classList.add("row", "row-cols-1", "row-cols-sm-2", "row-cols-md-3", "row-cols-lg-4", "g-3");
  // contenedor.appendChild(header);
  
  // filtrando las series:
  let seriesGenred = result.filter(anime => anime.rating == "PG-13 - Teens 13 or older");


    if(seriesGenred.length == 0){
        const voidTitle = document.createElement('h1');
        voidTitle.innerText = "No se encontro ningun anime";
        contenedor.appendChild(voidTitle);
        voidTitle.classList.add("subtitulo");
        return;
    }

    // const headertitle = document.createElement('h1');
    // headertitle.classList.add("subtitulo");
    // headertitle.innerText = `Animes Generos`;
    // contenedor.appendChild(headertitle);


    for (let i = 0; i < seriesGenred.length; i++) {
      crearTarjetaVacia(i);
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
      card.classList.add("bg-custom"); //url('${recentSeries[0].getPoster()}')
      card.style.backgroundImage = `url('${seriesGenred[i].images.webp.image_url}')`;
  }
};


