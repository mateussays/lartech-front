import { transformAssociate } from "../helpers/helpers";

const apiUrl = "https://lartechapi.azurewebsites.net/api/";

type Associate = {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  phoneNumber: string;
  PhoneNumberType: string;
  isActive: boolean;
};

export const includeAssociate = async (associate: Associate) => {
  const formattedAssociate = transformAssociate(associate);

  try {
    const response = await fetch(apiUrl + "lar-tech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedAssociate),
    });

    if (!response.ok) {
      return {
        error: true,
        message: "Erro ao adicionar usuário",
      };
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getAssociates = async () => {
  try {
    const response = await fetch(apiUrl + "lar-tech", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      return {
        error: true,
        message: "Erro ao buscar usuários",
      };
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getAssociateById = async (id: string | undefined) => {
  try {
    const response = await fetch(apiUrl + `lar-tech/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        error: true,
        message: "Erro ao buscar usuário",
      };
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteAssociateById = async (id: string) => {
  try {
    const response = await fetch(apiUrl + `lar-tech/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        error: true,
        message: "Erro ao deletar usuário",
      };
    }

    return {
      status: "success",
    }
  } catch (error) {
    throw error;
  }
};

export const updateAssociate = async (id: string, associate: Associate) => {
  const formattedAssociate = transformAssociate(associate);

  try {
    const response = await fetch(apiUrl + `lar-tech/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedAssociate),
    });

    if (!response.ok) {
      return {
        error: true,
        message: "Erro ao editar usuário",
      };
    }

    return {
      status: "success",
    }
  } catch (error) {
    throw error;
  }
};
