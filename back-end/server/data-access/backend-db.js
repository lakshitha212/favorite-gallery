import Id from '../Id'

export default function makeBackendDB({ makeDb }) {

  async function insert({ id: _id = Id.makeId(), ...testInfo }) {
    const db = await makeDb()
    const createdAt = Date.now()
    const result = await db
      .collection('test')
      .insertOne({ _id, ...testInfo, createdAt })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return { id, ...insertedInfo }
  }


  return Object.freeze({
    insert
  })
}
