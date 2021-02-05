module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BlogPosts', {
      id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      published: { type: Sequelize.DATE },
      updated: { type: Sequelize.DATE },
      title: { allowNull: false, type: Sequelize.STRING },
      content: { allowNull: false, type: Sequelize.STRING },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('BlogPosts');
  },
};
