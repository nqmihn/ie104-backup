import { IsNotEmpty } from "class-validator";

export class UpdateQuizDto {
    @IsNotEmpty({ message: "Invalid id" })
    id: number

    name: string;
    description: string;
    quizImage: string;
    difficulty: string;




}


