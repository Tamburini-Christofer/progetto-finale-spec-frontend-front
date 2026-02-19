import { usePreferiti } from "../Assets/context/PreferitiContext";
import { Link } from "react-router-dom";

export default function Card({ films }) {
  const { togglePreferiti, isPreferito } = usePreferiti();

  const preferitiClick = () => {
    togglePreferiti(films.title);
  };

  return (
    <div className="contenitoreCard">
      <div>
        <div className="BtnContainer">
          <button
            type="button"
            className={
              isPreferito(films.title)
                ? "preferitiCard preferitiOn"
                : "preferitiCard"
            }
            onClick={preferitiClick}
          >
            <span>
              {isPreferito(films.title)
                ? "Rimuovi dai preferiti"
                : "Aggiungi ai preferiti"}
            </span>
          </button>
          <Link
            to={`/dettagli/${encodeURIComponent(films.title)}${
              films.id ? `?id=${films.id}` : ""
            }`}
          >
            <button className="preferitiCardDettagli">Dettagli del film</button>
          </Link>
        </div>
      </div>
      <div className="CardWrapper">
        <div className="Cardfilm">
          <h2 className="titleCard">
            Titolo:
            <div>{films.title}</div>
          </h2>

          <h3 className="categoryCard">
            Categoria:
            <div>{films.category}</div>
          </h3>
        </div>
      </div>
    </div>
  );
}
