class Serie {
    id = 0;    
    title = "";
    totalEsisodes = 0;
    numSeaons = 0;
    releaseSeason = "";
    malScore = 0;
    sinopsis = "";
    studio = [];
    doblaje = false;
    platforms = "";
    trailerLink = "";
    posterLink = "";
    totalInteractions = 0;
    likeInteraction = 0;
    dislikeInteractions = 0;
    streamingSite = []

    constructor(ida, n, tE, nS, rS, mS, sin, st, dob, pt, tl, pl, SS){
        this.id = ida;
        this.title = n
        this.totalEsisodes = tE;
        this.numSeaons = nS;
        this.releaseSeason = rS;
        this.malScore = mS;
        this.sinopsis = sin;
        this.studio = st;
        this.doblaje = dob;
        this.platforms = pt;
        this.trailerLink = tl;
        this.posterLink = pl;
        this.streamingSite.push(SS);
    };

    getTitle(){
        return this.title;
    }
    getPoster(){
        return this.posterLink;
    }
}


const loadAnimes = async () => {
    let series = [];
    try {
      const res = await fetch("https://api.jikan.moe/v4/anime");
      const data = await res.json();
      const anims = data.data;
      dataAux = anims;

      anims.forEach((ani, index) => {
        const temp_ani = new Serie(
            ani.mal_id,
            ani.title_english,
            ani.episodes,
            0, //num seasons
            `${ani.season} ${ani.yer}`, 
            ani.score,
            ani.sinopsis,
            ani.studios,
            false,
            "",
            ani.trailer.embed_url,
            ani.images.jpg.image_url
        );

        series.push(temp_ani);
      });

    } catch (e) {
      console.log("ERROR!!!", e);
    }
    return series;
  }; 



// anim = new Serie(0, "The emminence in shadow", 32,  2, "Fall", 8.5, "Es un Isekai xd", "Nexus", true, "Netflix", "none", "https://images.justwatch.com/poster/301091057/s718/the-eminence-in-shadow.jpg", "https://www.netflix.com/watch/81642098?source=35");
// anim.posterLink = "https://images.justwatch.com/poster/301091057/s718/the-eminence-in-shadow.jpg";
// anim2 = new Serie(1, "The apothecary Daires", 36, 2, "Fall", 9.1, "Los diarios chidos de la boticaria", "Chido", true, "Crunchyroll", "https://www.youtube.com/watch?v=XYNGkSvFT8c&t=19s", "https://m.media-amazon.com/images/M/MV5BNjAxMmFjZjgtYjM1ZS00NzdmLTliZDktZmIyMzU5YTBlNDBmXkEyXkFqcGc@._V1_.jpg","https://www.crunchyroll.com/es/series/G3KHEVDJ7/the-apothecary-diaries")
// recentSeries = [];

