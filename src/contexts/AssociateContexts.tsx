import React, { createContext, useContext, useEffect, useState } from "react";
import ToastMessage from "../components/ToastMessage/ToastMessage";
import { deleteAssociateById, getAssociates, includeAssociate, updateAssociate } from "../services/lartechapi";

type Phones = {
  phoneNumber: string;
  phoneNumberType: string;
};


type Associate = {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  phoneNumber: string;
  PhoneNumberType: string;
  isActive: boolean;
  phones?: Phones[];
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

  useEffect(() => {
    const listAssociates = async () => {
      const response = await getAssociates();

      if (response.error) {
        setToastMessage("Erro ao buscar usuários");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
        return;
      }

      setAssociates(response);
    };

    listAssociates();
  }, []);

  const addAssociate = async (associate: Associate) => {
    const response = await includeAssociate(associate);

    if (response.error) {
      setToastMessage("Erro ao adicionar usuário");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return;
    }

    setAssociates([...associates, associate]);
    setToastMessage("Usuário adicionado com sucesso");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const deleteAssociate = async (id: string) => {

    const response = await deleteAssociateById(id);

    if (response.error) {
      setToastMessage("Erro ao deletar usuário");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return;
    }


    setAssociates(associates.filter((associate) => associate.id !== id));
    setToastMessage("Usuário deletado com sucesso");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const editAssociate = async (id: string, updatedAssociate: Associate) => {
    console.log(updatedAssociate);
    const response = await updateAssociate(id, updatedAssociate);

    if (response.error) {
      setToastMessage("Erro ao editar usuário");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return;
    }
    
    
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
