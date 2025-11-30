import fs from 'fs';
import { ProxyAgent } from 'undici';

const operate = {
  proxy: process.env.HTTPS_PROXY || process.env.https_proxy
  || process.env.HTTP_PROXY || process.env.http_proxy,
};
if (operate.proxy) {
  if (!operate.proxy.match('://')) operate.proxy = `http://${operate.proxy}`;
  operate.dispatcher = operate.proxy && new ProxyAgent(operate.proxy);
}
const certificate = {
  cert: fs.existsSync('certs/client-cert.pem') && fs.readFileSync('certs/client-cert.pem'),
  key: fs.existsSync('certs/client-cert.key') && fs.readFileSync('certs/client-cert.key'),
  ca: fs.existsSync('certs/ca-cert.pem') && fs.readFileSync('certs/ca-cert.pem'),
};

class Ocean {
  async fetch(url, opts = {}, extra = {}) {
    return fetch(url, {
      dispatcher: operate.dispatcher,
      ...opts,
      ...extra.useCert ? certificate : {},
    });
  }
}

const ocean = new Ocean();
export default ocean.fetch;
