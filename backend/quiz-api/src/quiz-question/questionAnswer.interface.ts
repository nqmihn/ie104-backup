export interface IQuestionAnswer {
    quizId?: number;
    questions?: {
        id?: number;
        description?: string;
        image?: string;
        quizAnswers: {
            id?: number;
            description?: string;
            correctAnswer: boolean
        }[];
    }[];
}