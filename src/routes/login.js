const { User } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");

module.exports = (app) => {
  app.get("/api/login", (req, res) => {
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then((user) => {
      if (user === null) {
        return res
          .status(400)
          .json({ message: "Cette utilisateur n'existe pas" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((isPassValid) => {
          if (isPassValid) {
            const token = jwt.sign({ userId: user.id }, privateKey, {
              expiresIn: "24h"
            });
            let message = "Utilisateur connecter avec success";
            return res.json({ message, datas: user, token });
          } else {
            let message = "Mot de passe incorrect";
            return res.status(401).json({ message });
          }
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
  });
};
