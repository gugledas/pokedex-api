const { Pokemon } = require("../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/pokemons", auth, (req, res) => {
    let name = req.query.name;
    if (name) {
      if (name && name.length < 2) {
        return res.status(400).json({
          message:
            "Sorry le terme de recherche doit conenir au minimum 2 caractères"
        });
      }
      return Pokemon.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`
          }
        },
        order: ["name"],
        limit: req.query.limit ? parseInt(req.query.limit, 10) : 3
      }).then(({ count, rows }) => {
        let message = `Nous avons trouvé ${count} Pokemons correspondant à votre recherche`;
        res.json({ message, datas: rows });
      });
    }
    Pokemon.findAll({ order: ["name"] })
      .then((pokemons) => {
        const message =
          "Récupération de la liste des pokemons reussi total: " +
          pokemons.length;
        res.json({ message, datas: pokemons });
      })
      .catch((err) => {
        let message =
          "La liste des pokemons n'as pas pue être récupérer! Réessayer plutart";
        res.status(500).json({ message, datas: err });
      });
  });
};
