import Id from '../Id'
const USER_COLLECTION = 'user'
export default function makeBackendDB({ makeDb }) {

  async function insert({ id: _id = Id.makeId() }) {
    const db = await makeDb()
    const createdAt = Date.now()
    const result = await db
      .collection(USER_COLLECTION)
      .insertOne({ _id, favoriteEntries: [], createdAt })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return { id, ...insertedInfo }
  }

  async function findById({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection(USER_COLLECTION).findOne({ _id })
    if (!result) {
      throw new Error('User not found')
    }
    return result
  }

  async function update({ id: _id, card: card }) {
    const db = await makeDb()
    const res = await this.findById({ id: _id })

    if (!card._isFavourite && res.favoriteEntries.length === 9) {
      throw new Error('Your gallery image count exceeded. You can only add images up to 9!')
    }
    if (card._isFavourite) {
      await db.collection(USER_COLLECTION).updateOne(
        { _id },
        { $pull: { favoriteEntries: { id: card.id } } }
      )
      return await db.collection(USER_COLLECTION).findOne({ _id })
    }


    await db.collection(USER_COLLECTION).updateOne(
      { _id },
      { $push: { favoriteEntries: { ...card, _isFavourite: true } } }
    )
    return await db.collection(USER_COLLECTION).findOne({ _id })

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
