import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getGuests } from "../api/getGuests";
import { createGuest } from "../api/createGuests";
import type { Guest } from "../api/Guest";

type GuestsContextType = {
  guests: Guest[] | null;
  loading: boolean;
  error: string | null;
  loadGuests: () => Promise<void>;
  addGuest: (payload: Guest) => Promise<void>;
};

const GuestsContext = createContext<GuestsContextType | undefined>(undefined);

export function GuestsProvider({ children }: any) {
  const { weddingId } = useAuth();
  const [guests, setGuests] = useState<Guest[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function loadGuests() {
    if (!weddingId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getGuests(weddingId);
      setGuests(data);
    } catch (err: any) {
      setError('Error cargando invitados');
      setGuests([]);
    } finally {
      setLoading(false);
    }
  }

  async function addGuest(payload: Guest) {
    if (!weddingId) return;
    try {
      const newGuest = await createGuest(payload, weddingId);
      setGuests(prev => [...(prev || []), ...(Array.isArray(newGuest) ? newGuest : [newGuest])]);
    } catch (err: any) {
      setError('Error agregando invitado');
    }
  }

  useEffect(() => {
    loadGuests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weddingId]);

  return (
    <GuestsContext.Provider value={{ guests, loading, error, loadGuests, addGuest }}>
      {children}
    </GuestsContext.Provider>
  );
}

export function useGuests() {
  return useContext(GuestsContext);
}
