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
      const ip = (await fetch(urls[0]).then(res => res.text()));
      logger.info({ ip, url: urls[0] });
      expect(ip).toMatch(regexp);
    });

    it('strate toMatch prompt', async () => {
      const ip = (await fetch(urls[1]).then(res => res.text()));
      logger.info({ ip, url: urls[1] });
      expect(ip).toMatch(regexp);
    });
  });

  // BUG: axios parse proxy NG
  describe('proxy fetch', () => {
    const storeEnv = process.env;
    beforeEach(() => {
      jest.resetModules();
      const proxy = 'http://127.0.0.1:3128';
      process.env = { ...storeEnv, https_proxy: proxy, http_proxy: proxy };
    });

    afterEach(() => {
      process.env = storeEnv;
    });

    it('proxy toMatch prompt', async () => {
      const ip = (await fetch(urls[0]).then(res => res.text()));
      logger.info({ ip, url: urls[0] });
      expect(ip).toMatch(regexp);
    });

    it('proxy toMatch prompt', async () => {
      const ip = (await fetch(urls[1]).then(res => res.text()));
      logger.info({ ip, url: urls[1] });
      expect(ip).toMatch(regexp);
    });
  });
});
