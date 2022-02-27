import { role } from './role';
export interface Admin {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
    motdepasse: string;
    image: String;
    role: role;
    roleType: String;

}
