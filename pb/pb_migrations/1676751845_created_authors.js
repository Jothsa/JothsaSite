migrate((db) => {
  const collection = new Collection({
    "id": "ws8y23elid96zc2",
    "created": "2023-02-18 20:24:05.311Z",
    "updated": "2023-02-18 20:24:05.311Z",
    "name": "authors",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "7lytdgmi",
        "name": "author",
        "type": "text",
        "required": true,
        "unique": true,
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
  const collection = dao.findCollectionByNameOrId("ws8y23elid96zc2");

  return dao.deleteCollection(collection);
})
