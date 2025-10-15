const Orcamento = require("../models/orcamento.model");

class OrcamentoController {
  async create_orcamento(req, res) {
    try {
      const orcamento = await Orcamento.create(req.body);
      if (!orcamento) return res.status(406).json({ error: "Error create orcamento." });
      return res.status(200).json(orcamento);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async list_orcamento(req, res) {
    try {
      const orcamento = await Orcamento.find({});
      if (!orcamento) return res.status(406).json({ error: "Error list orcamento." });
      return res.status(200).json(orcamento);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async search_orcamento(req, res) {
    try {
      const { id } = req.params;
      const data = await Orcamento.findById(id);
      if (!data) return res.status(406).json({ error: "Error search orcamento." });
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
      if (!orcamento) return res.status(406).json({ error: "Error update orcamento." });
      return res.status(200).json(orcamento);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async delete_orcamento(req, res) {
    try {
      const orcamento = await Orcamento.findByIdAndRemove(req.params.id);
      if (!orcamento) return res.status(406).json({ error: "Error delete orcamento." });
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
