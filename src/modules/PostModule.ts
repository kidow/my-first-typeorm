import { Like, IsNull } from 'typeorm'
import { Post } from '../entity/Post'
import { User } from '../entity/User'

export class PostModule {
  static async write(userId: number, data: any): Promise<Post> {
    const user = await User.findOne(userId)
    return await Post.create({
      user,
      title: data.title,
      content: data.content
    }).save()
  }

  static async update(
    postId: number,
    userId: number,
    data: any
  ): Promise<Post | null> {
    const post = await Post.findOne({
      where: { id: postId, deletedAt: IsNull() },
      relations: ['user']
    })
    if (post.user.id !== userId) return null
    for (const key of data) post[key] = data[key]
    return await post.save()
  }

  static async list(
    skip: number,
    take: number,
    search?: string
  ): Promise<Post[]> {
    let where = {}
    if (search)
      where = [{ title: Like(`%${search}%`) }, { content: Like(`%${search}%`) }]
    const posts = await Post.find({
      where: { deletedAt: IsNull(), ...where },
      order: { id: 'DESC' },
      skip,
      take
    })
    return posts
  }

  static async userPosts(userId: number): Promise<Post[]> {
    return await Post.find({
      where: { userId, deletedAt: IsNull() },
      relations: ['user'],
      order: { id: 'DESC' }
    })
  }

  static async get(id: number): Promise<Post> {
    return await Post.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['user']
    })
  }

  static async delete(postId: number, userId: number) {
    const post = await Post.findOne(postId, { relations: ['user'] })
    if (post.user.id !== postId) return null
    return await post.remove()
  }
}
