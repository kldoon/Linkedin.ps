import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./User.js";
import { Application } from "./Application.js";

@Entity('employee_profiles')
export class EmployeeProfile extends BaseEntity {
  @OneToOne(() => User)
  @PrimaryColumn()
  employeeId: string;

  @Column({ nullable: false })
  cvUrl: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP()"
  })
  createdAt: Date;

  @OneToMany(() => Application, app => app.job)
  applications: Application[]
}