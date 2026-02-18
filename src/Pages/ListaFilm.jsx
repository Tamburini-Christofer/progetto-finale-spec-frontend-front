import { useState, useCallback, useMemo } from "react";
import debounce from "lodash.debounce";
import Card from "../Components/Card";
import { useFilm } from "../Assets/context/FilmsContext";

export default function ListaFilm() {
  const { films } = useFilm();

  // Stato
  const [ricerca, setRicerca] = useState("");
  const [ricercaDebounced, setRicercaDebounced] = useState("");
  const [categoria, setCategoria] = useState("");
  const [ordineAlfabetico, setOrdineAlfabetico] = useState("");

  // Debounce ricerca
  const debounceRicerca = useCallback(
    debounce(value => {
      setRicercaDebounced(value);
    }, 500),
    []
  );

  const handleSearch = e => {
    setRicerca(e.target.value);
    debounceRicerca(e.target.value);
  };


  const filtriFilms = useMemo(() => {
    let result = [...films];

    if (ricercaDebounced) {
      result = result.filter(f =>
        f.title.toLowerCase().includes(ricercaDebounced.toLowerCase())
      );
    }

    if (categoria) {
      result = result.filter(f => f.category === categoria);
    }

    switch (ordineAlfabetico) {
      case "A-Z":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Z-A":
        result.sort((a, b) => b.title.localeCompare(a.title));
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
            <option value="">Seleziona una categoria ▼</option>
            {[...new Set(films.map(f => f.category))].map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
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

      {filtriFilms.length !== 0 ? (
        <div className="contenitoreFilm">
          {filtriFilms.map(film => (
            <Card key={film.title} films={film} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Nessun Film presente</h2>
        </div>
      )}
    </div>
  );
}
