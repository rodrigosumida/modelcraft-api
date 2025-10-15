const MaterialPerformance = require("../models/material_performance.model");

class MaterialPerformanceController {
  async create_material_performance(req, res) {
    try {
      const material_performance = await MaterialPerformance.create(req.body);
      if (!material_performance) return res.status(406).json({ error: "Error create material_performance." });
      return res.status(200).json(material_performance);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async list_material_performance(req, res) {
    try {
      const material_performance = await MaterialPerformance.find({});
      if (!material_performance) return res.status(406).json({ error: "Error list material_performance." });
      return res.status(200).json(material_performance);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async search_material_performance(req, res) {
    try {
      const { id } = req.params;
      const data = await MaterialPerformance.findById(id);
      if (!data) return res.status(406).json({ error: "Error search material_performance." });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update_material_performance(req, res) {
    console.log(req.body);
    try {
      const material_performance = await MaterialPerformance.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      if (!material_performance) return res.status(406).json({ error: "Error update material_performance." });
      return res.status(200).json(material_performance);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async delete_material_performance(req, res) {
    try {
      const material_performance = await MaterialPerformance.findByIdAndRemove(req.params.id);
      if (!material_performance) return res.status(406).json({ error: "Error delete material_performance." });
      return res.status(200).json(material_performance);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async test_material_performance(req, res) {
    res.send("Test material_performance!!!");
  }
}

module.exports = MaterialPerformanceController;
