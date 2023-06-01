const { Pokemon } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const auth = require("../auth/auth");
module.exports = (app) => {
  app.put("/api/pokemons/:id", auth, (req, res) => {
    let newPokemon = req.body;
    let id = req.params.id;
    Pokemon.update(newPokemon, {
      where: { id: id }
    })
      .then((_) => {
        return Pokemon.findByPk(req.params.id).then((pokemon) => {
          if (pokemon === null) {
            let message =
              "Le pokemon demandeé n'existe pas! Réessayer avec un autre identifiant";
            res.status(404).json({ message });
          } else {
            console.log("pokem", pokemon);
            const message = `MAJ du pokemon ${pokemon.name} réussi`;
            res.json({ message, datas: pokemon });
          }
        });
      })
      .catch((err) => {
        if (err instanceof ValidationError) {
          return res.status(400).json({ message: err.message, datas: err });
        }
        if (err instanceof UniqueConstraintError) {
          return res.status(400).json({ message: err.message, datas: err });
        }
        let message = "Erreur lors de la MAJ! Réessayer plutard";
        res.json({ message, error: err });
      });
  });
};
