import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { User } from './User'

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  content: string

  @Column({ type: Date, nullable: true, default: null })
  deletedAt: Date | null

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(
    type => User,
    user => user.posts,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn()
  user: User
}
