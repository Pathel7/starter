export interface Eleve{
    nom: string;
    postnom: string;
    prenom: string;
    email?: string;
    adresse: string;
    classe_id: string;
    ecole_id: string;
    password: string;
    firstConnection : boolean;
  }
  
  export interface Professeur {
    nom: string;
    postnom: string;
    prenom: string;
    ecole_id: string;
    adresse: string;
    email: string;
    password: string;
    firstConnection : boolean;
  }
  
  export interface Parent{
    nom: string;
    postnom: string;
    prenom: string;
    numero: string;
    email: string;
    adresse: string;
    password: string;
    ecole_id : string;
    firstConnection : boolean;
  }

  export interface User{
    nom: string;
    postnom: string;
    prenom: string;
    numero: string;
    email: string;
    adresse: string;
    password: string;
    ecole_id? : string;
    role : 'admin'|'supperAdmin'
    firstConnection : boolean;
  }
  