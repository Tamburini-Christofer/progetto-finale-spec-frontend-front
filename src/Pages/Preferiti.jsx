import { useState } from "react";
import { usePreferiti } from "../Assets/context/PreferitiContext";
import CardDettagli from "../Components/CardDettagli";
import filmsDatabase from "../../progetto-finale-spec-frontend-back/database/films.json";

export default function Preferiti() {
  const { preferiti, togglePreferiti, svuotaPreferiti, isPreferito } = usePreferiti();
  const [confronto, setConfronto] = useState([]);

  const soloPreferiti = filmsDatabase.filter((f) => isPreferito(f.title));

  const toggleConfronto = (film) => {
    setConfronto((prev) => {
      const esiste = prev.find((f) => f.title === film.title);
      if (esiste) return prev.filter((f) => f.title !== film.title);
      if (prev.length >= 4) {
        alert("Puoi confrontare massimo 4 film");
        return prev;
      }
      return [...prev, film];
    });
  };

  const getFilmDettaglio = (film) => {
    const filmDb = filmsDatabase.find(f => f.title === film.title);

    const formatValuta = (val) => {
      return new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(Number(val));
    };

    const budgetFormattato = formatValuta(filmDb.budget);
    const incassoFormattato = formatValuta(filmDb.box_office);

    return { budgetFormattato, incassoFormattato };
  };

  return (
    <div className="contenitorePreferiti">
      {soloPreferiti.length === 0 ? (
        <div className="empty">
          <h2>Nessun preferito</h2>
        </div>
      ) : (
        <>
          <div className="tabPreferiti">
            {soloPreferiti.map((film) => (
              <div className="preferiti" key={film.title}>
                <div>
                  <h1 className="titleCard">{film.title}</h1>
                  <div className="categoryCard">{film.category}</div>
                </div>

                <div className="contBtnPref">
                  <button className={confronto.find((f) => f.title === film.title) ? "btnPref btnPreConf" : "btnPref"} onClick={() => toggleConfronto(film)}>
                    Confronta
                  </button>
                  <button className="btnPref rimuovi" onClick={() => togglePreferiti(film.title)}>
                    Rimuovi
                  </button>
                </div>
              </div>
            ))}
          </div>

          {confronto.length > 0 && (
            <div className="areaConfronto">
              <div className="gridConfronto">
                {confronto.map((film) => {
                  const {
                    budgetFormattato,
                    incassoFormattato
                  } = getFilmDettaglio(film);

                  return (
                    <CardDettagli
                      mini={true}
                      key={film.title}
                      film={film}
                      budgetFormattato={budgetFormattato}
                      incassoFormattato={incassoFormattato}
                      metascore={film.metascore}
                      director={film.director}
                      country={film.country}
                      year={film.year}
                    />
                  );
                })}
              </div>
            </div>
          )}

          <button className="resetBtn" disabled={preferiti.length === 0} onClick={svuotaPreferiti}>
            Svuota preferiti
          </button>
        </>
      )}
    </div>
  );
}
