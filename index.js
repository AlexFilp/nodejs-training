require("dotenv").config();
const { app } = require("./app");
const mongoose = require("mongoose");

const { PORT, DB_URI } = process.env;

(async () => {
  await mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connection succesfull");
  app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
  });
})();
