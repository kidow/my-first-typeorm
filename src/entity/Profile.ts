import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm'
import { User } from './User'

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  name: string

  @Column()
  age?: number

  @Column({ nullable: true })
  imageUrl?: string

  @OneToOne(
    type => User,
    user => user.profile,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn()
  user: User
}
