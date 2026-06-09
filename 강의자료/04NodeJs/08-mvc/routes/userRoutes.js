// 유저 라우터 — app.js에서 "/users"에 마운트된다.
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.list);
router.post("/", userController.create);
router.get("/:id", userController.get);

module.exports = router;
