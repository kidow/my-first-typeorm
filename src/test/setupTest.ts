import * as TypeORM from 'typeorm'

let db: TypeORM.Connection

beforeAll(async () => {
  try {
    db = await TypeORM.createConnection()
  } catch (err) {
    console.log(err)
  }
})

afterAll(async () => {
  try {
    await db.close()
  } catch (err) {
    console.log(err)
  }
})
