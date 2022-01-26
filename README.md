# @jobscale/fetch

Same as 'axios'

See: `https://www.npmjs.com/package/axios`

## Installation

```
npm i @jobscale/fetch
```

## Examples

```javascript
const fetch = require('@jobscale/fetch');

const logger = console;
const main = async () => {
  logger.info([
    { ip: await fetch('https://inet-ip.info/ip').then(res => res.data) },
    { ip: await fetch('https://inet-ip.info/ip', { 'user-agent': 'fetch' }).then(res => res.data) },
    { ip: await fetch('https://inet-ip.info/ip', { method: 'post', 'user-agent': 'fetch' }).then(res => res.data) },
    { ip: await fetch({ url: 'https://inet-ip.info/ip', method: 'post', 'user-agent': 'fetch' }).then(res => res.data) },
    await fetch({ url: 'https://inet-ip.info/json', method: 'post', 'user-agent': 'fetch' }).then(res => res.data),
  ]);
};
process.env.https_proxy = 'http://127.0.0.1:3128';
main();
```
