import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./User.js";
import { Job } from "./Job.js";

@Entity('company_profiles')
export class CompanyProfile extends BaseEntity {
  @OneToOne(() => User)
  @PrimaryColumn()
  employerId: string;

  @Column({ nullable: false })
  cvUrl: string;

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