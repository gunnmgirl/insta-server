import Sequelize from "sequelize";

import sequelize from "../utils/database";
import Post from "./postModel";

const User = sequelize.define("user", {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  description: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  profileImage: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
});

User.hasMany(Post);

Post.belongsTo(User);

export default User;
