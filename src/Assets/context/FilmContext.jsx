import { useState, useEffect, createContext } from "react";
import chalk from "chalk";


const filmsContext = createContext();

function filmsProvider({ children }) {
  const [films, setFilms] = useState([]);

  async function chiamataFilms() {
    try {
      const res = await fetch("http://localhost:3000/films");
      const dataRes = await res.json();
      console.log(
        `Tutti i film sono stati caricati ${chalk.green("correttamente")} ${dataRes}`,
      );
      setFilms(dataRes);
    } catch (err) {
      throw new Error(
        `Si è verificato un ${chalk.red("errore")} durante l'operazione ${err}`,
      );
    } finally {
      console.log(
        "L'operazione è terminata e si può procedere con una successiva",
      );
    }
  }

  useEffect(() => {
    setFilms();
  }, []);

  return (
    <>
      <filmsContext.Provider>
        value={{ films }}
        { children }
      </filmsContext.Provider>
    </>
  );
}

export { filmsProvider }