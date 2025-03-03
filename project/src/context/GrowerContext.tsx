import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Grower {
  id: string;
  hybridName: string;
  growerName: string;
  fatherName: string;
  village: string;
  acres: number;
  gpsCoordinates: string;
  femaleSowDate: string;
  maleSowDate: string;
  femalePackets: number;
  malePackets: number;
  femaleLotNo: string;
  maleLotNo: string;
  remarks: string;
  createdAt: string;
  createdBy: string;
}

interface GrowerContextType {
  growers: Grower[];
  addGrower: (grower: Omit<Grower, 'id' | 'createdAt'>) => void;
  updateGrower: (id: string, grower: Partial<Grower>) => void;
  deleteGrower: (id: string) => void;
  getGrowerById: (id: string) => Grower | undefined;
}

const GrowerContext = createContext<GrowerContextType | undefined>(undefined);

export const GrowerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [growers, setGrowers] = useState<Grower[]>(() => {
    const savedGrowers = localStorage.getItem('growers');
    return savedGrowers ? JSON.parse(savedGrowers) : [];
  });

  const saveGrowers = (updatedGrowers: Grower[]) => {
    localStorage.setItem('growers', JSON.stringify(updatedGrowers));
    setGrowers(updatedGrowers);
  };

  const addGrower = (grower: Omit<Grower, 'id' | 'createdAt'>) => {
    const newGrower: Grower = {
      ...grower,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    const updatedGrowers = [...growers, newGrower];
    saveGrowers(updatedGrowers);
  };

  const updateGrower = (id: string, updatedFields: Partial<Grower>) => {
    const updatedGrowers = growers.map(grower => 
      grower.id === id ? { ...grower, ...updatedFields } : grower
    );
    saveGrowers(updatedGrowers);
  };

  const deleteGrower = (id: string) => {
    const updatedGrowers = growers.filter(grower => grower.id !== id);
    saveGrowers(updatedGrowers);
  };

  const getGrowerById = (id: string) => {
    return growers.find(grower => grower.id === id);
  };

  return (
    <GrowerContext.Provider value={{ 
      growers, 
      addGrower, 
      updateGrower, 
      deleteGrower,
      getGrowerById
    }}>
      {children}
    </GrowerContext.Provider>
  );
};

export const useGrowers = (): GrowerContextType => {
  const context = useContext(GrowerContext);
  if (context === undefined) {
    throw new Error('useGrowers must be used within a GrowerProvider');
  }
  return context;
};