const { Post } = require("../models"); 

const list = () => { // 게시글 목록 
    return Post.findAll({ order: [["id", "desc"]]})
}

const create = ({ title, content, author }) => { // 게시글 쓰기 
    return Post.create({title, content, author })
}

const get = (id) => Post.findByPk(id);

const update = async (id, fields) => {
  const post = await Post.findByPk(id);
  if (!post) return null;
  if (fields.title !== undefined) post.title = fields.title;
  if (fields.content !== undefined) post.content = fields.content;
  if (fields.author !== undefined) post.author = fields.author;
  await post.save();
  return post;
};

const remove = async (id) => {
  const post = await Post.findByPk(id);
  if (!post) return null;
  await post.destroy();
  return post;
};


module.exports = {list, create, get, update,remove}
