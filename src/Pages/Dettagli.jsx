import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CardDettagli from "../Components/CardDettagli";
import filmsDatabase from "../../progetto-finale-spec-frontend-back/database/films.json";

export default function Dettagli() {
  const { title, id } = useParams();
  const location = useLocation();
  const [filmCompleto, setFilmCompleto] = useState(null);

  const parametroTitolo = decodeURIComponent(title ?? id).trim().toLowerCase();
  const idFilm = new URLSearchParams(location.search).get("id");

  const film = filmsDatabase.find((f) => f.title.trim().toLowerCase() === parametroTitolo,);

  useEffect(() => {

    async function caricaDettaglio() {
      try {
        const res = await fetch(`http://localhost:3001/filmses/${idFilm}`);
        const data = await res.json();
        setFilmCompleto(data.films);
      } catch (error) {
        console.error(
          "Errore durante il caricamento dei dettagli del film:",
          error,
        );
      } finally {
        console.log("Caricamento dettagli completato");
      }
    }
    caricaDettaglio();
    return;
  }, [idFilm]);

  const copertina = film.linkImage;
  const budgetValue = Number(film.budget);
  const boxOfficeValue = Number(film.box_office);

  const valutaFormatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  const budgetFormattato = Number.isFinite(budgetValue)
    ? valutaFormatter.format(budgetValue)
    : "N/D";
  const incassoFormattato = Number.isFinite(boxOfficeValue)
    ? valutaFormatter.format(boxOfficeValue)
    : "N/D";

  const metaTag = [
    film.year,
    film.category,
    film.runtime ? `${film.runtime} min` : null,
  ];

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
