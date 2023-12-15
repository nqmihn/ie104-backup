import { Quiz } from "src/quizzes/entities/quiz.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class UserQuiz {
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    quizId: number;

    @ManyToOne(() => User, user => user.userQuizzes, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Quiz, quiz => quiz.userQuizzes, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: 'quizId' })
    quiz: Quiz;

    @Column({ default: false })
    isFinish: boolean;

    @Column({ nullable: true })
    time_start: Date;

    @Column({ nullable: true })
    time_end: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
