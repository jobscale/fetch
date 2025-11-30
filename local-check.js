import fetch from './index.js';

const logger = console;

const main = async () => {
  const url = 'https://inet-ip.info/ip';
  const ip = await fetch(url).then(res => res.text());
  logger.info({ ip });
};

main();
