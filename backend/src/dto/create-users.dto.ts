import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
export class CreateUsersDto {
    @IsString()
    @IsNotEmpty()
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    readonly password: string;
    @IsString()
    @IsNotEmpty()
    readonly firstname: string;
    @IsString()
    @IsNotEmpty()
    readonly lastname: string;
    @IsString()
    @IsNotEmpty()
    readonly address: string;
    readonly roles: string;
    readonly avatar_url: string;
}
