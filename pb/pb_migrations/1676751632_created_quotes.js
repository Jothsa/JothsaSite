migrate((db) => {
  const collection = new Collection({
    "id": "9yo38isktuueah9",
    "created": "2023-02-18 20:20:32.794Z",
    "updated": "2023-02-18 20:20:32.794Z",
    "name": "quotes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "t0uq5fth",
        "name": "text",
        "type": "text",
        "required": true,
        "unique": true,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
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
      },
      {
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
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("9yo38isktuueah9");

  return dao.deleteCollection(collection);
})
