import dotenv from "dotenv";
dotenv.config();

export default {
  port: 1337,
  saltWorkFactor: 10,
  accessTokenExpiresIn: 15,
  refreshTokenExpiresIn: 59,
  origin: "http://localhost:3000",
};
