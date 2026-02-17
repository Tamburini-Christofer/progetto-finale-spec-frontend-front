import { useState, useEffect, createContext, useContext } from "react";
import chalk from "chalk";


export const filmsContext = createContext();

export default function FilmsProvider({ children }) {
  const [films, setFilms] = useState([]);

  async function chiamataFilms() {
    try {
      const res = await fetch("http://localhost:3001/filmses");
      const dataRes = await res.json();
      console.log("Tutti i film sono stati caricati correttamente:", dataRes);
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
    chiamataFilms();
  }, []);

  return (
    <>
      <filmsContext.Provider value={{ films }}>
        { children }
      </filmsContext.Provider>
    </>
  );
}

export const useFilm = () => {
    const context = useContext(filmsContext)
    if(!context) {
      throw new Error ("Errore nel valore passato")
    }
    return context;
}