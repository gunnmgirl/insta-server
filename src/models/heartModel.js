import sequelize from "../utils/database";
import Post from "../models/postModel";
import User from "../models/userModel";

const Heart = sequelize.define("heart", {});

Heart.belongsTo(User);
Heart.belongsTo(Post);

export default Heart;
