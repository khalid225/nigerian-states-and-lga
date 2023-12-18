import Router from "express";
import State from "../models/states.js";

const router = Router();

// API endpoint to get the list of states
router.get("/", (req, res) => {
  State.find({})
    .then((states) => {
      const stateNames = states.map((state) =>
        state.items.states.map((s) => s.name)
      );
      res.json({ states: stateNames });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// API endpoint to get local governments for a given state
router.get("/get-local-governments/:name", (req, res) => {
  //get the local government by the state id
  /* const stateId = req.params.id;

  State.findOne({ "items.states.id": stateId })
    .then((state) => {
      if (state) {
        const localGovernments = state.items.states
        .find((s) => s.id === stateId)
        .locals.map((local) => local.name);
        res.json({ localGovernments });
      } else {
        res.status(404).json({ error: "State not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    }); */

  //get the local government by the state name
  const stateName = req.params.name;

  State.findOne({ "items.states.name": stateName })
    .then((state) => {
      if (state) {
        const localGovernments = state.items.states
          .find((s) => s.name === stateName)
          .locals.map((local) => local.name);
        res.json({ localGovernments });
      } else {
        res.status(404).json({ error: "State not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

export default router;
