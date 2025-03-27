const express = require("express");
const path = require("node:path");
const bodyParser = require("body-parser");
const { Pergunta } = require("./database/models/Pergunta");
const { syncDatabase } = require("./database/db");

const app = express();

// Configuração do Express
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas
app.get("/", (req, res) => {
  Pergunta.findAll({
    raw: true,
    order: [
      ["id", "DESC"], // ASC = Crescente || DESC = Decrescente
    ],
  }).then((perguntas) => {
    res.render("index", {
      perguntas: perguntas,
    });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", async (req, res) => {
  const { titulo, descricao } = req.body;
  try {
    await Pergunta.create({ titulo, descricao }).then(() => {
      res.redirect("/");
    });
  } catch (error) {
    console.error("Erro ao salvar pergunta:", error);
    res.status(500).send("Erro ao salvar a pergunta no banco de dados.");
  }
});

// Iniciar o servidor
async function startServer() {
  try {
    await syncDatabase();
    app.listen(8080, () => {
      console.log("App rodando na porta 8080!");
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
}

startServer();
