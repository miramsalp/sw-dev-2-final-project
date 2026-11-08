/**
 * Seed the base facilities: `npm run seed`
 *
 * Safe to run more than once: a facility is only inserted when no facility with the same
 * name exists, and existing ones (including admin edits) are never changed.
 */
const path = require("node:path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "..", "config", "config.env") });

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Facility = require("../models/Facility");

const BASE_FACILITIES = [
  { name: "Badminton Court", sportType: "Badminton", location: "Sports Complex, Floor 2", capacity: 4, hourlyRate: 150 },
  { name: "Basketball Court", sportType: "Basketball", location: "Sports Complex, Floor 1", capacity: 10, hourlyRate: 300 },
  { name: "Football Field", sportType: "Football", location: "Outdoor Field A", capacity: 22, hourlyRate: 800 },
  { name: "Tennis Court", sportType: "Tennis", location: "Outdoor Zone B", capacity: 4, hourlyRate: 250 },
];

const seed = async () => {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not set (config/config.env)");
  await connectDB();

  let inserted = 0;
  for (const facility of BASE_FACILITIES) {
    const result = await Facility.updateOne(
      { name: facility.name },
      { $setOnInsert: facility },
      { upsert: true, runValidators: true }
    );
    if (result.upsertedCount) {
      inserted += 1;
      console.log(`+ inserted  ${facility.name}`);
    } else {
      const existing = await Facility.findOne({ name: facility.name }).select("isActive");
      console.log(`= exists    ${facility.name}${existing?.isActive ? "" : " (inactive: deleted by an admin)"}`);
    }
  }
  console.log(`Done: ${inserted} inserted, ${BASE_FACILITIES.length - inserted} already there.`);
};

seed()
  .catch((error) => {
    console.error(`Seed failed: ${error.message}`);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
