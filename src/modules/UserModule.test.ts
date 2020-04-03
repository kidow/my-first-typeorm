import * as faker from 'faker/locale/ko'
import { User } from '../entity/User'
import { UserModule } from './UserModule'

describe('User modules test', () => {
  let user: User
  let password: string

  it('사용자 추가', async () => {
    const email = faker.random.uuid() + faker.internet.email()
    const name = faker.name.lastName() + faker.name.firstName()
    const age = faker.random.number({ min: 12, max: 100 })
    const imageUrl = faker.image.imageUrl()
    password = faker.internet.password()
    // @ts-ignore
    user = await UserModule.register(email, password, name, age, imageUrl)
    expect(user).toHaveProperty('id')
    expect(user.id).not.toEqual(undefined)
  })

  it('로그인', async () => {
    const loginUser = await UserModule.login(user.email, password)
    expect(loginUser).not.toBeNull()
  })

  it('사용자 목록', async () => {
    const users = await UserModule.list()
    expect(users.length).toBeGreaterThan(0)
  })

  it('사용자 정보', async () => {
    const userInfo = await UserModule.get(user.id)
    expect(userInfo).toEqual(user)
  })

  it('사용자 프로필 변경', async () => {
    // @ts-ignore
    let name = faker.name.lastName() + faker.name.firstName()
    let data = {
      name,
      age: faker.random.number({ min: 12, max: 100 }),
      // @ts-ignore
      imageUrl: faker.image.imageUrl()
    }
    const userUpdate = await UserModule.profileUpdate(user.id, data)
    expect(user.profile.name).not.toEqual(userUpdate.profile.name)
    expect(data.age).toEqual(userUpdate.profile.age)
    expect(data.imageUrl).toEqual(userUpdate.profile.imageUrl)
  })

  it('사용자 탈퇴', async () => {
    const profile = await UserModule.leave(user.id)
    expect(profile.deletedAt).not.toBeNull()
  })

  it('사용자 삭제', async () => {
    const profile = await UserModule.delete(user.id)
    expect(profile).toHaveProperty('id')
    expect(profile.id).toEqual(undefined)
  })
})
