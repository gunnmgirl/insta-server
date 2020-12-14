import Sequelize from "sequelize";

import sequelize from "../utils/database";
import Heart from "./heartModel";

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

Post.hasMany(Heart);
Heart.belongsTo(Post);

export default Post;
