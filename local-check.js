const fetch = require('.');

const logger = console;

const main = async () => {
  const url = 'https://inet-ip.info/ip';
  const { data: ip } = await fetch(url);
  logger.info({ ip });
};

main();
