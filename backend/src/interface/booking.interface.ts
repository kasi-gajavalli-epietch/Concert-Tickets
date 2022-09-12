import { Document } from 'mongoose';

export interface IBooking extends Document{
    exec();
    readonly concert_id: string;
    readonly user_id: string;
    readonly adults: number;
    readonly children: number;
    readonly price: number;
    readonly reserved_date: Date;
    readonly show_date: Date;
    readonly reservation_name: string;
    readonly total_price: number;
    readonly concert_title: string;
    readonly concert_localisation: string;
    readonly concert_show_date: string;
}