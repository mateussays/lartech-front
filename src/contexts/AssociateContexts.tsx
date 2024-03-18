import React, { createContext, useContext, useState } from "react";
import ToastMessage from "../components/ToastMessage/ToastMessage";

type Associate = {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  phoneNumber: string;
  active: boolean;
};

type AssociateContextType = {
  associates: Associate[];
  addAssociate: (associate: Associate) => void;
  deleteAssociate: (id: string) => void;
  editAssociate: (id: string, updatedAssociate: Associate) => void;
};

type AssociateProviderProps = {
  children: React.ReactNode;
};

const AssociateContext = createContext<AssociateContextType>({
  associates: [],
  addAssociate: (associate: Associate) => {},
  deleteAssociate: (id: string) => {},
  editAssociate: (id: string, updatedAssociate: Associate) => {},
});

export const AssociateProvider = ({ children }: AssociateProviderProps) => {
  const [associates, setAssociates] = useState([] as Associate[]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const addAssociate = (associate: Associate) => {
    setAssociates([...associates, associate]);
    setToastMessage("Usuário adicionado com sucesso");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const deleteAssociate = (id: string) => {
    setAssociates(associates.filter((associate) => associate.id !== id));
    setToastMessage("Usuário deletado com sucesso");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const editAssociate = (id: string, updatedAssociate: Associate) => {
    setAssociates(
      associates.map((associate) =>
        associate.id === id ? { ...associate, ...updatedAssociate } : associate
      )
    );
    setToastMessage("Usuário editado com sucesso");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <AssociateContext.Provider
      value={{ associates, addAssociate, deleteAssociate, editAssociate }}
    >
      {children}
      {showToast && (
        <ToastMessage
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </AssociateContext.Provider>
  );
};

export const useAssociateContext = () => useContext(AssociateContext);
