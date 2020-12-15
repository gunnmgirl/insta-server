import Sequelize from "sequelize";

import sequelize from "../utils/database";

const Comment = sequelize.define("comment", {
  body: Sequelize.STRING,
});

export default Comment;
