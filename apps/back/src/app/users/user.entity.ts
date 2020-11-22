import * as bcrypt from 'bcrypt'
import { Exclude } from 'class-transformer'
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { v4 as uuid } from 'uuid'

export enum UserRole {
  ADMIN = 'admin',
  PSYCHOLOGIST = 'psychologist',
  PATIENT = 'patient',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ nullable: true })
  oAuthId: string;

  @Column({ nullable: true })
  oAuthProvider: string;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 11, nullable: false, unique: true })
  cpf: string;

  @Column({ length: 11, nullable: false })
  phone: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PATIENT,
  })
  role: UserRole;

  @Column({ default: true })
  @Exclude()
  isActive: boolean;

  @Exclude()
  tempPassword: string;

  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  private encryptPassword(): void {
    if (this.tempPassword !== this.password) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }

  validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
