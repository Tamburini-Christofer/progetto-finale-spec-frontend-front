import { useContext } from "react"

export default function usePreferiti () {
    const context = useContext(PreferitiContext)
    return context;
}