migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7l9zn8pjotnllgf")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vlpzhwbm",
    "name": "title",
    "type": "text",
    "required": true,
    "unique": true,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7l9zn8pjotnllgf")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vlpzhwbm",
    "name": "name",
    "type": "text",
    "required": true,
    "unique": true,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
