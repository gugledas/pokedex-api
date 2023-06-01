module.exports = (sequelize, DatasTypes) => {
  return sequelize.define("User", {
    id: {
      type: DatasTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DatasTypes.STRING,
      unique: {
        msg: "Cette username est déjà utilisée!"
      },
      allowNull: false
    },
    password: {
      type: DatasTypes.STRING
    }
  });
};
