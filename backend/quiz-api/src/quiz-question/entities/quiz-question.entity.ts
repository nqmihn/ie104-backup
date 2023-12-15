import { QuizAnswer } from "src/quiz-answer/entities/quiz-answer.entity";
import { QuizUserAnswer } from "src/quiz-user-answer/entities/quiz-user-answer.entity";
import { Quiz } from "src/quizzes/entities/quiz.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class QuizQuestion {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'text' })
    description: string;

    @Column({ nullable: true })
    image: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column()
    quizId: number;

    @ManyToOne(() => Quiz, quiz => quiz.quizQuestions, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: 'quizId' })
    quiz: Quiz;

    @OneToMany(() => QuizAnswer, (quizAnswer) => quizAnswer.quizQuestion)
    quizAnswers: QuizAnswer[]

    @OneToMany(() => QuizUserAnswer, (quizUserAnswer) => quizUserAnswer.quizQuestion)
    quizUserAnswers: QuizUserAnswer[]



}
