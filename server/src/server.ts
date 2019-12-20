#!/usr/bin/node
import app from './app';
import mongoose from "mongoose";
import * as dotenv from "dotenv";

const port = process.env.PORT || 8000;
const ENV = process.env.NODE_ENV || "development";

dotenv.config();
const mongooseOpt: mongoose.ConnectionOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  autoIndex: process.env.NODE_ENV === "development",
};
mongoose.connect(process.env.DB_URI, mongooseOpt)
  .then(() => console.log("Connected to the database"))
  .catch((err) => {
    console.error(`Can not connect to the database ${err}`);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`
\t\t\tListening on port ${port}
\t\t\tENV: ${ENV}
\t\t\tDate: ${new Date()}
`);

});
