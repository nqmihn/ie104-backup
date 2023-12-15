import { Quiz } from "src/quizzes/entities/quiz.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class History {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;


    @Column()
    quizId: number;
    @ManyToOne(() => Quiz, quiz => quiz.histories, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: 'quizId' })
    quiz: Quiz;

    @Column()
    totalQuestions: number;

    @Column()
    totalCorrect: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
