import { Date, Document } from 'mongoose';
export interface IConcert extends Document{
    readonly name: string;
    readonly description: string;
    readonly localisation: string;
    readonly price: number;
    readonly affiche: string;
    readonly group: string;
    readonly group_url_img: string;
    readonly show_date: string;
}