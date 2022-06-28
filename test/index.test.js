const fetch = require('..');

const { info } = console;

describe('test fetch', () => {
  const action = () => {
    // const url = 'https://inet-ip.info/ip';
    const url = 'https://ipinfo.io/ip';
    const regexp = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;
    return fetch(url)
    .then(res => ({ ip: res.data, regexp }));
  };

  describe('strate fetch', () => {
    it('toMatch prompt', async () => {
      await action()
      .then(({ ip, regexp }) => {
        info({ ip });
        expect(ip).toMatch(regexp);
      });
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
    it('toMatch prompt', async () => {
      await action()
      .then(({ ip, regexp }) => {
        info({ ip });
        expect(ip).toMatch(regexp);
      })
      .catch(e => {
        const { code, message, response: { status, statusText } } = e;
        info({ status, statusText, code, message });
        expect(message).toMatch(/^Request failed with status code 502$/);
      });
    });
  });
});
