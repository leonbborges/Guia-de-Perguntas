const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Resposta = sequelize.define(
  "Resposta",
  {
    corpo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    perguntaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "perguntas",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "respostas",
    timestamps: true,
  }
);

module.exports = { Resposta };
