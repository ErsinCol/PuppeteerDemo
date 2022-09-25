//import puppeteer
import puppeteer  from 'puppeteer';
// create new instance of the chromium and launch
(async() =>{
    const browser = await puppeteer.launch({
        // run in a non-headless mode
        headless: false,
        // slows down puppeteer operations
        slowMo:100,
        // open dev tools
        devtools: true,
    });
    // create new page
    const page = await browser.newPage();
    // set the viewport of the page
    await page.setViewport({width:1199, height:900});
    // go to google.com
    const link = 'https://www.google.com';
    await page.goto(link);
    // wait for input field selector to render
    await page.waitForSelector('div from div:nth-child(2) input');
    await page.click('div from div:nth-child(2) input');
    // type Javascript in the search box
    await page.keyboard.type('JavaScript');
    // press enter on your keyboard
    await page.keyboard.press('Enter');
    await page.waitFor(3000);
    // get the url of the first search result
    await page.waitForSelector(
        '#main > div #center_col #search > div > div > div'
    );
    // get href from the selector
    const getHref = (page, selector) => 
        page.evaluate(
            selector => document.querySelector(selector).getAttribute('href'),
            selector
    );
    const url = await getHref(
        page,
        `#main > div #center_col #search > div > div > div a`
    );
    // Go to the URL of the first search result and wait till the initial HTML document has been completely loaded and parsed.
    const response = await page.goto(url, {waitUntil: 'domcontentloaded'});
    // take full page screenshot and save iy to the current directory
    await page.screenshot({
        fullPage: true,
        path: 'new_image.png'
    });
    // console log the url and the screenshot location
    const screenshotPath= process.cwd() + 'new_image.png';
    console.log('Url of the page: ', url);
    console.log('Location of the screenshot: ', screenshotPath);
    // close the page and browser
    await page.close();
    await browser.close();

})();
