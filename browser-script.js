import http from 'k6/http';
import exec from 'k6/execution';
import { sleep } from 'k6';
import { browser } from 'k6/browser';
import { expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js';

import config from './config.js';

const { BASE_URL } = config;

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      vus: 10,
      iterations: 100,
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export function setup() {
  const res = http.get(BASE_URL);

  if (res.status !== 200) {
    exec.test.abort(`unexpected status code ${res.status}`);
  }
}

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto(BASE_URL);

    await page.locator('//button[.="Pizza, Please!"]').click();

    const loveItBtn = page.locator('//button[.="Love it!"]');
    await loveItBtn.waitFor({ timeout: 2000 });
    await loveItBtn.click();

    const rateResult = page.locator('//p[@id="rate-result"]');
    await rateResult.waitFor({ timeout: 2000 });

    expect(await rateResult.textContent()).to.contain('Please log in first.');

  } finally {
    await page.close();
  }

  sleep(1);
}
