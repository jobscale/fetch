const https = require('https');
const fetch = require('node-fetch');
const { HttpsProxyAgent } = require('https-proxy-agent');

const logger = console;

const hGet = (url, agent) => new Promise((resolve, reject) => {
  const uri = (typeof url === 'object') ? url.url : url;
  https.get(uri, { agent }, res => {
    if (res.statusCode !== 200) {
      reject(new Error(`Request failed with status code ${res.statusCode}`));
    }
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => { resolve(data); });
    res.on('error', (error) => { reject(error); });
  });
});

const smartFetch = async (...argv) => {
  const { env } = process || { env: {} };
  const proxy = env.https_proxy || env.http_proxy;
  if (proxy) {
    const agent = new HttpsProxyAgent(proxy);
    const [url, options] = argv;

    if (env.NODE_ENV === 'test') {
      const ip = await hGet(url, agent);
      logger.info(JSON.stringify({ http: env.NODE_ENV, ip }));
    }

    if (typeof url === 'object') {
      Object.assign(url, { agent });
    } else if (options) {
      Object.assign(options, { agent });
    } else {
      argv.push({ agent });
    }
  }

  const parse = res => {
    const type = res.headers.get('Content-Type');
    if (type.match('application/json')) return res.json();
    if (type.match('text/') || type.match('/xml') || type.match('+xml')) return res.text();
    logger.info(JSON.stringify({ 'Content-Type': type }));
    return res.blob();
  };

  return fetch(...argv)
  .then(res => parse(res).then(data => Object.assign(res, { data })))
  .catch(e => {
    logger.error(e);
    throw e;
  });
};

module.exports = smartFetch;
module.exports.fetch = smartFetch;
