/* globals gauge*/
"use strict";
const { openBrowser, closeBrowser, goto, click, text } = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({ headless: headless })
});

afterSuite(async () => {
    await closeBrowser();
});

step("Goto GroceryWorks", async () => {
  await goto('https://thirstyhead.com/groceryworks');
});

step("Add dinner ingredients to cart", async () => {
  await click('Pasta');
  await click('Penne');
  await click('Produce');
  await click('Eggplant');
  await click('Mushrooms');
  await click('Onions');
  await click('Vine-Ripened Tomatoes');
  assert.ok( await text('Your Order').exists() );
});

step("Checkout", async () => {
  await click('Purchase');
  assert.ok( await text('Penne').exists() );
  assert.ok( await text('Eggplant').exists() );
  assert.ok( await text('Mushrooms').exists() );
  assert.ok( await text('Onions').exists() );
  assert.ok( await text('Vine-Ripened Tomatoes').exists() );
  await click('Place Order');
});
