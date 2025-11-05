const KEYS = [
  'BASE_URL',
];

const config = KEYS.reduce((acc, key) => ({ ...acc, [key]: __ENV[key] }), {});

const missing = Object.entries(config)
  .filter(([_, val]) => !val)
  .map(([key, _]) => key)

if (missing.length) {
  throw Error(`Missing required environment variable(s): [${missing.join(', ')}]`);
}

export default config;
