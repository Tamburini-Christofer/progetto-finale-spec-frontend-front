//! Importazione dipendenze
import { Router, Routes, Route } from "react-router-dom"

//! Importazione Layout principale
import Layout from "./Layout/Layout"

//! Importiazione pagine progetto
import Homepage from "./Pages/Homepage"
import ListaFilm from "./Pages/ListaFilm"
import Dettagli from "./Pages/Dettagli"
import Preferiti from "./Pages/Preferiti"
import PaginaNotFound from "./Pages/PaginaNotFound"

//! Definizione componente App principale e le relative rotte
export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Layout />}>
          <Route index element = {<Homepage />} />
          <Route path="lista-film" element = {<ListaFilm />} />
          <Route path="dettagli" element = {<Dettagli />} />
          <Route path="preferiti" element = {<Preferiti />} />
          <Route path="*" element = {<PaginaNotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}


