import React, { createContext, useContext, useState } from 'react';

const BankContext = createContext();

export const BankProvider = ({ children }) => {
  const [bankType, setBankType] = useState(null);

  return (
    <BankContext.Provider value={{ bankType, setBankType }}>
      {children}
    </BankContext.Provider>
  );
};

export const useBank = () => useContext(BankContext);
