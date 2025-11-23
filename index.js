import fs from 'fs';
import { ProxyAgent } from 'undici';

const proxy = process.env.HTTPS_PROXY || process.env.https_proxy
|| process.env.HTTP_PROXY || process.env.http_proxy;
const dispatcher = proxy ? new ProxyAgent(proxy) : undefined;
const certificate = {
  cert: fs.readFileSync('client-cert.pem'),
  key: fs.readFileSync('client-cert.key'),
  ca: fs.readFileSync('ca-cert.pem'),
};

class Ocean {
  async fetch(url, opts = {}, extra = {}) {
    return fetch(url, {
      dispatcher, ...opts, ...(extra.useCert ? certificate : {}),
    });
  }
}

const ocean = new Ocean();
export default ocean.fetch;
