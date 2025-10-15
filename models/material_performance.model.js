const mongoose = require("../database");
const Schema = mongoose.Schema;

const MaterialPerformanceSchema = new Schema({
  material: { type: String, required: true },
  
  historico: [
    {
      origem: { type: String },
      valor: { type: Number },
      tempo: { type: Number, required: true },
    }
  ],

  medias: {
    valor_por_tempo: { type: Number },
  },
});

MaterialPerformanceSchema.methods.atualizarMedias = function () {
  if (this.historico.length === 0) return;

  let somaValorPorTempo = 0;
  let countValor = 0;

  this.historico.forEach(item => {
    if (item.valor && item.tempo) {
      somaValorPorTempo += item.valor / item.tempo;
      countValor++;
    }
  });

  this.medias.volume_por_tempo = countValor ? somaValorPorTempo / countValor : null;
};

MaterialPerformanceSchema.pre("save", function (next) {
  this.atualizarMedias();
  next();
});

module.exports = mongoose.model("MaterialPerformance", MaterialPerformanceSchema, "material_performance");