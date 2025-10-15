const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rotas
const orcamento = require("./routes/orcamento.routes");
const material_performance = require("./routes/material_performance.routes");

// Endereços
app.use("/api/orcamento", orcamento);
app.use("/api/material-performance", material_performance);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || 3002);
app.set("port", port);

app.listen(port, () => {
  console.log("Servidor iniciado na porta " + port + "!!!");
});
console.log("Servidor iniciado");
