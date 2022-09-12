import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { UserRoles } from "src/auth/user-roles";

@Schema()
export class Users {
   @Prop()
   email: string;
   @Prop()
   password: string;
   @Prop()
   firstname: string;
   @Prop()
   lastname: string;
   @Prop()
   address: string;
   @Prop({default:"Reader"})
   roles: UserRoles;
   @Prop()
   avatar_url: string;
}
export const UsersSchema = SchemaFactory.createForClass(Users);