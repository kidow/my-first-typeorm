import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn
} from 'typeorm'
import { User } from './User'

@Entity()
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @CreateDateColumn()
  createdAt: Date

  @ManyToMany(
    type => User,
    user => user.groups,
    { onDelete: 'CASCADE' }
  )
  @JoinTable()
  users: User[]
}
