import { useFilm } from "../Assets/context/FilmsContext";
import { usePreferiti } from "../Assets/context/PreferitiContext";

export default function Preferiti() {
  const { preferiti, togglePreferiti, svuotaPreferiti, isPreferito } = usePreferiti();
  const { films } = useFilm();

  const soloPreferiti = films.filter((f) => isPreferito(f.title));

  return (
    <div className="contenitorePreferiti">
      {soloPreferiti.length === 0 ? (
        <div className="emptyPreferiti">
          <h2>Nessun preferito</h2>
          <p>Aggiungi qualche film ai preferiti per vederli qui.</p>
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
                  <button className="btnPref confronta">Confronta</button>
                  <button
                    className="btnPref rimuovi"
                    onClick={() => togglePreferiti(film.title)}>
                    Rimuovi
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            className="resetBtn"
            disabled={preferiti.length === 0}
            onClick={() => {svuotaPreferiti()}}
          >
            Svuota preferiti
          </button>
        </>
      )}
    </div>
  );
}
