import Card from "../Components/Card";
import { useFilm } from "../Assets/context/FilmsContext";

export default function ListaFilm() {
  const { films } = useFilm();

  return (
    <div className="contenitoreLista">
      <div className="contenitoreFiltri">
        <form className="formFiltri">
          <select>
            <option value="">Ordine alfabetico ▼</option>
            <option value="A-Z">A - Z</option>
            <option value="Z-A">Z - A</option>
          </select>
          <select>
            <option value="">Seleziona una categoria ▼</option>
          </select>
          <input type="text" placeholder="Cerca per titolo..." />
          <button className="btnReset">Reset</button>
        </form>
      </div>

      <div className="contenitoreFilm">
        {films.map((film, index) => (
          <Card key={index} films={film} id={index+1} />
        ))}
      </div>
    </div>
  );
}
