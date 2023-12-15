import { IsNotEmpty } from "class-validator";


export class UpdateQuizAnswerDto {
    correctAnswer: boolean;


    description: string;


    questionId: number;

    @IsNotEmpty({ message: "Invalid answerId" })
    answerId: number;
}
