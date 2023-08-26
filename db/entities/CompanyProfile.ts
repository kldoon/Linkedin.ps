import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.js";
import { Job } from "./Job.js";

@Entity('company_profiles')
export class CompanyProfile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @OneToMany(() => Job, job => job.company)
  jobs: Job[]

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP()"
  })
  createdAt: Date;
}