import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { Date } from "mongoose";
export class CreateConcertDto {

    readonly name: string;

    readonly description: string;

    readonly localisation: string;

    readonly price: number;

    readonly affiche: string;

    readonly group: string;

    readonly group_url_img: string;
    readonly show_date: string;
}