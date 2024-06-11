import React, { createContext, useState } from "react";

// Create the context
const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [idModal, setIdModal] = useState("");

  return (
    <ModalContext.Provider value={{ idModal, setIdModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
