import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const MAX_ANALYSIS = 4;

const AnalysisContext = createContext(null);

export function AnalysisProvider({ children }) {
  const [analysisList, setAnalysisList] = useState([]);

  const isInAnalysis = useCallback(
    (id) => analysisList.some((p) => p.id === id),
    [analysisList],
  );

  const addPokemon = useCallback((pokemon) => {
    if (analysisList.some((p) => p.id === pokemon.id)) {
      return { ok: false, message: 'Este Pokémon ya está en la lista de análisis.' };
    }
    if (analysisList.length >= MAX_ANALYSIS) {
      return {
        ok: false,
        message: `Solo puedes agregar hasta ${MAX_ANALYSIS} Pokémon.`,
      };
    }
    setAnalysisList((prev) => [...prev, pokemon]);
    return { ok: true, message: 'Pokémon agregado a la lista de análisis.' };
  }, [analysisList]);

  const removePokemon = useCallback((id) => {
    setAnalysisList((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      analysisList,
      addPokemon,
      removePokemon,
      isInAnalysis,
      maxAnalysis: MAX_ANALYSIS,
    }),
    [analysisList, addPokemon, removePokemon, isInAnalysis],
  );

  return (
    <AnalysisContext.Provider value={value}>{children}</AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis debe usarse dentro de AnalysisProvider');
  }
  return context;
}
