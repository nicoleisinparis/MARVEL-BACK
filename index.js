require("dotenv").config();
const express = require("express");
// const mongoose = require("mongoose");
const axios = require("axios"); //Query another server. the backend here is an intermediary between backend (out there, where i communicate with API key) and my frontend
const cors = require("cors");

const app = express(); //my server

app.use(cors({ origin: "https://marvel-workshop.netlify.app" })); // authorise anyone to send the request
app.use(express.json()); // retrieve the body

app.get("/characters", async (req, res) => {
  const name = req.query.name || "";
  const limit = req.query.limit || 100;
  const skip = req.query.skip || 0;
  try {
    console.log(req.query);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&limit=${limit}&name=${name}&skip=${skip}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/comics", async (req, res) => {
  const limit = req.query.limit || 20;
  try {
    console.log(req.query);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("server started at : " + process.env.PORT);
});
