const Orcamento = require("../models/orcamento.model");

const MaterialPerformance = require("../models/material_performance.model");
const { default: axios } = require("axios");

class OrcamentoController {
  async create_orcamento(req, res) {
    try {
      const orcamento = await Orcamento.create(req.body);

      if (!orcamento)
        return res.status(406).json({ error: "Error create orcamento." });

      const url = `${
        process.env.ML_SERVICE_URL || "http://localhost:8000"
      }/retrain?sync=false`;

      const resp = await axios.post(url);
      console.log("Métricas atualizadas: ", resp);

      return res.status(200).json(orcamento);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async gerar_estimativa(req, res) {
    try {
      const { comprimento, largura, altura, area } = req.body;

      const resp = await axios.post(
        `${process.env.ML_SERVICE_URL || "http://localhost:8000"}/prever`,
        { comprimento, largura, altura, area: Number(area) }
      );

      const { isopor, mdf } = resp.data;

      const perimetro = (2 * comprimento + 2 * largura) / 1000;

      // --- Materiais Performance
      const laminado = await MaterialPerformance.findOne({
        material: "laminado",
      });
      const fundido = await MaterialPerformance.findOne({
        material: "fundido",
      });
      const fundidoZero = await MaterialPerformance.findOne({
        material: "fundido_zero",
      });
      const isoporPerf = await MaterialPerformance.findOne({
        material: "isopor",
      });

      const laminadoRatio = laminado.medias.valor_por_tempo || 3.043586296;
      const fundidoRatio = fundido.medias.valor_por_tempo || 2.859348767;
      const fundidoZeroRatio =
        fundidoZero.medias.valor_por_tempo || 6.686483424;
      const isoporRatio = isoporPerf.medias.valor_por_tempo || 0.108585265;

      // --- Cálculos
      const estimativa = {
        perimetro,

        laminado: {
          volume: (comprimento / 1000) * (largura / 1000) * (altura / 1000),
          massa: null,
          tempo: null,
        },
        fundido: {},
        fundido_zero: {},
        isopor,
        mdf,
        chapa_fundo: null,
      };

      estimativa.laminado.massa = estimativa.laminado.volume * 2750;
      estimativa.laminado.tempo = estimativa.laminado.massa / laminadoRatio;

      estimativa.fundido.volume = area * 0.02 * 1.1;
      estimativa.fundido.massa = estimativa.fundido.volume * 2750;
      estimativa.fundido.tempo = estimativa.fundido.massa / fundidoRatio;

      estimativa.fundido_zero.volume = area * 0.015 * 1.1;
      estimativa.fundido_zero.massa =
        estimativa.fundido_zero.volume * 2750 + perimetro * 0.1 * 0.005 * 2750;
      estimativa.fundido_zero.tempo =
        (estimativa.fundido_zero.massa / fundidoZeroRatio) * 0.5;

      estimativa.isopor.volume =
        (isopor.comprimento / 1000) *
        (isopor.largura / 1000) *
        (isopor.altura / 1000);
      estimativa.isopor.tempo = estimativa.isopor.volume / isoporRatio;

      estimativa.mdf.chapas =
        ((mdf.comprimento / 1000) *
          (mdf.largura / 1000) *
          (mdf.altura / 1000)) /
        0.127;
      estimativa.mdf.tempo = (estimativa.mdf.chapas / isoporRatio) * 2;

      estimativa.chapa_fundo =
        ((comprimento + 80) / 1000) * ((largura + 80) / 1000) * 0.013 * 7800;

      return res.status(200).json(estimativa);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async list_orcamento(req, res) {
    try {
      const orcamento = await Orcamento.find({});
      if (!orcamento)
        return res.status(406).json({ error: "Error list orcamento." });
      return res.status(200).json(orcamento);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async search_orcamento(req, res) {
    try {
      const { id } = req.params;
      const data = await Orcamento.findById(id);
      if (!data)
        return res.status(406).json({ error: "Error search orcamento." });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update_orcamento(req, res) {
    console.log(req.body);
    try {
      const orcamento = await Orcamento.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      if (!orcamento)
        return res.status(406).json({ error: "Error update orcamento." });
      return res.status(200).json(orcamento);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async delete_orcamento(req, res) {
    try {
      const orcamento = await Orcamento.findByIdAndRemove(req.params.id);
      if (!orcamento)
        return res.status(406).json({ error: "Error delete orcamento." });
      return res.status(200).json(orcamento);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async test_orcamento(req, res) {
    res.send("Test orcamento!!!");
  }
}

module.exports = OrcamentoController;
