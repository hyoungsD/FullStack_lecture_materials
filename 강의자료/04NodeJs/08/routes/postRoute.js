const express = require("express")
const router = express.Router();

const postController = require("../controllers/postController");

router.get("/", postController.list);
router.post("/", postController.create);
router.get("/:id", postController.get);
router.put("/:id", postController.update);
router.delete("/:id", postController.remove);

module.exports = router;