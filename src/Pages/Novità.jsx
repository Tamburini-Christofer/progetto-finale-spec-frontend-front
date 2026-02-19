export default function Novità() {
  const novità = [
    {
      id: 1,
      titolo: "Oscar 2026",
      descrizione:
        "Scopri la notte più magica dell'anno e i favoriti per la statuetta",
      immagine:
        "https://sm.ign.com/t/ign_it/screenshot/default/oscar-2022-le-previsioni-di-cineblog-sui-vincitori-degli-aca_ztdk.2560.png",
      linkRiferimento: "https://www.mymovies.it/festival/oscar/2026/",
    },
    {
      id: 2,
      titolo: "Nuovo trailer di Star Adventure",
      descrizione:
        "Il film sci-fi più atteso dell’anno svela finalmente le prime scene",
      immagine:
        "https://staticgeopop.akamaized.net/wp-content/uploads/sites/32/2023/02/a-chi-appartiene-lo-spazio.jpg",
      linkRiferimento:
        "https://lanuovafantascienza.altervista.org/film-di-fantascienza/film-di-fantascienza-da-vedere/",
    },
    {
      id: 3,
      titolo: "Festival di Cannes 2026",
      descrizione:
        "I film in gara e le star internazionali presenti al festival",
      immagine:
        "https://teatropertutti.it/wp-content/uploads/2022/05/cannes_2019_vincitori_cinefacts-800x496.png",
      linkRiferimento: "https://www.festival-cannes.com/en/",
    },
    {
      id: 4,
      titolo: "Biopic su leggenda del cinema",
      descrizione:
        "La vita e la carriera di un attore iconico raccontata sul grande schermo",
      immagine:
        "https://movieplayer.net-cdn.it/t/images/2019/09/04/keanu-reeves-migliori-film_jpg_1200x0_crop_q85.jpg",
    },
    {
      id: 5,
      titolo: "Cinema e realtà virtuale",
      descrizione:
        "Una nuova esperienza immersiva per gli appassionati di film interattivi",
      immagine: "https://magazine.relatech.com/hubfs/AR%20VR%20industry.jpg",
      linkRiferimento: "https://www.museocinema.it/it/calendario/9056",
    },
  ];

  return (
    <>
      <div className="contenitoreNovità">
        <div className="contTabNovità">
          {novità.map((item) => (
            <a href={item.linkRiferimento} key={item.id}>
              <div key={item.id} className="tabNovità">
                <div>
                  <img
                    className="imgNovità"
                    src={item.immagine}
                    alt={item.titolo}
                  />
                </div>
                <div className="descNovità">
                  <h1>{item.titolo}</h1>
                  <p>{item.descrizione}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
