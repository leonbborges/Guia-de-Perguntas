const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "node",
  password: "welcome1",
  database: "guiaDePerguntas_db",
});

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco estabelecida com sucesso!");
    await sequelize.sync({ force: false });
    console.log("Tabelas sincronizadas.");
  } catch (error) {
    console.error("Erro ao conectar ou sincronizar o banco:", error);
    throw error;
  }
}

module.exports = { sequelize, syncDatabase };
