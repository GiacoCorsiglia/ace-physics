import "reflect-metadata";
import "dotenv/config";
import * as express from "express";
import * as cors from 'cors';

import * as database from "./database";

initialize();
async function initialize() {
  try {
    await database.createConnection();
  } catch (error) {
    console.error(error);
  }

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.listen(process.env.PORT || 4000);
}
