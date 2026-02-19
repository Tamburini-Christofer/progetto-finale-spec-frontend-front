//! Importazioni dipendenze
import { useReducer, useMemo } from "react";
import debounce from "lodash.debounce";

//!Importazioni componenti
import Card from "../Components/Card";
import { useFilm } from "../Assets/context/FilmsContext";

  //! Stato iniziale per useReducer
  const initialState = {
    ricerca: "",
    ricercaDebounced: "",
    categoria: "",
    ordineAlfabetico: "",
    };

    function reducer(state, action) {
  switch (action.type) {
    case "SET_RICERCA":
      return { ...state, ricerca: action.payload };

    case "SET_RICERCA_DEBOUNCED":
      return { ...state, ricercaDebounced: action.payload };

    case "SET_CATEGORIA":
      return { ...state, categoria: action.payload };

    case "SET_ORDINE":
      return { ...state, ordineAlfabetico: action.payload };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

  //* Componente ListaFilm
  export default function ListaFilm() {
  const { films } = useFilm();
  const [state, dispatch] = useReducer(reducer, initialState);

  //? Funzione di debounce per la ricerca
  const debounceRicerca = useMemo(
    () =>
    debounce(value => {
      dispatch({ type: "SET_RICERCA_DEBOUNCED", payload: value });
    }, 500),
    []
  );

  //? Settaggio della ricerca
  const handleSearch = e => {
    dispatch({ type: "SET_RICERCA", payload: e.target.value });
    debounceRicerca(e.target.value);
  };

  //? Filtraggio con useMemo per:
  const filtriFilms = useMemo(() => {
    let result = [...films];

    //? Ricerca per titolo
    if (state.ricercaDebounced) result = result.filter(f => f.title.toLowerCase().includes(state.ricercaDebounced.toLowerCase()));

    //? Ricerca per categoria
    if (state.categoria) result = result.filter(f => f.category === state.categoria);
    
    //? Ordinamento alfabetico tramite uno switch
    switch (state.ordineAlfabetico) {
      case "A-Z": result.sort((a, b) => a.title.localeCompare(b.title)); break;
      case "Z-A": result.sort((a, b) => b.title.localeCompare(a.title)); break;
      default: break;
    }

    return result;
  }, [films, state.ricercaDebounced, state.categoria, state.ordineAlfabetico]);

  return (
    <div className="contenitoreLista">

      <div className="contenitoreFiltri">

        <form className="formFiltri" onSubmit={e => e.preventDefault()}>

          <select value={state.ordineAlfabetico} onChange={e => dispatch({ type: "SET_ORDINE", payload: e.target.value })}>
            <option value="">Ordine alfabetico</option>
            <option value="A-Z">A - Z</option>
            <option value="Z-A">Z - A</option>
          </select>

          <select value={state.categoria} onChange={e => dispatch({ type: "SET_CATEGORIA", payload: e.target.value })}>
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
            value={state.ricerca}
            onChange={handleSearch}
          />

          <button type="button" className="btnReset" onClick={() => dispatch({ type: "RESET" })}> Reset </button>

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
