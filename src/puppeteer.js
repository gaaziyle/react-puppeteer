const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();
const port = 3000; // Adjust as needed

// Enable CORS for all origins (modify as needed for security)
app.use(cors());

app.get("/page", async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const idValue = req.query.id; // Get ID from request query parameters
    const dynamicallyLink = `https://${idValue}.bubbleapps.io/version-test`;

    await page.goto(dynamicallyLink);

    const result = await page.evaluate(() => {
      return window.bubble_run_derived[
        '{"function_name":"DefaultValues","args":[]}'
      ];
    });

    await browser.close();
    console.log(dynamicallyLink);
    res.json({ result });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
export async function fetchResultData() {
  try {
    const response = await fetch("/page");
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw to allow handling in calling code
  }
}
