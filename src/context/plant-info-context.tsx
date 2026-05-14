"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { fetchPlantInfo } from "@/lib/api";
import type { PlantInfo } from "@/types/api";

interface PlantInfoContextValue {
  plant: PlantInfo | null;
  loading: boolean;
}

const PlantInfoContext = createContext<PlantInfoContextValue>({
  plant: null,
  loading: true,
});

export function PlantInfoProvider({ children }: { children: ReactNode }) {
  const [plant, setPlant] = useState<PlantInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlantInfo()
      .then(setPlant)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <PlantInfoContext.Provider value={{ plant, loading }}>
      {children}
    </PlantInfoContext.Provider>
  );
}

export function usePlantInfo() {
  return useContext(PlantInfoContext);
}
