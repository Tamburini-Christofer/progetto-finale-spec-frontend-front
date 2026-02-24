//! Dipendenze
import { Link } from "react-router-dom";

//! Context Preferiti
import { usePreferiti } from "../Assets/context/PreferitiContext";

export default function Card({ films }) {
  const { togglePreferiti, isPreferito } = usePreferiti();

  const preferitiClick = () => {
    togglePreferiti(films.title);
  };

  return (
    <div className="contenitoreCard">

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

        <Link to={`/dettagli/${films.id}`}>
          <button className="preferitiCardDettagli">Dettagli del film</button>
        </Link>

      </div>

      <div className="CardWrapper">

        <div className="Cardfilm">

          <h2 className="titleCard">
            Titolo: <span>{films.title}</span>
          </h2>

          <h3 className="categoryCard">
            Categoria: <span>{films.category}</span>
          </h3>

        </div>

      </div>

    </div>
  );
}