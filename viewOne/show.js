const aseries = JSON.parse(localStorage.getItem("selectAnime"));

window.onload = () => {
  anim = aseries[num];
  const card = document.getElementById("anime-container");
  const titulo = document.getElementById("anime-title");
  
  if(anim.title_english == null){
    titulo = anim.title;
  }else{
    titulo = anim.title_english;
  }

  card.getElementById("anime-score").innerText = anim.score;
  card.getElementById("anime-type").innerText = anim.type;
  card.getElementById("anime-episodes").innerText = anim.episodes;
  card.getElementById("anime-rating").innerText = anim.rating;
  //const sinopsis = document.getElementById("anime-synopsis");
  card.getElementById("anime-poster").src = `${anim.images.webp.image_url}`;
  
  const estado = card.querySelector("anime-status");
  if(series[num].airing == false){
    estado.style.color = "red"; 
    estado.style.fontWeight = "bold";
  }
}; 


