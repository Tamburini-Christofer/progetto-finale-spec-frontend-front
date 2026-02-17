import { useContext } from "react"

export default function useFilm () {
    const context = useContext(FilmContext)
    return context;
}