import { useState, useEffect, createContext, useContext } from "react";

export const preferitiContext = createContext(null);

const STORAGE_KEY = "preferiti_films";

export default function PreferitiProvider({ children }) {
  const [preferiti, setPreferiti] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferiti));
  }, [preferiti]);

  const togglePreferiti = (id) => {
    setPreferiti((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const svuotaPreferiti = () => {
    setPreferiti([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    preferiti,
    togglePreferiti,
    svuotaPreferiti,
  };

  return (
    <preferitiContext.Provider value={value}>
      {children}
    </preferitiContext.Provider>
  );
}

// Hook per usare il contesto
export const usePreferiti = () => {
  const context = useContext(preferitiContext);
  if (!context) {
    throw new Error("Errore: usePreferiti deve essere usato dentro PreferitiProvider");
  }
  return context;
};
