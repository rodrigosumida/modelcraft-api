const express = require("express");
const router = express.Router();

const controller = require("../controllers/orcamento.controller");
const itemcontroller = new controller();

router.post("/create", itemcontroller.create_orcamento);

router.post("/gerar-estimativa", itemcontroller.gerar_estimativa);

router.get("/list", itemcontroller.list_orcamento);

router.get("/search/:id", itemcontroller.search_orcamento);

router.put("/update/:id", itemcontroller.update_orcamento);

router.delete("/delete/:id", itemcontroller.delete_orcamento);

router.get("/test", itemcontroller.test_orcamento);

module.exports = router;
