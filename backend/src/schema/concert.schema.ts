import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import Date from 'mongoose'

@Schema()
export class Concert {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    localisation: string;

    @Prop()
    price: number;

    @Prop()
    affiche: string;

    @Prop()
    group: string;

    @Prop()
    group_url_img: string;

    @Prop()
    show_date: string;
}

export const ConcertSchema = SchemaFactory.createForClass(Concert);
