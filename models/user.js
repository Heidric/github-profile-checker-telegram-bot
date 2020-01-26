module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "User",
    {
      github_account: DataTypes.STRING,
      github_id: DataTypes.STRING,
      chat_id: DataTypes.STRING,
      telegram_id: DataTypes.STRING,
      telegram_username: DataTypes.STRING,
    }
  );
};
