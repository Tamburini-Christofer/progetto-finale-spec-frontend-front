//! Dipendenze
import { useState, useEffect, createContext, useContext } from "react";

export const preferitiContext = createContext(null);

//! Chiave per localStorage
const STORAGE_KEY = "preferiti_films";

export default function PreferitiProvider({ children }) {

  //? Salvataggio dei preferiti
  const [preferiti, setPreferiti] = useState(() => {
    //todo  Recupera i preferiti salvati nel localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    //todo Se esistono, li convertiamo da JSON a array, altrimenti array vuoto
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferiti));
  }, [preferiti]);

  const isPreferito = (title) => preferiti.includes(title);

const togglePreferiti = (title) => {
  setPreferiti((prev) =>
    //todo  Se il titolo è già nei preferiti...
    prev.includes(title)
    //todo  ...lo rimuoviamo creando un nuovo array senza quel titolo
      ? prev.filter((x) => x !== title)
    //todo  ...altrimenti lo aggiungiamo all'array
      : [...prev, title]
  );
};

  const svuotaPreferiti = () => {
  const conferma = window.confirm("Sei sicuro di svuotare tutta la lista dei preferiti?");
  if (!conferma) return;
  setPreferiti([]);
  localStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    preferiti,
    togglePreferiti,
    svuotaPreferiti,
    isPreferito,
  };

  return (
    <preferitiContext.Provider value={value}>
      {children}
    </preferitiContext.Provider>
  );
}

//! Esportazione customHook usePreferiti
export const usePreferiti = () => {
  const context = useContext(preferitiContext);
  if (!context) {
    throw new Error("Errore: usePreferiti deve essere usato dentro PreferitiProvider");
  }
  return context;
};
//!