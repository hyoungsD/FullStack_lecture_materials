// 라우터 계층 — URL과 컨트롤러를 연결한다. app.js에서 "/posts"에 마운트된다.
const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.list);
router.post("/", postController.create);
router.get("/:id", postController.get);
router.put("/:id", postController.update);
router.delete("/:id", postController.remove);

module.exports = router;
