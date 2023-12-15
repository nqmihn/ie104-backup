import { IsNotEmpty } from "class-validator";

export class CreateQuizDto {
    @IsNotEmpty({ message: "Invalid Name" })
    name: string;

    description: string;
    quizImage: string;

    difficulty: string;




}


