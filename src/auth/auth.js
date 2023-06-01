const jwt = require("jsonwebtoken");
const privateKey = require("./private_key");

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    let message = `vous devez fournis un jeton de sécuritté  dans l'entête de votre requete`;
    res.status(401).json({ message });
  }
  const token = authorizationHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
    if (error) {
      const message = "Vous n'etes pas authorisé a accéder à cette ressource";
      res.status(401).json({ message });
    }

    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      let message = "L'identifiant de l'utilisateur est invalide";
      res.status(401).json({ message });
    } else {
      next();
    }
  });
};
