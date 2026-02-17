import { useState, useEffect, createContext } from "react";

export const preferitiContext = createContext(null);

const STORAGE_KEY = "preferiti_games";

export default function PreferitiProvider({ children }) {

  const [preferiti, setPreferiti] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferiti));
  }, [preferiti]);

  function togglePreferiti(id) {
    const numericId = Number(id);

    setPreferiti((prev) =>
      prev.includes(numericId)
        ? prev.filter((x) => x !== numericId)
        : [...prev, numericId]
    );
  }

  function svuotaPreferiti() {
    setPreferiti([]);
  }

  const value = {
    preferiti,
    togglePreferiti,
    svuotaPreferiti
  };

  return (
    <preferitiContext.Provider value={value}>
      {children}
    </preferitiContext.Provider>
  );
}
