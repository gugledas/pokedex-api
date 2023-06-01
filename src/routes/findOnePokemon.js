const { Pokemon } = require("../db/sequelize");
const auth = require("../auth/auth");
module.exports = (app) => {
  app.get("/api/pokemons/:id", auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (pokemon == null) {
          let message =
            "Le pokemon demandeé n'existe pas! Réessayer avec un autre identifiant";
          res.status(404).json({ message });
        } else {
          const message = `Récupération du pokemon ${pokemon.name} réussi`;
          res.json({ message, datas: pokemon });
        }
      })
      .catch((err) => {
        let message = "Le pokemon demandeé n'existe pas";
        res.status(500).json({ message, datas: err });
      });
  });
};
