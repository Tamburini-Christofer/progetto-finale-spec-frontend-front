import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useFilm } from "../Assets/context/FilmsContext";
import CardDettagli from "../Components/CardDettagli";
import filmsDatabase from "../../progetto-finale-spec-frontend-back/database/films.json";

export default function Dettagli() {
  const { title, id } = useParams();
  const location = useLocation();
  const { films } = useFilm();
  const [filmCompleto, setFilmCompleto] = useState(null);
  const [loadingDettaglio, setLoadingDettaglio] = useState(false);

  const parametroTitolo = decodeURIComponent(title ?? id).trim().toLowerCase();
  const idFilm = new URLSearchParams(location.search).get("id");

  const filmLista = films.find(
    (f) => f.title.trim().toLowerCase() === parametroTitolo,
  );

  const filmDaDatabase = filmsDatabase.find(
    (f) => f.title.trim().toLowerCase() === parametroTitolo,
  );

  useEffect(() => {
    let isMounted = true;

    async function caricaDettaglio() {
      if (!idFilm) {
        if (isMounted) setFilmCompleto(null);
        return;
      }

      setLoadingDettaglio(true);
      try {
        const res = await fetch(`http://localhost:3001/filmses/${idFilm}`);
        const data = await res.json();
        if (isMounted && res.ok) {
          setFilmCompleto(data?.films ?? null);
        }
      } catch {
        if (isMounted) setFilmCompleto(null);
      } finally {
        if (isMounted) setLoadingDettaglio(false);
      }
    }

    caricaDettaglio();
    return () => {
      isMounted = false;
    };
  }, [idFilm]);

  const film = filmDaDatabase;

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
  ].filter(Boolean);

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
