import { usePreferiti } from "../Assets/context/PreferitiContext";
import { Link } from "react-router-dom";

export default function Card({ films }) {
  const { togglePreferiti, isPreferito } = usePreferiti();

  const preferitiClick = () => {
    togglePreferiti(films.title);
    const attualePreferito = isPreferito(films.title);
    console.log(
      attualePreferito ? "Il preferito è stato rimosso" : "Il preferito è stato aggiunto",
    );
  };

  return (
    <Link
      to={`/dettagli/${encodeURIComponent(films.title)}${films.id ? `?id=${films.id}` : ""}`}
      className="linkDettagli"
    >
      <div className="Cardfilm">
        <h2 className="titleCard">
          Titolo:
          <div>{films.title}</div>
        </h2>
        <div>
          <h3 className="categoryCard">
            Categoria:<div>{films.category}</div>
          </h3>
          <button
            type="button"
            className={
              isPreferito(films.title)
                ? "preferitiCard preferitiOn"
                : "preferitiCard"
            }
            onClick={preferitiClick}
          >
            <i className="fa-solid fa-film"></i>
          </button>
        </div>
      </div>
    </Link>
  );
}
