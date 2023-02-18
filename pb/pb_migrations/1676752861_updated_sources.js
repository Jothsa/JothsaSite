migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7l9zn8pjotnllgf")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7l9zn8pjotnllgf")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
