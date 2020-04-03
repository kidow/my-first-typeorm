import { Group } from '../entity/Group'
import { User } from '../entity/User'

export class GroupModule {
  static async add(name: string) {
    return await Group.create({ name }).save()
  }

  static async groupJoin(groupId: number, userId: number) {
    const group = await Group.findOne(groupId)
    const user = await User.findOne(userId, { relations: ['groups'] })
    user.groups.push(group)
    return await user.save()
  }

  static async userGroups(userId: number) {
    const user = await User.findOne(userId, { relations: ['groupd'] })
    return user.groups
  }

  static async groupUsers(groupId: number) {
    const group = await Group.findOne(groupId, { relations: ['users'] })
    return group.users
  }

  static async remove(groupId: number) {
    const group = await Group.findOne(groupId)
    return await group.remove()
  }
}
