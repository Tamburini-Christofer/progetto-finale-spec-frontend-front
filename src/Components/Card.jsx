import { usePreferiti } from "../Assets/context/PreferitiContext";

import chalk from "chalk";

export default function Card({ films, id}) {
  const { preferiti, togglePreferiti } = usePreferiti();

  const isPreferito = preferiti.includes(id);

  const preferitiClick = () => {
    togglePreferiti(id);
      console.log(isPreferito ? `Il preferito è stato ${chalk.red("rimosso")}` : `Il preferito è stato ${chalk.green("aggiunto")}` );
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
            className={isPreferito ? "preferitiCard preferitiOn" : "preferitiCard"}
            onClick={preferitiClick}
          >
            <i className="fa-solid fa-film"></i>
          </button>
        </div>
      </div>
  );
}

