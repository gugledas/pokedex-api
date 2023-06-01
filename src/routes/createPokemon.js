const { Pokemon } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");

const auth = require("../auth/auth");

module.exports = (app) => {
  app.post("/api/pokemons", auth, (req, res) => {
    let newPokemon = req.body;
    console.log("body", req.body);
    Pokemon.create({
      name: newPokemon.name,
      hp: newPokemon.hp,
      cp: newPokemon.cp,
      picture: newPokemon.picture,
      types: newPokemon.types
    })
      .then((pokemon) => {
        const message = `Creation du pokemon ${pokemon.name} réussi`;
        res.json({ message, datas: pokemon });
      })
      .catch((err) => {
        if (err instanceof ValidationError) {
          return res.status(400).json({ message: err.message, datas: err });
        }
        if (err instanceof UniqueConstraintError) {
          return res.status(400).json({ message: err.message, datas: err });
        }
        let message = "Erreur lors de la création!";
        res.status(500).json({ message, error: err });
      });
  });
};
