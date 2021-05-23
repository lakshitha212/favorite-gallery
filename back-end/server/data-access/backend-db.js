import Id from '../Id'
const USER_COLLECTION = 'user'
export default function makeBackendDB({ makeDb }) {

  async function insert({ id: _id = Id.makeId(), ...testInfo }) {
    const db = await makeDb()
    const createdAt = Date.now()
    const result = await db
      .collection(USER_COLLECTION)
      .insertOne({ _id, ...testInfo, createdAt })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return { id, ...insertedInfo }
  }

  async function findById({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection(USER_COLLECTION).findOne({ _id })
    return result
  }

  async function update({ id: _id, card: card }) {
    const db = await makeDb()
    const result = await db.collection(USER_COLLECTION).updateOne(
      { _id, "entries.id": card.id },
      { $set: { "entries.$._isFavourite": !card._isFavourite } }
    )
    // const result = await db
    //   .collection('user')
    //   .updateOne({ _id }, { $set: { ...userInfo } })
    return result.modifiedCount > 0 ? { id: _id, ...card } : null
  }


  return Object.freeze({
    insert,
    findById,
    update
  })
}
