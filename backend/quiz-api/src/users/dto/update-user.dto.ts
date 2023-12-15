import { IsNotEmpty } from "class-validator";

export class UpdateUserDto {

    id: number
    username: string;
    role: string;
    image: string;
}
