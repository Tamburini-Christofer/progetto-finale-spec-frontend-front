//! Importazione dipendenze
import { BrowserRouter, Routes, Route, } from "react-router-dom";

//! Importazione Layout principale
import Layout from "./Layout/Layout";

//! Importiazione pagine progetto
import Homepage from "./Pages/Homepage";
import ListaFilm from "./Pages/ListaFilm";
import Dettagli from "./Pages/Dettagli";
import Preferiti from "./Pages/Preferiti";
import Novità from "./Pages/Novità";
import PaginaNotFound from "./Pages/PaginaNotFound";

//! Importazione stili
import "./Styles/NavBar.css";
import "./Styles/Footer.css";
import "./Styles/Home.css";
import "./Styles/ListaFilm.css";
import "./Styles/Card.css";
import "./Styles/Preferiti.css";
import "./Styles/Novità.css";
import "./Styles/404.css";
import "./Styles/Dettagli.css";

//! Importazione Context
import FilmsProvider from "./Assets/context/FilmsContext";
import PreferitiProvider from "./Assets/context/PreferitiContext";

//! Definizione componente App principale e le relative rotte
export default function App() {
  return (
    <PreferitiProvider>
      <FilmsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="lista-film" element={<ListaFilm />} />
              <Route path="dettagli/:title" element={<Dettagli />} />
              <Route path="preferiti" element={<Preferiti />} />
              <Route path="novita" element={<Novità />} />
              <Route path="*" element={<PaginaNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FilmsProvider>
    </PreferitiProvider>
  );
}
