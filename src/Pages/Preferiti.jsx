import { useState } from "react";
import { useFilm } from "../Assets/context/FilmsContext";
import { usePreferiti } from "../Assets/context/PreferitiContext";
import CardDettagli from "../Components/CardDettagli";
import filmsDatabase from "../../progetto-finale-spec-frontend-back/database/films.json";

export default function Preferiti() {
  const { preferiti, togglePreferiti, svuotaPreferiti, isPreferito } = usePreferiti();
  const { films } = useFilm();
  const [confronto, setConfronto] = useState([]);

  const soloPreferiti = films.filter((f) => isPreferito(f.title));

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
      if (!val) return "N/D";
      return new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(Number(val));
    };

    const budgetFormattato = formatValuta(film.budget || (filmDb && filmDb.budget));
    const incassoFormattato = formatValuta(film.box_office || (filmDb && filmDb.box_office));

    const metaTag = [
      film.year || (filmDb && filmDb.year),
      film.category || (filmDb && filmDb.category),
      film.runtime ? `${film.runtime} min` : filmDb?.runtime ? `${filmDb.runtime} min` : null,
    ].filter(Boolean);

    const metascore = film.metascore || (filmDb && filmDb.metascore);
    const director = film.director || (filmDb && filmDb.director);
    const country = film.country || (filmDb && filmDb.country);
    const year = film.year || (filmDb && filmDb.year);
    const runtime = film.runtime || (filmDb && filmDb.runtime);

    return { budgetFormattato, incassoFormattato, metaTag, metascore, director, country, year, runtime };
  };
  // -------------------------------------------------------------------------

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
                  <button className="btnPref confronta" onClick={() => toggleConfronto(film)}>
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
                    incassoFormattato,
                    metaTag,
                    metascore,
                    director,
                    country,
                    year,
                    runtime,
                    
                  } = getFilmDettaglio(film);

                  return (
                    <CardDettagli
                      mini
                      key={film.title}
                      film={film}
                      metaTag={metaTag}
                      budgetFormattato={budgetFormattato}
                      incassoFormattato={incassoFormattato}
                      metascore={metascore}
                      director={director}
                      country={country}
                      year={year}
                      runtime={runtime}
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
