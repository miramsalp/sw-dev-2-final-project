const mongoose = require("mongoose");
const dns = require("node:dns");

// Use public DNS resolvers for MongoDB Atlas SRV lookups.
dns.setServers(["1.1.1.1", "8.8.8.8"]);

let connecting = null;

const connect = async () => {
  mongoose.set("strictQuery", true);
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 8000,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
  return conn.connection;
};

const connectDB = () => {
  if (mongoose.connection.readyState === 1) return Promise.resolve(mongoose.connection);

  connecting ??= connect().finally(() => {
    connecting = null;
  });
  return connecting;
};

module.exports = connectDB;
