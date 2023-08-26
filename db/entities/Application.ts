import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./Job.js";
import { EmployeeProfile } from "./EmployeeProfile.js";

@Entity()
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => Job,
    job => job.applications,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  )
  job: string | Job;

  @ManyToOne(
    () => EmployeeProfile,
    employee => employee.applications,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  )
  employee: string | EmployeeProfile;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Accepted', 'Rejected']
  })
  status: 'Pending' | 'Accepted' | 'Rejected';

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP()"
  })
  createdAt: Date;
}