// myModule.js
const puppeteer = require("puppeteer");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.get("/page", async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const dynamicallyLink = `https://${req.query.id}.bubbleapps.io/version-test`;
    console.log("Dynamically Link:", dynamicallyLink);

    await page.goto(dynamicallyLink);
    const result = await page.evaluate(() => {
      return window.bubble_run_derived[
        '{"function_name":"DefaultValues","args":[]}'
      ];
    });

    console.log(result);

    await browser.close();

    res.json(result);
  } catch (error) {
    console.log("Puppeteer Hatası:", error);
    res.status(500).json({
      error: {
        message: error.message,
        stack: error.stack,
      },
    });
  }
});

app.listen(port, () => {
  console.log(`Puppeteer sunucu çalışıyor: http://localhost:${port}`);
});

module.exports = app; // Export the Express app
