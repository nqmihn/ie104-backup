import { History } from 'src/history/entities/history.entity';
import { QuizQuestion } from 'src/quiz-question/entities/quiz-question.entity';
import { QuizUserAnswer } from 'src/quiz-user-answer/entities/quiz-user-answer.entity';
import { UserQuiz } from 'src/user-quiz/entities/user-quiz.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity({})
export class Quiz {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column()
    quizImage: string;

    @Column({ default: "EASY" })
    difficulty: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => UserQuiz, (userQuiz) => userQuiz.quiz)
    userQuizzes: UserQuiz[]

    @OneToMany(() => QuizQuestion, (QuizQuestion) => QuizQuestion.quiz)
    quizQuestions: QuizQuestion[]

    @OneToMany(() => QuizUserAnswer, (quizUserAnswer) => quizUserAnswer.quiz)
    quizUserAnswers: QuizUserAnswer[]

    @OneToMany(() => History, (history) => history.quiz)
    histories: History[]



}
