import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ nullable: false })
  name: string;

  @Column({ length: 11, nullable: false })
  cpf: string;

  @Column({ length: 11 })
  phone: string;

  @Column({ default: true })
  isActive: boolean;

  constructor(user?: Partial<User>) {
    return Object.assign({}, this, user)
  }
}
