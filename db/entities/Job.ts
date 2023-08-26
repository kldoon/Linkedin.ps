import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CompanyProfile } from "./CompanyProfile.js";
import { Application } from "./Application.js";

@Entity('jobs')
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => CompanyProfile,
    companyProfile => companyProfile.jobs,
    {
      cascade: true,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }
  )
  company: string;

  @Column({ nullable: false, length: 500 })
  title: string;

  @Column({ nullable: false, type: 'text' })
  description: string;

  @Column({ nullable: false, type: 'text' })
  requirements: string;

  @Column({ nullable: true, type: 'int' })
  salary: number;

  @Column({ nullable: true, length: 3, default: 'USD' })
  salaryCurrency: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: false, type: 'timestamp' })
  postDate: Date;

  @Column({ nullable: true, type: 'timestamp' })
  deadline: Date;

  @OneToMany(() => Application, app => app.job)
  applications: Application[]

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP()"
  })
  createdAt: Date;
} 