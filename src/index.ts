import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { User } from './entity/User'

createConnection()
  .then(async connection => {
    const user = await User.create({
      email: 'test@mail.com',
      password: 'pass',
      age: 20,
      name: '홍길동'
    }).save()
    const users = await User.find()
    console.log(users)
    await connection.close()
  })
  .catch(error => console.log(error))
