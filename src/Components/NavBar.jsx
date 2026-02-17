import { NavLink } from "react-router-dom";
import { usePreferiti } from "../Assets/context/PreferitiContext";

import "../Styles/NavBar.css";

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
              <NavLink to={link.route} className={({ isActive }) => isActive ? "active-link" : "notActive-link" }>{link.label}</NavLink>
            </li>
          ))}
            <li>
              <span className="heartBadge">{preferiti.length}</span>
              <NavLink to={"/preferiti"}> <i className="fa-solid fa-film"></i> </NavLink>
            </li>
        </ul>
    </>
  );
}
