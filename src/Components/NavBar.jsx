import { NavLink } from "react-router-dom";

import "../Styles/NavBar.css";

const linkPages = [
  { route: "/", label: "Homepage" },
  { route: "/lista-film", label: "Tutti i film" },
  { route: "/preferiti", label: "Preferiti" },
  { route: "/novita", label: "Novità" },
];

export default function Navbar() {
  return (
    <>
        <ul className="listaNavBar">
          {linkPages.map((link, indice) => (
            <li key={indice}>
              <NavLink to={link.route} className={({ isActive }) => isActive ? "active-link" : "" }>{link.label}</NavLink>
            </li>
          ))}
        </ul>
    </>
  );
}
