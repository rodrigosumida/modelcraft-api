const express = require("express");
const router = express.Router();

const controller = require("../controllers/material_performance.controller");
const itemcontroller = new controller();

router.post(
  "/create",
  itemcontroller.create_material_performance
);

router.get(
  "/list",
  itemcontroller.list_material_performance
);

router.get(
  "/search/:id",
  itemcontroller.search_material_performance
);

router.put(
  "/update/:id",
  itemcontroller.update_material_performance
);

router.delete(
  "/delete/:id",
  itemcontroller.delete_material_performance
);

router.get(
  "/test",
  itemcontroller.test_material_performance
);

module.exports = router;
