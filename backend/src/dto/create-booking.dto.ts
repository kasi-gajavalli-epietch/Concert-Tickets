import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { Schema } from 'mongoose';

export class CreateBookingDto {
  id: string;

  concert_id: Schema.Types.ObjectId;

  user_id: Schema.Types.ObjectId;

  adults: number;

  children: number;

  price: number;

  reserved_date: string;

  show_date: string;

  reservation_name: string;

  total_price: number;

  concert_title: string;

  concert_localisation: string;
  
  concert_show_date: string;
}