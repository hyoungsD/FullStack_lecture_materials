const postService = require("../services/postService");

const list = async (req, res) => {
    const result = await postService.list();
    res.json(result)
}

const create = async (req, res) => {
    const {title, content, author} = req.body;
    if(!title || !content) {
        return res.status(400).json({message: "제목과 내용은 필수에용"})
    }
    const post = await postService.create({title, content, author});
    res.status(201).json(post)
}

const get = async (req, res) => {
  const post = await postService.get(req.params.id);
  if (!post) return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
  res.json(post);
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

module.exports = {list, create, get, update, remove}
