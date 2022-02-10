const db = require("../models");
const Tree = db.trees;
const Op = db.Sequelize.Op;

// Create and Save a new Tree
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a Tree
    const tree = {
      title: req.body.title,
      date_planted: req.body.date_planted,
      location: req.body.location,
      type: req.body.type,
      forest_id: req.body.forest_id ? req.body.forest_id : 0,
      certified: req.body.certified ? req.body.certified : false
    };
    // Save Tree in the database
    Tree.create(tree)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tree."
        });
      });
};

// Retrieve all Trees from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Tree.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving trees."
        });
      });
};

// Find a single Tree with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Tree.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tree with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tree with id=" + id
        });
      });
};

// Update a Tree by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Tree.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tree was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tree with id=${id}. Maybe Tree was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tree with id=" + id
        });
      });
};

// Delete a Tree with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Tree.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tree was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tree with id=${id}. Maybe Tree was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tree with id=" + id
        });
      });
};

// Delete all Tree from the database.
exports.deleteAll = (req, res) => {
    Tree.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Trees were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Trees."
        });
      });
};

// Find all published Tree
exports.findAllCertified = (req, res) => {
  Tree.findAll({ where: { certified: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Trees."
      });
    });
};
