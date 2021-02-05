const GetUsers = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    password: DataTypes.STRING,
  }, { timestamps: false });

  User.associate = (models) => {
    User.hasMany(models.BlogPosts, { as: 'posts', foreignKey: 'userId' });
  };

  return User;
};

module.exports = GetUsers;
