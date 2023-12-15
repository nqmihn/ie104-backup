import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({})
export class ResetPassword {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true })
    userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: "userId" })
    user: User

    @Column({ nullable: true })
    verificationCode: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


}
