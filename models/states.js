import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
mongoose.connect(process.env.DB);
const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error ", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

const stateSchema = new mongoose.Schema({
  items: {
    states: [
      {
        name: { type: String, required: true },
        id: { type: Number, required: true },
        locals: [
          {
            name: { type: String, required: true },
            id: { type: Number, required: true },
          },
        ],
      },
    ],
  },
});

const State = mongoose.model("State", stateSchema);

export default State;
