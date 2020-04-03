import * as faker from 'faker/locale/ko'
import { Group } from '../entity/Group'
import { User } from '../entity/User'
import { UserModule } from './UserModule'
import { GroupModule } from './GroupModule'

describe('Group modules test', () => {
  let users: User[] = []
  let group: Group

  it('그룹 추가', async () => {
    const name = faker.lorem.word()
    group = await GroupModule.add(name)
    expect(group).toHaveProperty('id')
  })

  it('유저 추가', async () => {
    for (let i = 0; i < 2; i++) {
      const email = faker.internet.email()
      const name = faker.name.lastName()
      const imageUrl = faker.image.imageUrl()
      const user = await UserModule.register(
        email,
        'password',
        name,
        33,
        imageUrl
      )
      users.push(user)
      expect(user).toHaveProperty('id')
    }
    expect(users.length).toEqual(2)
    for (const user of users) await GroupModule.groupJoin(group.id, user.id)
    const groupUsers = await GroupModule.groupUsers(group.id)
    expect(groupUsers).toHaveLength(2)
  })

  it('그룹 지우기', async () => {
    group = await GroupModule.remove(group.id)
    expect(group.id).toEqual(undefined)
    for (let user of users) {
      user = await UserModule.delete(user.id)
      expect(user.id).toEqual(undefined)
    }
  })
})
