export interface ISystemAnswer {
    id?: number;
    description?: string;
}

export interface IQuizData {
    questionId?: number;
    isCorrect?: boolean;
    userAnswers?: number[];
    systemAnswers?: ISystemAnswer[];
}
export interface quizResult {
    quizData?: IQuizData[];
    countCorrect?: number;
    countTotal?: number;

}