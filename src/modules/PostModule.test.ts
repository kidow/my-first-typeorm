import * as faker from 'faker/locale/ko'
import { Post } from '../entity/Post'
import { User } from '../entity/User'
import { PostModule } from '../modules/PostModule'
import { UserModule } from '../modules/UserModule'

describe('Post modules test', () => {
  let user: User
  const postCount: number = 10

  it('사용자 추가', async () => {
    const email = faker.internet.email()
    const name = faker.name.lastName() + faker.name.firstName()
    const age = faker.random.number({ min: 12, max: 100 })
    const imageUrl = faker.image.imageUrl()
    const password = faker.internet.password()
    user = await UserModule.register(email, password, name, age, imageUrl)
    expect(user).toHaveProperty('id')
  })

  it('글쓰기', async () => {
    const posts: Post[] = []
    for (let i = 0; i < postCount; i++) {
      const data = {
        title: faker.lorem.sentence(3),
        content: faker.lorem.lines(5)
      }
      const post = await PostModule.write(user.id, data)
      expect(post).toHaveProperty('id')
      posts.push(await PostModule.write(user.id, data))
    }

    for (let post of posts) {
      expect(post).toEqual(await PostModule.get(post.id))
    }
  })

  it('글 목록', async () => {
    const posts = await PostModule.list(0, postCount)
    expect(posts).toHaveLength(postCount)
  })

  it('사용자 글 목록', async () => {
    const posts = await PostModule.userPosts(user.id)
    expect(posts).toHaveLength(postCount * 2)
  })

  it('사용자 삭제', async () => {
    const profile = await UserModule.delete(user.id)
    expect(profile.id).toEqual(undefined)
  })
})
