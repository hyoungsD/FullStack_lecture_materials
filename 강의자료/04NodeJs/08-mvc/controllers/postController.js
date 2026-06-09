// 컨트롤러 계층 — HTTP 요청/응답만 담당한다. 실제 일은 서비스에 맡긴다.
// 함수를 정의한 뒤 맨 아래 module.exports에 모아 두면, 라우터(routes/)가 require해서 URL에 연결한다.
const postService = require("../services/postService");

const list = async (req, res) => {
  res.json(await postService.list());
};

const get = async (req, res) => {
  const post = await postService.get(req.params.id);
  if (!post) return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
  res.json(post);
};

const create = async (req, res) => {
  const { title, content, userId } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "title과 content는 필수입니다." });
  }
  const post = await postService.create({ title, content, userId });
  res.status(201).json(post);
};

const update = async (req, res) => {
  const post = await postService.update(req.params.id, req.body);
  if (!post) return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
  res.json(post);
};

const remove = async (req, res) => {
  const post = await postService.remove(req.params.id);
  if (!post) return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
  res.json({ message: "삭제됨", post });
};

// 이 모듈이 외부에 공개하는 함수들.
module.exports = { list, get, create, update, remove };
