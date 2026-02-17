import { useContext } from "react"

const useFilms = () => {
    const context = useContext(FilmContext)
    return context;
}

export default useFilms;