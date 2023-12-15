import { QuizQuestion } from "src/quiz-question/entities/quiz-question.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class QuizAnswer {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'bool' })
    correctAnswer: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column()
    questionId: number;

    @ManyToOne(() => QuizQuestion, quizQuestion => quizQuestion.quizAnswers, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: 'questionId' })
    quizQuestion: QuizQuestion;





}
