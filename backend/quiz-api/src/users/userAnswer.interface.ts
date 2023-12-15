export interface IUserAnswer {
    quizId: number;
    answers: {
        questionId: number,
        userAnswerId: number[],
    }[];
}