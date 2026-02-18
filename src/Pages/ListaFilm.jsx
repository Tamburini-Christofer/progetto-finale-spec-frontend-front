import { useState, useCallback, useMemo } from "react";
import debounce from "lodash.debounce";
import Card from "../Components/Card";
import { useFilm } from "../Assets/context/FilmsContext";
import chalk from "chalk"

export default function ListaFilm() {
  const { films } = useFilm();

  //! Gestione stato
  const [ricerca, setRicerca] = useState("");
  const [ricercaDebounced, setRicercaDebounced] = useState("");
  const [categoria, setCategoria] = useState("");
  const [ordineAlfabetico, setOrdineAlfabetico] = useState("");
  //!

  //! Gestione Debounce
  const debounceRicerca = useCallback(
    debounce(value => {
      setRicercaDebounced(value);
    }, 500),
    []
  );
  //!

  const handleSearch = e => {
    setRicerca(e.target.value);
    debounceRicerca(e.target.value);
  };

  const filtriFilms = useMemo(() => {
    let result = [...films];

    // 🔍 titolo
    if (ricercaDebounced) {
      result = result.filter(f =>
        f.title.toLowerCase().includes(ricercaDebounced.toLowerCase()));
        console.log(`Hai cercato usando il filtro ${chalk.green("ricerca Generica")}`)
    }

    // 🏷️ categoria
    if (categoria) {
      result = result.filter(f => f.category === categoria);
      console.log("Hai usato il filtro" + " " + chalk.green(categoria))
    }

    // 🔤 ordine
    switch (ordineAlfabetico) {
      case "A-Z":
        result.sort((a, b) => a.title.localeCompare(b.title));
        console.log("Hai usato il filtro" + " " + chalk.green("Ordine crescente"))
        break;
      case "Z-A":
        result.sort((a, b) => b.title.localeCompare(a.title));
        console.log("Hai usato il filtro" + " " + chalk.red("Ordine decrescente"))
        break;
      default:
        break;
    }

    return result;
  }, [films, ricercaDebounced, categoria, ordineAlfabetico]);

  const resetFiltri = () => {
    setRicerca("");
    setRicercaDebounced("");
    setCategoria("");
    setOrdineAlfabetico("");
    console.log(`Hai ${chalk.yellow("resettato")} i filtri di ricerca`)
  };

  return (
    <div className="contenitoreLista">
      <div className="contenitoreFiltri">
        <form className="formFiltri" onSubmit={e => e.preventDefault()}>
          <select
            value={ordineAlfabetico}
            onChange={e => setOrdineAlfabetico(e.target.value)}
          >
            <option value="">Ordine alfabetico</option>
            <option value="A-Z">A - Z</option>
            <option value="Z-A">Z - A</option>
          </select>

          <select
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
          >
            <option value="">Seleziona una categoria</option>
            {[...new Set(films.map(f => f.category))].map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Cerca per titolo..."
            value={ricerca}
            onChange={handleSearch}
          />

          <button type="button" className="btnReset" onClick={resetFiltri}>
            Reset
          </button>
        </form>
      </div>

      <div className="contenitoreFilm">
        {filtriFilms.map((film, index) => (
          <Card key={index} films={film} id={index + 1} />
        ))}
      </div>
    </div>
  );
}
