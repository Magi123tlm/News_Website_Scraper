const puppeteer = require("puppeteer");

async function scrapeTimesOfIndia() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Open the page you want to scrape
  await page.goto("https://timesofindia.indiatimes.com", {
    waitUntil: "load",
    timeout: 60000,
  });

  // Scrape the data using page.evaluate
  const articlesData = await page.evaluate(() => {
    const articles = [];

    // Select all article elements (figure tags)
    const articleElements = document.querySelectorAll("figure._YVis");

    // Loop through each article element and extract the data (limit to 7 articles)
    articleElements.forEach((articleElement, index) => {
      if (index >= 7) return; // Stop after 7 articles

      const title = articleElement.querySelector("figcaption")
        ? articleElement.querySelector("figcaption").innerText
        : null;

      const imageUrl = articleElement.querySelector("img")
        ? articleElement.querySelector("img").src
        : null;

      const articleUrl = articleElement.querySelector("a")
        ? articleElement.querySelector("a").href
        : null;

      // Add the article data to the articles array
      if (title && articleUrl) {
        articles.push({
          title,
          imageUrl,
          articleUrl,
        });
      }
    });

    return articles; // Return the array of articles (up to 7)
  });

  await browser.close(); // Close the browser

  return articlesData; // Return the data from the function
}

async function scrapeIndianExpress() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://indianexpress.com/", {
    waitUntil: "load",
    timeout: 60000,
  });

  // Scrape the data using page.evaluate()
  const articlesData = await page.evaluate(() => {
    const articles = [];

    // Select all article link elements inside <h3> tags
    const articleElements = document.querySelectorAll("h3 a");

    // Loop through each article element and extract the data (limit to 7 articles)
    articleElements.forEach((articleElement, index) => {
      if (index >= 7) return; // Stop after scraping 7 articles

      const title = articleElement.innerText;
      const articleUrl = articleElement.href;

      // Add the article data to the articles array
      if (title && articleUrl) {
        articles.push({
          title,
          articleUrl,
        });
      }
    });

    return articles; // Return the array of articles (up to 7)
  });

  await browser.close(); // Close the browser

  return articlesData; // Return the data from the function
}

async function scrapeHindustanTimes() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Go to the homepage of Hindustan Times
  await page.goto("https://www.hindustantimes.com/", {
    waitUntil: "load",
    timeout: 60000,
  });

  // Wait for the page to load the articles
  await page.waitForSelector(".cartHolder"); // Ensure that the articles are loaded

  // Scrape the data using page.evaluate()
  const articlesData = await page.evaluate(() => {
    const articles = [];

    // Select all article containers on the homepage
    const articleElements = document.querySelectorAll(".cartHolder");

    articleElements.forEach((articleElement, index) => {
      if (index >= 7) return; // Stop after scraping 7 articles

      // Extract the article title from <h2> tag with class 'hdg3'
      const title = articleElement.querySelector(".hdg3 a")
        ? articleElement.querySelector(".hdg3 a").innerText
        : null;

      // Extract the article URL from the 'href' attribute of the <a> tag inside <h2>
      const articleUrl = articleElement.querySelector(".hdg3 a")
        ? articleElement.querySelector(".hdg3 a").href
        : null;

      // Extract the image URL from the 'src' attribute of <img> tag inside <figure>
      const imageUrl = articleElement.querySelector("figure img")
        ? articleElement.querySelector("figure img").src
        : null;

      // Extract the author from the <small class="byLineAuthor">
      const author = articleElement.querySelector(".storyBy .byLineAuthor a")
        ? articleElement.querySelector(".storyBy .byLineAuthor a").innerText
        : null;

      // Extract the date from the <div class="dateTime">
      const date = articleElement.querySelector(".dateTime")
        ? articleElement.querySelector(".dateTime").innerText
        : null;

      // Push the article data to the articles array
      if (title && articleUrl) {
        articles.push({
          title,
          articleUrl,
          imageUrl,
          author,
          date,
        });
      }
    });

    return articles; // Return the array of articles
  });

  await browser.close(); // Close the browser

  return articlesData; // Return the data from the function
}

// Function to scrape articles from all sources
async function scrapeNews() {
  const [toiArticles, ieArticles, htArticles] = await Promise.all([
    scrapeTimesOfIndia(),
    scrapeIndianExpress(),
    scrapeHindustanTimes(),
  ]);

  // Group the articles by their source
  const groupedArticles = {
    "Times of India": toiArticles,
    "Indian Express": ieArticles,
    "Hindustan Times": htArticles,
  };

  return groupedArticles; // Return the grouped articles
}

// Example of running the scrapeNews function and logging the result
module.exports = { scrapeNews };
