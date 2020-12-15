import Sequelize from "sequelize";

import sequelize from "../utils/database";
import Heart from "./heartModel";
import Comment from "./commentModel";

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
Post.hasMany(Comment);
Comment.belongsTo(Post);

export default Post;
