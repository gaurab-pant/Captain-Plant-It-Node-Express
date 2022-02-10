module.exports = (sequelize, Sequelize) => {
    const Tree = sequelize.define("tree", {
      title: {
        type: Sequelize.STRING
      },
      date_planted: {
        type: Sequelize.DATE
      },
      type: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      forest_id: {
        type: Sequelize.INTEGER
      },
      certified: {
        type: Sequelize.BOOLEAN
      }
    });
    return Tree;
  };