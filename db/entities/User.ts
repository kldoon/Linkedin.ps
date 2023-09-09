import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from 'bcrypt';
import { Role } from "./Role.js";

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: false })
  fullName: string;

  @Column({ nullable: false })
  email: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10)
    }
  }
  @Column({ nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: ['employee', 'employer', 'admin'],
    default: 'employee'
  })
  type: 'employee' | 'employer' | 'admin';

  @ManyToOne(() => Role, role => role.users, { cascade: true, eager: true, nullable: true })
  @JoinColumn()
  role: Role;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP()"
  })
  createdAt: Date;
}