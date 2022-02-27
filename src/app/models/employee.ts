import { role } from './role';
export interface employee {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
    motdepasse: string;
    image: File;
    role: role;
    roleType: String;
}