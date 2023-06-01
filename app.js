const express = require("express");
const sequelize = require("./src/db/sequelize");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");

const app = express();
let port = process.env.PORT || 3000;

//sequelize.initDb();

/* Nos middlewares */

app.use(favicon(__dirname + "/s-favicon.png"));
app.use(bodyParser.json());
console.log(process.env.NODE_ENV);
//

/* Les routes */
app.get("/", (req, res) => {
  res.json("Bienvenue les Négros 😄 🔥");
});

require("./src/routes/findAllPokemons")(app);
require("./src/routes/findOnePokemon")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);
require("./src/routes/login")(app);

app.use(({ res }) => {
  let message = "La ressource demandé n'existe pas! Essayez une autre url";
  res.status(404).json({ message });
});
/* La gestion des erreurs  */

app.listen(port);
