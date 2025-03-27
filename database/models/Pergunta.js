const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Pergunta = sequelize.define(
  "Pergunta",
  {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "perguntas",
    timestamps: true,
  }
);

module.exports = { Pergunta };
