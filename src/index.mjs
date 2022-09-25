import puppeteer from 'puppeteer';

export const crawlUrl = async function (url){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulate(puppeteer.devices['iPhone 6']);
  const response = await page.goto(url, {waitUntil: 'networkidle2'});
  await page.screenshot({
    path: 'haberturk.png', fullPage: true
  });
  await page.pdf({
    path: 'haberturk.pdf',
    format: 'letter',
  });
  const body = await page.waitForSelector('body');
  const headers = response.headers();
  const lang = await page.evaluate('document.querySelector("html").getAttribute("lang")');
  const title = await page.title();
  await browser.close();

  return title;
};