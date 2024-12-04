import { TYPE_ADMIN,TYPE_PARENT,TYPE_ELEVE,TYPE_PROFESSEUR } from './constants';

export const userIsAdmin = (type?: string) => {
  return type == TYPE_ADMIN ? true : false;
};

export const userIsParent = (type?: string) => {
  return type  == TYPE_PARENT ? true : false;
};

export const userIsProfesseur = (type?: string) => {
  return type  == TYPE_PROFESSEUR ? true : false;
};

export const userIsEleve = (type?: string) => {
    return type  == TYPE_ELEVE ? true : false;
  }