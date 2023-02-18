migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9yo38isktuueah9")

  // remove
  collection.schema.removeField("ebirgkiz")

  // add
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "izjlbbum",
    "name": "author",
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
    "id": "ebirgkiz",
    "name": "source",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("nspvbtik")

  // update
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
})
