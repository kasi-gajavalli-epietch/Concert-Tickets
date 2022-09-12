import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Concert } from "./concert.schema";
import { Users } from "./users.schema";

@Schema({ versionKey: false, timestamps: true })
export class Booking {
    @Prop()
    id: string;
    
    @Prop({ type: Types.ObjectId, ref: 'Users' })
    user_id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Concert' })
    concert_id: Types.ObjectId;

    @Prop()
    reserved_date: Date;

    @Prop()
    show_date: Date;

    @Prop()
    price: number;

    @Prop()
    adults: number;

    @Prop()
    children: number;

    @Prop()
    reservation_name: string;

    @Prop()
    total_price: number;

    @Prop()
    concert_title: string;

    @Prop()
    concert_localisation: string;

    @Prop()
    concert_show_date: string;
    

}

export const BookingSchema = SchemaFactory.createForClass(Booking);
