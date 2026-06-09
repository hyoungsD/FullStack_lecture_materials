// 서비스 계층 — 비즈니스 로직. 컨트롤러(HTTP)와 모델(DB) 사이에서 "무엇을 할지"를 담당한다.
const { Post, User } = require("../models");

// 작성자(User)를 함께(JOIN) 붙여서 돌려준다.
// as:"author" → 결과를 post.author로 꺼낸다(07의 기본값은 post.User였다).
// attributes → 작성자에서 id, name만 골라 붙인다(email 등 나머지는 제외).
const withAuthor = { include: [{ model: User, as: "author", attributes: ["id", "name"] }] };

const list = () => Post.findAll({ ...withAuthor, order: [["id", "DESC"]] });

const get = (id) => Post.findByPk(id, withAuthor);

const create = ({ title, content, userId }) => Post.create({ title, content, userId });

const update = async (id, fields) => {
  const post = await Post.findByPk(id);
  if (!post) return null; // 없으면 컨트롤러가 404 처리
  if (fields.title !== undefined) post.title = fields.title;
  if (fields.content !== undefined) post.content = fields.content;
  await post.save();
  return post;
};

const remove = async (id) => {
  const post = await Post.findByPk(id);
  if (!post) return null;
  await post.destroy();
  return post;
};

module.exports = { list, get, create, update, remove };
