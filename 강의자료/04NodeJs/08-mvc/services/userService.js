// 유저 서비스 계층 — 유저 관련 비즈니스 로직.
const { User } = require("../models");

const list = () => User.findAll({ order: [["id", "ASC"]] });

const get = (id) => User.findByPk(id);

const create = ({ name, email }) => User.create({ name, email });

module.exports = { list, get, create };
