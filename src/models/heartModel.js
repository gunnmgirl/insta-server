import sequelize from "../utils/database";
import Post from "../models/postModel";
import User from "../models/userModel";

const Heart = sequelize.define("heart", {});

export default Heart;
