import { Document } from 'mongoose';
export interface IUsers extends Document{
    readonly email: string;
    readonly password: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly address: string;
    readonly roles: string;
    readonly avatar_url: string;
}