import dotenv from "dotenv";
dotenv.config();

export default {
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  accessTokenExpiresIn: 15,
  refreshTokenExpiresIn: 59,
  origin: "http://localhost:3000",
};
