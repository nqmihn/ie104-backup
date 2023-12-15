import { IsNotEmpty } from "class-validator";

export class CreateQuizQuestionDto {
    @IsNotEmpty({ message: "Invalid quizId" })
    quizId: number;


    @IsNotEmpty({ message: "Invalid description" })
    description: string;
}
