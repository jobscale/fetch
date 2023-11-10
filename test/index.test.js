const fetch = require('..');

const logger = console;
const regexp = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;

describe('test fetch', () => {
  const urls = [
    'https://inet-ip.info/ip',
    'https://ipinfo.io/ip',
  ];

  describe('strate fetch', () => {
    it('strate toMatch prompt', async () => {
      const { data: ip } = await fetch(urls[0]);
      logger.info({ ip, url: urls[0] });
      expect(ip).toMatch(regexp);
    });
  });

  describe('strate fetch', () => {
    it('strate toMatch prompt', async () => {
      const { data: ip } = await fetch(urls[1]);
      logger.info({ ip, url: urls[1] });
      expect(ip).toMatch(regexp);
    });
  });
});
