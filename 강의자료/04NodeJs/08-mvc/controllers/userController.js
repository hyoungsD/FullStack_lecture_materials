// 유저 컨트롤러 — HTTP 요청/응답만 담당.
const userService = require("../services/userService");

const list = async (req, res) => {
  res.json(await userService.list());
};

const get = async (req, res) => {
  const user = await userService.get(req.params.id);
  if (!user) return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
  res.json(user);
};

const create = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "name과 email은 필수입니다." });
  }
  const user = await userService.create({ name, email });
  res.status(201).json(user);
};

// 이 모듈이 외부에 공개하는 함수들 — 라우터가 이 이름으로 가져다 쓴다.
module.exports = { list, get, create };
