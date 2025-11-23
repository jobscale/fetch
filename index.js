import fs from 'fs';
import { ProxyAgent } from 'undici';

const proxy = process.env.HTTPS_PROXY || process.env.https_proxy
|| process.env.HTTP_PROXY || process.env.http_proxy;
const dispatcher = proxy && new ProxyAgent(proxy);
const certificate = {
  cert: fs.existsSync('certs/client-cert.pem') && fs.readFileSync('certs/client-cert.pem'),
  key: fs.existsSync('certs/client-cert.key') && fs.readFileSync('certs/client-cert.key'),
  ca: fs.existsSync('certs/ca-cert.pem') && fs.readFileSync('certs/ca-cert.pem'),
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
