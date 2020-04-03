import * as bcrypt from 'bcrypt'
import { Profile } from '../entity/Profile'
import { User } from '../entity/User'
import { IsNull } from 'typeorm'

export class UserModule {
  static async register(
    email: string,
    password: string,
    name: string,
    age: number,
    imageUrl: string
  ) {
    const profile = await Profile.create({
      name,
      age,
      imageUrl
    }).save()
    const hash = await bcrypt.hash(password, 10)
    return await User.create({
      email,
      password: hash,
      profile
    }).save()
  }

  static async login(email: string, password: string): Promise<User | null> {
    const user = await User.findOne({ where: { email, deletedAt: IsNull() } })
    if (!user) return null
    if (!(await bcrypt.compare(password, user.password))) return null
    return user
  }

  static async list() {
    return await User.find({
      where: { deletedAt: IsNull() },
      relations: ['profile'],
      order: { id: 'DESC' }
    })
  }

  static async get(id: number) {
    return await User.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['profile']
    })
  }

  static async profileUpdate(id: number, data: any) {
    const user = await User.findOne({ where: { id }, relations: ['profile'] })
    for (const key in data) user.profile[key] = data[key]
    user.profile = await user.profile.save()
    return user
  }

  static async leave(id: number) {
    const user = await User.findOne(id)
    user.deletedAt = new Date()
    return await user.save()
  }

  static async delete(id: number) {
    const user = await User.findOne(id, { relations: ['profile'] })
    return await user.remove()
  }
}
