import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: "Invalid Email" })
    email: string;

    @IsNotEmpty({ message: "Invalid Password" })
    password: string;
    @IsNotEmpty({ message: "Invalid Username" })
    username: string;
    @IsNotEmpty({ message: "Invalid Role" })
    role: string;

    image: string;


}

export class RegisterUserDto {
    @IsNotEmpty({ message: "Invalid Email" })
    email: string;
    @IsNotEmpty({ message: "Invalid Password" })
    password: string;
    @IsNotEmpty({ message: "Invalid Username" })
    username: string;


}
export class UserLoginDto {
    @IsNotEmpty({ message: "Invalid Email" })
    @ApiProperty({ example: "user@gmail.com", description: 'username' })
    username: string;
    @IsNotEmpty({ message: "Invalid Password" })
    @ApiProperty({ example: "123456", description: "password" })
    password: string;



}
