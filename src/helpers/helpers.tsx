interface IAssociate {
  name: string;
  cpf: string;
  birthDate: string;
  PhoneNumberType: string;
  phoneNumber: string;
  isActive: boolean;
}

export const generateRandomId = (length: number) => {
  const characters = "0123456789";
  const charactersLength = characters.length;

  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * charactersLength))
  ).join("");
};

export const transformAssociate = (associate: IAssociate) => {
  return {
    id: generateRandomId(8),
    name: associate.name,
    cpf: associate.cpf,
    birthDate: associate.birthDate,
    phones: [
      {
        phoneNumberId: generateRandomId(8),
        phoneNumberType: associate.PhoneNumberType,
        phoneNumber: associate.phoneNumber,
      },
    ],
    isActive: associate.isActive,
    isDeleted: false,
  };
};
