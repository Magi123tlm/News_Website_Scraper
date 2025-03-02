
# News Scraper Using Puppeteer

This project is a web scraper built with [Puppeteer](https://pptr.dev/) for Node.js that gathers the latest news articles from multiple news platforms. It uses headless Chrome to automate browsing and extract content from news sites in real-time, providing you with a curated list of current news.

## Prerequisites

Before running this scraper, make sure you have the following installed on your machine:

- **Node.js**: A JavaScript runtime that is required to run the scraper.
    - You can download and install Node.js from [here](https://nodejs.org/).
  
- **Puppeteer**: A Node.js library that provides a high-level API to control headless Chrome or Chromium browsers. Puppeteer is used in this project to scrape the news data.
    - Puppeteer is automatically installed when you set up the project dependencies.

## Installation

Follow these steps to get the scraper up and running on your local machine.

### Step 1: Install Dependencies

Make sure you have Node.js installed, then run the following command to install the necessary dependencies:

npm install

This will install all required libraries, including Puppeteer, and set up your project.

### Step 2: Start the Application

After the dependencies are installed, you can start the application by running:

npm start

This command will start the server on http://localhost:3000. Make sure you keep this terminal window running.

### Step 3: Wait a Minute

---
Give the scraper a minute or two to fully fetch and compile the latest news articles. Puppeteer will visit the news sites, scrape the articles, and prepare them for display.
---

### Step 4: View the Results

After the initial setup, you can visit http://localhost:3000 in your browser to enjoy a curated list of the latest news articles from multiple news platforms.
