const express = require("express");
const path = require("path");
const { scrapeNews } = require("./scraper");

const app = express();
const port = 3000;

// Set up EJS for rendering HTML views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Define route for the homepage
app.get("/", async (req, res) => {
  try {
    const articles = await scrapeNews();
    res.render("index", { articles });
  } catch (error) {
    console.error("Error scraping articles:", error);
    res.status(500).send("Error scraping articles");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
