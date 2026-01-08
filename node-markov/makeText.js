#!/usr/bin/env node

const fs = require("fs/promises");
const MarkovMachine = require("./markov");

async function getTextFromFile(path) {
  try {
    return await fs.readFile(path, "utf8");
  } catch (err) {
    console.error(`❌ Error reading file "${path}": ${err.message}`);
    process.exit(1);
  }
}

async function getTextFromURL(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    return await response.text();
  } catch (err) {
    console.error(`❌ Error fetching URL "${url}": ${err.message}`);
    process.exit(1);
  }
}

async function main() {
  const [mode, source] = process.argv.slice(2);

  if (!mode || !source || (mode !== "file" && mode !== "url")) {
    console.error("Usage:");
    console.error("  node makeText.js file <path>");
    console.error("  node makeText.js url <url>");
    process.exit(1);
  }

  let text;
  if (mode === "file") {
    text = await getTextFromFile(source);
  } else {
    text = await getTextFromURL(source);
  }

  const mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

main();
/** Command-line tool to generate Markov text. */

