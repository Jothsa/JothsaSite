migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9yo38isktuueah9")

  // remove
  collection.schema.removeField("rynfcqpc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "izjlbbum",
    "name": "field",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "ws8y23elid96zc2",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": [
        "author"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9yo38isktuueah9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rynfcqpc",
    "name": "author",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("izjlbbum")

  return dao.saveCollection(collection)
})
