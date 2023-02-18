migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9yo38isktuueah9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nspvbtik",
    "name": "source",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "7l9zn8pjotnllgf",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": [
        "title"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9yo38isktuueah9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nspvbtik",
    "name": "source",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "7l9zn8pjotnllgf",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": [
        "name"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
