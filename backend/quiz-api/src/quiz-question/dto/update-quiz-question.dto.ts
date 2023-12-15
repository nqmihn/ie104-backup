import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizQuestionDto } from './create-quiz-question.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateQuizQuestionDto {

    quizId: number;
    @IsNotEmpty({ message: "Invalid id" })
    id: number;


    @IsNotEmpty({ message: "Invalid description" })
    description: string;
}


export class UpsertQuizQuestionDto {

    quizId: number;

    id: number;


    @IsNotEmpty({ message: "Invalid description" })
    description: string;
}