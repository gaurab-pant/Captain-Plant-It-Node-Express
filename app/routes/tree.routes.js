module.exports = app => {
    const trees = require("../controllers/tree.controller.js");
    var router = require("express").Router();
    // Create a new Tree
    router.post("/", trees.create);
    // Retrieve all trees
    router.get("/", trees.findAll);
    // Retrieve all published trees
    router.get("/certified", trees.findAllCertified);
    // Retrieve a single Tree with id
    router.get("/:id", trees.findOne);
    // Update a Tree with id
    router.put("/:id", trees.update);
    // Delete a Tree with id
    router.delete("/:id", trees.delete);
    // Delete all trees
    router.delete("/", trees.deleteAll);
    app.use('/api/trees', router);
  };