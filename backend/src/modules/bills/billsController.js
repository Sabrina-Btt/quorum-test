import getBillsStats from "./cases/getBillStats.js";

const billsController = (app) => {
  app.get("/bills/stats", async (req, res) => {
    const data = await getBillsStats();
    res.status(200).json({ stats: data });
  });
};

export default billsController;
