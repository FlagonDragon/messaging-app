import express from 'express';
import { router } from './routes/router.js';
import cors from 'cors';
import passport from 'passport';
import jwtStrategy from "./strategies/jwt.js";

passport.use(jwtStrategy);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}!`);
});
