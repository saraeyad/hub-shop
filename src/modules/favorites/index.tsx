import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from "react";
import { localStorageFavorites } from "./repository/localStorageFavorites";
import type { FavoritesRepository } from "./repository/FavoritesRepository";
import type { Favorites } from "./entities/Favorite";

type FavoritesContextType = {
  repository: FavoritesRepository;
  favorites: Favorites;
  refreshFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavoritesContext must be used within FavoritesProvider");
  return context;
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const repository = useMemo(() => localStorageFavorites(), []);
  const [favorites, setFavorites] = useState<Favorites>(() => repository.getAll());

  const refreshFavorites = useCallback(() => setFavorites(repository.getAll()), [repository]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => e.key === "favorites" && refreshFavorites();
    const handleUpdate = () => refreshFavorites();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("favoritesUpdated", handleUpdate);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("favoritesUpdated", handleUpdate);
    };
  }, [refreshFavorites]);

  return (
    <FavoritesContext.Provider value={{ repository, favorites, refreshFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
