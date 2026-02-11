import fs from 'fs';
import { ProxyAgent } from 'undici';

const operate = {
  proxy: process.env.HTTPS_PROXY || process.env.https_proxy
  || process.env.HTTP_PROXY || process.env.http_proxy,
};
if (operate.proxy) {
  if (!operate.proxy.match('://')) operate.proxy = `http://${operate.proxy}`;
  operate.dispatcher = new ProxyAgent(operate.proxy);
  delete operate.proxy;
}
const certificate = () => {
  if (!certificate.cache) {
    certificate.cache = {
      cert: fs.existsSync('certs/client-cert.pem') && fs.readFileSync('certs/client-cert.pem'),
      key: fs.existsSync('certs/client-cert.key') && fs.readFileSync('certs/client-cert.key'),
      ca: fs.existsSync('certs/ca-cert.pem') && fs.readFileSync('certs/ca-cert.pem'),
    };
  }
  return certificate.cache;
};

export class Fetch {
  fetch(input, opts = {}) {
    const { timeout = 6_000, ...init } = opts;
    const ac = new AbortController();
    ac.terminate = () => clearTimeout(ac.terminate.tid);
    ac.terminate.tid = setTimeout(() => ac.abort(), timeout);
    return fetch(input, { ...init, signal: ac.signal })
    .finally(() => ac.terminate());
  }

  async customFetch(url, opts = {}, extra = { certificate }) {
    if (extra.useCert) {
      if (typeof extra.certificate === 'function') {
        operate.certificate = extra.certificate();
      } else {
        operate.certificate = extra.certificate;
      }
    }
    return this.fetch(url, {
      ...operate,
      ...opts,
    });
  }
}

const customFetch = (...args) => new Fetch().customFetch(...args);
export default customFetch;
