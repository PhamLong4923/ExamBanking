import React, { createContext, useContext, useState } from 'react';

const BankContext = createContext();

export const BankProvider = ({ items }) => {
  const [bankType, setBankType] = useState(null);
  const [bankId, setBankId] = useState(null);
  const [repoId, setRepoId] = useState(null);

  return (
    <BankContext.Provider value={{ bankType, setBankType, bankId, setBankId, repoId, setRepoId }}>
      {items}
    </BankContext.Provider>
  );
};

export const useBank = () => useContext(BankContext);
