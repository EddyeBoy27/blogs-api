const GetPosts = (sequelize, DataTypes) => {
  const Post = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  }, { updatedAt: 'updated', createdAt: 'published' });

  Post.associate = (models) => {
    Post.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return Post;
};

module.exports = GetPosts;
