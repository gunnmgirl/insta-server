import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: "insta",
});

export default pool.promise();
