//! Dipendenze
import { useParams } from "react-router-dom";

//! Componenti
import CardDettagli from "../Components/CardDettagli";

//! Importazione del database films.json in backend
import filmsDataJson from "../../progetto-finale-spec-frontend-back/database/films.json";

//! Pagine
import PaginaNotFound from "./PaginaNotFound";

//! Componente Dettagli
export default function Dettagli() {
  const { id } = useParams();
  const idNumerico = Number(id);

  const filmsData = filmsDataJson.map((film, index) => ({
    ...film,
    id: film.id ?? index + 1,
  }));

  const film = filmsData.find((f) => f.id === idNumerico);

  if (!film || Number.isNaN(idNumerico)) {
    return <PaginaNotFound />;
  }

  const metaTag = [film.year, film.category, film.runtime ? `${film.runtime} min` : null];

  //! Variabili di supporto per formattazione e visualizzazione
  const copertina = film.linkImage;
  const budgetValue = Number(film.budget);
  const boxOfficeValue = Number(film.box_office);
  
  const valutaFormatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  //! Formattazione del budget e incasso, con gestione dei casi in cui i valori non sono numerici
  const budgetFormattato = valutaFormatter.format(budgetValue)
  const incassoFormattato = valutaFormatter.format(boxOfficeValue)
  
  return (
    <>
      <CardDettagli
        film={film}
        copertina={copertina}
        metaTag={metaTag}
        budgetFormattato={budgetFormattato}
        incassoFormattato={incassoFormattato}
      />
    </>
  );
}
