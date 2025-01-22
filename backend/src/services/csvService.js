import csv from "csv-parser";
import { createReadStream } from "fs";

const loadCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};

export default loadCSV;
