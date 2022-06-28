const fetch = require('..');

const logger = console;
const regexp = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;

describe('test fetch', () => {
  const urls = [
    'https://inet-ip.info/ip',
    'https://ipinfo.io/ip',
    'https://ifconfig.io',
  ];

  describe('strate fetch', () => {
    it('strate toMatch prompt', async () => {
      const [url] = urls;
      const ip = (await fetch(url)).data;
      logger.info({ ip, url });
      expect(ip).toMatch(regexp);
    });
  });

  describe('proxy fetch', () => {
    const storeEnv = process.env;
    beforeEach(() => {
      jest.resetModules();
      process.env = { ...storeEnv, https_proxy: 'http://127.0.0.1:3128' };
    });
    afterEach(() => {
      process.env = storeEnv;
    });
    it('proxy toMatch prompt', async () => {
      const [url] = urls;
      const ip = (await fetch(url)).data;
      logger.info({ ip, url });
      expect(ip).toMatch(regexp);
    });
  });
});
