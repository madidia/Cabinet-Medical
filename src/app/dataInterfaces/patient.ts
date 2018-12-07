import {sexe} from "./sexe";
import {Adresse} from "./adress";

export interface PatientInterface {
 prénom: string;
 nom: string;
 sexe: sexe;
 numéroSécuritéSociale: string;
 adresse: Adresse;
}

