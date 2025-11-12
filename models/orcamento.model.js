const mongoose = require("../database");
const Schema = mongoose.Schema;

const OrcamentoSchema = new Schema({
  status: { type: String, default: "estimativa" },
  cliente: { type: String, required: true },
  produto: { type: String, required: true },
  comprimento: { type: Number, required: true },
  largura: { type: Number, required: true },
  altura: { type: Number, required: true },
  area: { type: Number, required: true },
  perimetro: { type: Number },
  laminado: {
    volume: { type: Number },
    massa: { type: Number },
    tempo: { type: Number },
  },
  fundido: {
    volume: { type: Number },
    massa: { type: Number },
    tempo: { type: Number },
  },
  fundido_zero: {
    volume: { type: Number },
    massa: { type: Number },
    tempo: { type: Number },
  },
  isopor: {
    comprimento: { type: Number },
    largura: { type: Number },
    altura: { type: Number },
    volume: { type: Number },
    tempo: { type: Number },
  },
  mdf: {
    comprimento: { type: Number },
    largura: { type: Number },
    altura: { type: Number },
    chapas: { type: Number },
    tempo: { type: Number },
  },
  chapa_fundo: { type: Number },
});

module.exports = mongoose.model("Orcamento", OrcamentoSchema, "orcamento");
