import { QuizQuestion } from "src/quiz-question/entities/quiz-question.entity";
import { Quiz } from "src/quizzes/entities/quiz.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class QuizUserAnswer {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    userId: number;

    @Column()
    quizId: number;

    @Column()
    questionId: number;

    @Column()
    user_answers: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Quiz, quiz => quiz.quizUserAnswers, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: 'quizId' })
    quiz: Quiz;

    @ManyToOne(() => QuizQuestion, quizQuestion => quizQuestion.quizUserAnswers, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: 'questionId' })
    quizQuestion: QuizQuestion;

    @ManyToOne(() => User, user => user.quizUserAnswers, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: 'userId' })
    user: User;


}
