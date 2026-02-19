import { usePreferiti } from "../Assets/context/PreferitiContext";
import { Link } from "react-router-dom";

export default function CardDettagli({
  film,
  mini = false,
  copertina,
  metaTag,
  budgetFormattato,
  incassoFormattato,
}) {
  const { togglePreferiti, isPreferito } = usePreferiti();

  return (
    <div className={`contenitoreDettagli ${mini ? "contenitoreDettagliMini" : ""}`}>
      <div
        className="contenutoDettagli"
        style={copertina ? { backgroundImage: `url(${copertina})` } : undefined}
      >
        <div className="overlayDettagli">
          <h1>{film.title}</h1>

          {!mini && (
            <div className="metaDettagli">
              <div>
                {metaTag.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div>
                <Link to="/">
                  <button className="btnBack">Homepage</button>
                </Link>
                <Link to="/lista-film">
                  <button className="btnBack">Lista film</button>
                </Link>
                <button
                  type="button"
                  className={isPreferito(film.title) ? "btnBackOff" : "btnBack"}
                  onClick={() => togglePreferiti(film.title)}
                >
                  <i className="fa-solid fa-film"></i>
                  <p>{isPreferito(film.title) ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}</p>
                </button>
              </div>
            </div>
          )}

          <p className="introDettagli">Regia di {film.director}.</p>

          <div className={mini ? "testoDettagliMini" : "testoDettagli"}>
            <div>
              <p><strong>Genere:</strong> {film.category}</p>
              <p><strong>Anno:</strong> {film.year}</p>
              <p><strong>Regista:</strong> {film.director}</p>
            </div>
            <div>
              <p><strong>Durata:</strong> {film.runtime} min</p>
              <p><strong>Budget:</strong> {budgetFormattato}</p>
              <p><strong>Incasso:</strong> {incassoFormattato}</p>
            </div>
            <div>
              <p><strong>Metascore:</strong> {film.metascore}</p>
              <p><strong>Paese:</strong> {film.country}</p>
              {film.genre && (
                <p><strong>Genere aggiuntivo:</strong> {film.genre}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
