import dotenv from "dotenv";
import express from "express";
import State from "./models/states.js";
import nigeria from "./models/nigeria.js";
import indexRouter from "./routes/index.js";

dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/states", indexRouter);

//adds initial collection of nigerian states and local government areas
State.countDocuments({})
  .then(async (count) => {
    if (count === 0) {
      // If the collection is empty, insert data
      const statesData = nigeria.states.map((state) => ({
        name: state.name,
        id: state.id,
        locals: state.locals.map((local) => ({
          name: local.name,
          id: local.id,
        })),
      }));

      // Create a single State instance with all states and save it
      const newState = new State({ items: { states: statesData } });

      try {
        await newState.save();
        console.log("Initial data inserted successfully");
      } catch (error) {
        console.log("Error saving to Db:", error.message);
      }
    }
  })
  .catch((error) => console.error("Error checking document count:", error));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}...`);
});
