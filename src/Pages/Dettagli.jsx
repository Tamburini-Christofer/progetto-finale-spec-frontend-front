import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import { useFilm } from "../Assets/context/FilmsContext";
import filmsDatabase from "../../progetto-finale-spec-frontend-back/database/films.json";

export default function Dettagli() {
  const { title, id } = useParams();
  const location = useLocation();
  const { films } = useFilm();
  const [filmCompleto, setFilmCompleto] = useState(null);
  const [loadingDettaglio, setLoadingDettaglio] = useState(false);

  const parametroTitolo = decodeURIComponent(title ?? id)
    .trim()
    .toLowerCase();
  const idFilm = new URLSearchParams(location.search).get("id");

  const filmLista = films.find(
    (f) => f.title.trim().toLowerCase() === parametroTitolo,
  );

  const filmDaDatabase = filmsDatabase.find(
    (f) => f.title.trim().toLowerCase() === parametroTitolo,
  );

  useEffect(() => {
    let isMounted = true;

    async function caricaDettaglio() {
      if (!idFilm) {
        if (isMounted) setFilmCompleto(null);
        return;
      }

      setLoadingDettaglio(true);
      try {
        const res = await fetch(`http://localhost:3001/filmses/${idFilm}`);
        const data = await res.json();
        if (isMounted && res.ok) {
          setFilmCompleto(data?.films ?? null);
        }
      } catch {
        if (isMounted) setFilmCompleto(null);
      } finally {
        if (isMounted) setLoadingDettaglio(false);
      }
    }

    caricaDettaglio();
    return () => {
      isMounted = false;
    };
  }, [idFilm]);

  const film = filmCompleto || filmDaDatabase || filmLista;

  if (
    (films.length === 0 && !filmDaDatabase) ||
    (idFilm && loadingDettaglio && !film)
  ) {
    return (
      <div className="contenitoreDettagli">
        <div className="contenutoDettagli">
          <p>Caricamento dettagli film...</p>
        </div>
      </div>
    );
  }

  if (!film) {
    return (
      <div className="contenitoreDettagli">
        <div className="contenutoDettagli">
          <p>Film non trovato</p>
        </div>
      </div>
    );
  }

  const copertina = film.linkImage || film.poster || "";
  const budgetValue = Number(film.budget);
  const boxOfficeValue = Number(film.box_office);
  const valutaFormatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
  const budgetFormattato = Number.isFinite(budgetValue)
    ? valutaFormatter.format(budgetValue)
    : "N/D";
  const incassoFormattato = Number.isFinite(boxOfficeValue)
    ? valutaFormatter.format(boxOfficeValue)
    : "N/D";

  const metaTag = [
    film.year,
    film.category,
    film.runtime ? `${film.runtime} min` : null,
  ].filter(Boolean);

  return (
    <div className="contenitoreDettagli">
      <div
        className="contenutoDettagli"
        style={copertina ? { backgroundImage: `url(${copertina})` } : undefined}
      >
        <div className="overlayDettagli">
          <h1>{film.title}</h1>

          <div className="metaDettagli">
            <div>
              {metaTag.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div>
              <Link to="/"><button className="btnBack">Torna alla Homepage</button></Link>
              <Link to="/lista-film"><button className="btnBack">Torna alla lista film</button></Link>
            </div>
          </div>

          <p className="introDettagli">Regia di {film.director}.</p>

          <div className="testoDettagli">
            <div>
              <p>
                <strong>Genere:</strong> {film.category}
              </p>
              <p>
                <strong>Anno:</strong> {film.year}
              </p>
              <p>
                <strong>Regista:</strong> {film.director}
              </p>
            </div>
            <div>
              <p>
                <strong>Durata:</strong>{" "}
                {film.runtime ? `${film.runtime} min` : "N/D"}
              </p>
              <p>
                <strong>Budget:</strong> {budgetFormattato}
              </p>
              <p>
                <strong>Incasso:</strong> {incassoFormattato}
              </p>
            </div>
            <div>
              <p>
                <strong>Metascore:</strong> {film.metascore}
              </p>
              <p>
                <strong>Paese:</strong> {film.country}
              </p>
              {film.genre && (
                <p>
                  <strong>Genere aggiuntivo:</strong> {film.genre}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
