export interface Ecole {
    nom: string;
    adresse: string;
  }
  
  export interface Classe {
    promotion: string;
    section: string;
    ecole_id: string;
  }
  
  export interface Cours {
    intitule: string;
    ponderation: number;
    classe_id: string;
    ecole_id: string;
    professeur_id: string;
  }
  