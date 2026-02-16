//! Importazione dipendenze
import { Outlet } from "react-router-dom"

//! Importazione componenti
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";

//! Creazione Layout
export default function Layout () {
    return (
        <>
            <header>
                <nav>
                    <Navbar />
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}