import fetch from '../index.js';

const logger = console;
const regexp = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;

describe('test fetch', () => {
  const urls = [
    'https://inet-ip.info/ip',
    'https://ipinfo.io/ip',
    'https://jsx.jp/ip',
  ];

  urls.forEach(url => {
    describe('web fetch test', () => {
      it('web fetch toMatch prompt', async () => {
        const body = await fetch(url).then(res => res.text());
        logger.info({ body, url });
        body.split(/[, ]/).map(v => v.trim()).filter(Number).forEach((ip, index) => {
          logger.info({ index, ip, url });
          expect(ip).toMatch(regexp);
        });
      });
    });
  });
});
