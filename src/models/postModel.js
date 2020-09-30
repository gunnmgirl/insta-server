import Sequelize from "sequelize";

import sequelize from "../utils/database";

const Post = sequelize.define("post", {
  caption: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  location: Sequelize.STRING,
});

export default Post;
