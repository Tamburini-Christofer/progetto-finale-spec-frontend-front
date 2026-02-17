import { usePreferiti } from "../Assets/context/PreferitiContext";

import chalk from "chalk";

export default function Card({ films, title}) {
  const { preferiti, togglePreferiti, isPreferito } = usePreferiti();

  const preferitiClick = () => {
    togglePreferiti(films.title);
    const attualePreferito = isPreferito(films.title);
      console.log(attualePreferito ? `Il preferito è stato ${chalk.red("rimosso")}` : `Il preferito è stato ${chalk.green("aggiunto")}` );
    };

  return (
      <div className="Cardfilm">
        <h2 className="titleCard">
          Titolo:<div>{films.title}</div>
        </h2>
        <div>
          <h3 className="categoryCard">
            Categoria:<div>{films.category}</div>
          </h3>
          <button
            type="button"
            className={isPreferito(films.title) ? "preferitiCard preferitiOn" : "preferitiCard"}
            onClick={preferitiClick}
          >
            <i className="fa-solid fa-film"></i>
          </button>
        </div>
      </div>
  );
}

