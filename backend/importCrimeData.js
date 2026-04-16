const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const Crime = require("./models/Crime");
const getZoneColor = require("./utils/zoneClassifier");

mongoose.connect("mongodb://127.0.0.1:27017/swasthya")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const crimes = [];

fs.createReadStream("data/mumbai_crime_data.csv")
  .pipe(csv())
  .on("data", (row) => {

    crimes.push({
      area: row.area,
      lat: parseFloat(row.lat),
      lng: parseFloat(row.lng),
      type: row.type,
      count: parseInt(row.count),
      zoneColor: getZoneColor(parseInt(row.count)),
      source: row.source
    });

  })
  .on("end", async () => {
    try {
      await Crime.deleteMany(); // clear old data
      await Crime.insertMany(crimes); // insert all at once
      console.log("Crime Data Imported Successfully");
      process.exit();
    } catch (error) {
      console.log(error);
    }
  });
