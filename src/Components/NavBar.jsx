//! Importazione dipendenze
import { NavLink } from "react-router-dom";

//! Importazione Context
import { usePreferiti } from "../Assets/context/PreferitiContext";

const linkPages = [
  { route: "/", label: "Homepage" },
  { route: "/lista-film", label: "Tutti i film" },
  { route: "/novita", label: "Novità" },
];

export default function Navbar() {
  const { preferiti } = usePreferiti();

  return (
    <>
      <ul className="listaNavBar">

        {linkPages.map((link, indice) => (
          <li key={indice}>

            <NavLink to={link.route} className={({ isActive }) => isActive ? "active-link" : "notActive-link"}>
              {link.label}
            </NavLink>

          </li>
        ))}
        
        <li>
          <div className="preferitiConta">

            <NavLink to={"/preferiti"}>
              <i className="fa-solid fa-film"></i>
            </NavLink>

            <div className="heartBadge">{preferiti.length}</div>
          </div>
        </li>
      </ul>
    </>
  );
}
