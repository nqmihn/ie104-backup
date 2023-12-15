import { IsNotEmpty } from "class-validator";

export class CreateQuizAnswerDto {
    @IsNotEmpty({ message: "Invalid Correct Answer" })
    correctAnswer: boolean;

    @IsNotEmpty({ message: "Invalid description" })
    description: string;

    @IsNotEmpty({ message: "Invalid questionId" })
    questionId: number;

}
