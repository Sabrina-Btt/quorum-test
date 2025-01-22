import getLegislatorsStats from "./cases/getLegislatorsStats.js";

const legislatorsController = (app) => {
  app.get("/legislators/stats", async (req, res) => {
    const data = await getLegislatorsStats();
    res.status(200).json({ stats: data });
  });
};

export default legislatorsController;
