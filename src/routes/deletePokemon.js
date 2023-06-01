const { Pokemon } = require("../db/sequelize");
const auth = require("../auth/auth");
module.exports = (app) => {
  app.delete("/api/pokemons/:id", auth, (req, res) => {
    let id = req.params.id;
    console.log("body", req.body);
    Pokemon.findByPk(id)

      .then((pokemon) => {
        if (pokemon == null) {
          let message =
            "Le pokemon à supprimer n'existe pas! Réessayer avec un autre identifiant";
          res.status(404).json({ message });
        } else {
          return Pokemon.destroy({
            where: { id: pokemon.id }
          }).then((_) => {
            const message = `Suppression du pokemon ${pokemon.name} réussi`;
            res.json({ message, datas: pokemon });
          });
        }
      })
      .catch((err) => {
        let message = "Erreur lors de la suppression ! Réessayez plutard";
        res.status(500).json({ message, error: err });
      });
  });
};
