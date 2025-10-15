const mongoose = require("../database");
const Schema = mongoose.Schema;

let OrcamentoSchema = new Schema({
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
    tempo: { type: Number }
  },
  fundido: {
    volume: { type: Number },
    massa: { type: Number },
    tempo: { type: Number }
  },
  fundido_zero: {
    volume: { type: Number },
    massa: { type: Number },
    tempo: { type: Number }
  },
  isopor: {
    // Valores do ispor manuais até descobrir o padrão
    comprimento: { type: Number, required: true },
    largura: { type: Number, required: true },
    altura: { type: Number, required: true },
    volume: { type: Number },
    tempo: { type: Number }
  },
  mdf: {
    // Valores de MDF manuais até descobrir o padrão
    comprimento: { type: Number, required: true },
    largura: { type: Number, required: true },
    altura: { type: Number, required: true },
    chapas: { type: Number },
    tempo: { type: Number }
  },
  chapa_fundo: { type: Number }
});

OrcamentoSchema.pre("save", function (next) {
  if (!this.perimetro) {
    this.perimetro = (2 * this.comprimento + 2 * this.largura) / 1000;
  }

  // Alumínio Laminado
  this.laminado.volume = ((this.comprimento / 1000) * (this.largura / 1000) * (this.altura / 1000));
  this.laminado.massa = this.laminado.volume * 2750;
  // Por enquanto, calcular o tempo com base no valor da planilha
  // Depois que tiver o machine learning, fazer todo o processo usando os valores reais
  // Provavelmente não aqui, mas da pra considerar
  this.laminado.tempo = this.laminado.massa / 3.043586296;

  // Alumínio Fundido
  this.fundido.volume = this.area * 0.02 * 1.1;
  this.fundido.massa = this.fundido.volume * 2750;
  // Por enquanto, calcular o tempo com base no valor da planilha
  // Depois que tiver o machine learning, fazer todo o processo usando os valores reais
  // Provavelmente não aqui, mas da pra considerar
  this.fundido.tempo = this.fundido.massa / 2.859348767;

  // Alumínio Fundido a Zero
  this.fundido_zero.volume = this.area * 0.015 * 1.1;
  this.fundido_zero.massa = this.fundido_zero.volume * 2750 + ((this.perimetro * 0.1 * 0.005) * 2750);
  // Por enquanto, calcular o tempo com base no valor da planilha
  // Depois que tiver o machine learning, fazer todo o processo usando os valores reais
  // Provavelmente não aqui, mas da pra considerar
  this.fundido_zero.tempo = this.fundido_zero.massa / 6.686483424 * 0.5;

  // Isopor
  // Futuramente, usar o machine learning para calcular o tamanho necessário do isopor
  this.isopor.volume = (this.isopor.comprimento / 1000) * (this.isopor.largura / 1000) * (this.isopor.altura / 1000);
  // Por enquanto, calcular o tempo com base no valor da planilha
  // Depois que tiver o machine learning, fazer todo o processo usando os valores reais
  // Provavelmente não aqui, mas da pra considerar
  this.isopor.tempo = this.isopor.volume / 0.108585265;

  // MDF
  // Futuramente, usar o machine learning para calcular o tamanho necessário do MDF
  this.mdf.chapas = ((this.mdf.comprimento / 1000) * (this.mdf.largura / 1000) * (this.mdf.altura / 1000)) / 0.127;
  // Por enquanto, calcular o tempo com base no valor da planilha 
  // Depois que tiver o machine learning, fazer todo o processo usando os valores reais
  // Provavelmente não aqui, mas da pra considerar
  this.mdf.tempo = this.mdf.chapas / 0.108585265 * 2;

  // Chapa fundo
  this.chapa_fundo = ((this.comprimento + 80) / 1000) * ((this.largura + 80) / 1000) * 0.013 * 7800;

  next();
});

module.exports = mongoose.model("Orcamento", OrcamentoSchema, "orcamento");
