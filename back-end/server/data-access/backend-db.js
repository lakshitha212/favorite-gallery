import Id from '../Id'
const USER_COLLECTION = 'user'
export default function makeBackendDB({ makeDb }) {

  async function insert({ id: _id = Id.makeId(), ...userInfo }) {
    const db = await makeDb()
    const createdAt = Date.now()
    const result = await db
      .collection(USER_COLLECTION)
      .insertOne({ _id, ...userInfo, createdAt })
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


    if (card._isFavourite) {
      return await db.collection(USER_COLLECTION).updateOne(
        { _id, "entries.id": card.id },
        { $pull: { favoriteEntries: { id: card.id } } }
      )
    }


    return await db.collection(USER_COLLECTION).updateOne(
      { _id },
      { $push: { favoriteEntries: { ...card, _isFavourite: true } } }
    )
  }

  async function sort({ id: _id, images: images }) {
    const db = await makeDb()
    const result = await db
      .collection(USER_COLLECTION)
      .updateOne({ _id }, { $set: { favoriteEntries: images } })
    return result.modifiedCount > 0 ? { id: _id, favoriteEntries: images } : null
  }



  return Object.freeze({
    insert,
    findById,
    update,
    sort
  })
}
