import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import billsController from "./modules/bills/billsController.js";
import legislatorsController from "./modules/legislators/legislatorController.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3002;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

legislatorsController(app);
billsController(app);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
