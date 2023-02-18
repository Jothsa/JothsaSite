migrate((db) => {
  const collection = new Collection({
    "id": "7l9zn8pjotnllgf",
    "created": "2023-02-18 20:27:58.244Z",
    "updated": "2023-02-18 20:27:58.244Z",
    "name": "sources",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
        "system": false,
        "id": "4meyh5xb",
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
        "id": "wn7z55i8",
        "name": "media",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "xd7poygy",
        "name": "universe",
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
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("7l9zn8pjotnllgf");

  return dao.deleteCollection(collection);
})
