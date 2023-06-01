const { Sequelize, DataTypes } = require("sequelize");

const pokemonModel = require("../models/pokemon");
const userModel = require("../models/user");
let pokemons = require("./mock-pokemon");
const bcrypt = require("bcrypt");

let sequelize;

if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(
    "tcqvgu87br3ns7aj",
    "apxf9axcndlaf7n6",
    "wf1yvhdl326mnrga",
    {
      host: "q0h7yf5pynynaq54.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
      dialect: "mariadb",
      dialectOptions: {
        timezone: "GMT+1"
      },
      logging: false
    }
  );
} else {
  sequelize = new Sequelize("pokedex", "root", "stan", {
    host: "127.0.0.1",
    dialect: "mariadb",
    dialectOptions: {
      timezone: "GMT+1"
    },
    logging: false
  });
}

sequelize
  .authenticate()
  .then((_) => console.log("Connexion réussi"))
  .catch((error) =>
    console.log(`Erreur lors de la connection à la Bd ${error}`)
  );

let Pokemon = pokemonModel(sequelize, DataTypes);
let User = userModel(sequelize, DataTypes);

const initDb = function () {
  return sequelize.sync({ force: true }).then((_) => {
    console.log("BD synchronizer");
    pokemons.map((pokem, i) => {
      Pokemon.create({
        name: pokem.name,
        hp: pokem.hp,
        cp: pokem.cp,
        picture: pokem.picture,
        types: pokem.types
      }).then((p) => console.log(i + 1 + " pokemon crée"));
    });
    /* Init one User */
    bcrypt
      .hash("2023", 10)
      .then((hash) =>
        User.create({
          username: "gugledas",
          password: hash
        })
      )
      .then((user) => console.log(`User ${user.username} a été créer`));
  });
};

module.exports = {
  initDb,
  Pokemon,
  User
};
