import http from 'k6/http';
import { check, sleep } from 'k6';
import config from './config.js';

const { BASE_URL } = config;

export const options = {
  vus: 10,          // 10 virtual users
  duration: '30s',  // for 30 seconds
  thresholds: {     // pass/fail criteria
    http_req_duration: ['p(95)<500'], // 95% < 500ms
    http_req_failed: ['rate<0.01'],   // <1% errors
  },
};

export default function () {
  const res = http.get(`${BASE_URL}`);
  check(res, { 'status is 200': (r) => r.status === 200, });
  sleep(1);
}
