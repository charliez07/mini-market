const express = require("express");
const cors = require("cors");
const itemsRouter = require("./routes/items");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

// Items API routes
app.use("/api/items", itemsRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});