const loadOne = async () => {
    let series = [];
    try {
       const res = await fetch(`https://api.jikan.moe/v4/anime/${JSON.parse(localStorage.detail)}`);
      const data = await res.json();
      series = data.data;
    } catch (e) {
      console.log("ERROR!!!", e);
    }
    return series;
}; 


let anim = loadOne().then(result => {
  anim = result;

  const card = document.querySelector("#anime-header");
  let titulo = document.querySelector("#anime-title");

  if(anim.title_english == null){
    titulo.innerText = anim.title;
  }else{
    titulo.innerText = anim.title_english;
  }

  card.querySelector("#anime-score").innerText = anim.score;
  card.querySelector("#anime-type").innerText = anim.type;
  card.querySelector("#anime-episodes").innerText = anim.episodes;
  card.querySelector("#anime-rating").innerText = anim.rating;
  card.querySelector("#anime-poster").src = `${anim.images.webp.image_url}`;
  const estado = card.querySelector("#anime-status");
  
  document.querySelector("#anime-sinop").innerText = anim.synopsis;
  if(series.airing == false){
    estado.style.color = "red"; 
    estado.style.fontWeight = "bold";
  }
});



// const loadOne = async () => {
//     let series = [];
//     try {
//        const res = await fetch(`https://api.jikan.moe/v4/anime/${JSON.parse(localStorage.detail)}`);
//       const data = await res.json();
//       series = data;
//     } catch (e) {
//       console.log("ERROR!!!", e);
//     }
//     return series;
// }; 


// let anim = loadOne().then(result => {
//   anim = result;

//   const card = document.getElementById("anime-container")
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
// });