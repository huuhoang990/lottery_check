// draw.crawler.js
const puppeteer = require('puppeteer');

const REGION_URLS = {
  'Miền Nam': 'https://www.minhngoc.net.vn/xo-so-truc-tiep/mien-nam.html',
  'Miền Bắc': 'https://www.minhngoc.net.vn/xo-so-truc-tiep/mien-bac.html',
  'Miền Trung': 'https://www.minhngoc.net.vn/xo-so-truc-tiep/mien-trung.html'
};

// crawl one region
async function crawlRegion(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36');

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
  await page.waitForSelector('table.bangketquaSo', { timeout: 7000 });

  const data = await page.evaluate(() => {
    let draw_date = null;
    const titleEl = document.querySelector('div.title');
    if (titleEl) {
      const match = titleEl.innerText.match(/(\d{2}\/\d{2}\/\d{4})/);
      if (match) {
        const [dd, mm, yyyy] = match[1].split('/');
        draw_date = `${yyyy}-${mm}-${dd}`;
      }
    }

    const provinces = [];
    document.querySelectorAll('table.bangketquaSo').forEach(table => {
      const provinceName = table.querySelector('.tinh a')?.innerText.trim();
      if (!provinceName) return;

      const prizes = [];
      const PRIZE_MAP = {
        giai8: 'G8',
        giai7: 'G7',
        giai6: 'G6',
        giai5: 'G5',
        giai4: 'G4',
        giai3: 'G3',
        giai2: 'G2',
        giai1: 'G1',
        giaidb: 'DB'
      };
      Object.keys(PRIZE_MAP).forEach(cls => {
        const numbers = Array.from(table.querySelectorAll(`td.${cls} .giaiSo`))
          .map(el => el.getAttribute('data') || el.innerText.trim())
          .filter(Boolean);

        if (numbers.length) prizes.push({ prize_code: PRIZE_MAP[cls], numbers });
      });

      if (prizes.length) provinces.push({ name: provinceName, prizes });
    });

    return { draw_date, provinces };
  });

  await browser.close();
  
  return data;
}

// Crawl all regions
exports.crawlAllRegions = async () => {
  const results = {};
  for (const [region, url] of Object.entries(REGION_URLS)) {
    const data = await crawlRegion(url);
    results[region] = data;
  }

  return results;
};
