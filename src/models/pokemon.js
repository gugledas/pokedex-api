let validType = [
  "Plante",
  "Poison",
  "Feu",
  "Insecte",
  "Normal",
  "Vol",
  "Electrik",
  "Fée",
  "Eau",
  "Aquatique",
  "Reptile",
  "Volant",
  "Oiseau"
];
module.exports = (sequelize, DatasTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DatasTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DatasTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Ce nom de pokemon est déjà utilisé! Veuillez renseigner un autre."
        },
        validate: {
          notEmpty: {
            msg: "Le nom ne doit pas être vide"
          },
          notNull: { msg: "Le nom du pokemons est requise" }
        }
      },
      hp: {
        type: DatasTypes.INTEGER,
        allowNull: false,
        validate: {
          max: {
            args: [999],
            msg: "Les points de vies doivent être inférieur a 999"
          },
          min: {
            args: [0],
            msg: "Les points de vies doivent être supérieur a 0"
          },
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points de vies"
          },
          notNull: { msg: "Les points de vies sont requise" }
        }
      },
      cp: {
        type: DatasTypes.INTEGER,
        allowNull: false,

        validate: {
          max: {
            args: [99],
            msg: "Les points de vies doivent être inférieur a 999"
          },
          min: {
            args: [0],
            msg: "Les points de vies doivent être supérieur a 0"
          },
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les degats"
          },
          notNull: { msg: "Les degats sont requise" }
        }
      },
      picture: {
        type: DatasTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {
            msg: "Utilisez une url valide"
          },
          notNull: { msg: "La photo sont requise" }
        }
      },
      types: {
        type: DatasTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          return this.setDataValue("types", types.join());
        },
        validate: {
          isTypesValid: (value) => {
            if (!value) {
              throw new Error("Le type doit contenir au moins une valeur");
            }
            if (value.split(",").length > 3) {
              throw new Error("Le type ne peut pas contenir plus de 3 valeur");
            }
            let allvalue = value.split(",");
            allvalue.forEach((element) => {
              if (!validType.includes(element)) {
                throw new Error(`Le type ${element} n'est pas un type valid`);
              }
            });
          }
        }
      }
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false
    }
  );
};
