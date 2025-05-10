
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

//const listaRecuperada = JSON.parse(localStorage.getItem("miLista"));

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

function crearTarjetaVacia() {
  const col = document.createElement('div');
  col.className = 'col';

  col.innerHTML = `
      <div class="card" id="">
      <img src="logo.png" class="card-img-top" alt="...">
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




// function one(num){
//   anim = series[num];
//   const card = document.getElementById("anime-container");
  
//   const titulo = document.getElementById("anime-title");
//   if(anim.title_english == null){
//     titulo = anim.title;
//   }else{
//     titulo = anim.title_english;
//   }

//   card.getElementById("anime-score").innerText = anim.score;
//   card.getElementById("anime-type").innerText = anim.type;
//   card.getElementById("anime-episodes").innerText = anim.episodes;
//   card.getElementById("anime-rating").innerText = anim.rating;
//   //const sinopsis = document.getElementById("anime-synopsis");
//   card.getElementById("anime-poster").src = `${anim.images.webp.image_url}`;
  
//   const estado = card.querySelector("anime-status");
//   if(series[num].airing == false){
//     estado.style.color = "red"; 
//     estado.style.fontWeight = "bold";
//   }
// }