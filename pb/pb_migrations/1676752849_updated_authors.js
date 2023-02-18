migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ws8y23elid96zc2")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ws8y23elid96zc2")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
