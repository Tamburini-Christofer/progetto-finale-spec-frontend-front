//! Importazioni dipendenze
import { useParams } from "react-router-dom";

//! Importazioni componenti
import CardDettagli from "../Components/CardDettagli";
import filmsDataJson from "../../progetto-finale-spec-frontend-back/database/films.json";

//! Componente Dettagli
export default function Dettagli() {
  const { title } = useParams();

  const parametroTitolo = decodeURIComponent(title).trim().toLowerCase();

  const film = filmsDataJson.find((f) => f.title.trim().toLowerCase() === parametroTitolo,);
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
  const budgetFormattato = Number.isFinite(budgetValue) ? valutaFormatter.format(budgetValue) : "N/A";
  const incassoFormattato = Number.isFinite(boxOfficeValue) ? valutaFormatter.format(boxOfficeValue) : "N/A";
  
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
