import { Transform } from "class-transformer";
import { IsDate, IsDateString, IsNotEmpty } from "class-validator";

export class CreateUserQuizDto {
    @IsNotEmpty({ message: "Invalid userId" })
    userId: number;

    @IsNotEmpty({ message: "Invalid quizId" })
    quizId: number;

    isFinish: boolean;

    time_start: Date;
    time_end: Date;
}
